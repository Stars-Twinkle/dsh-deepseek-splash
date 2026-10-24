/**
 * Host half of the DeepSeek boot-splash bundle.
 *
 * The splash is drawn by the Client half. It reads the boot inventory from this
 * package-private HTTP route (same origin as the page), so the Client needs no
 * generated Remote namespace for data that only the Host can read: live
 * Sessions, the profile's plugin rows, and the installed skill catalog.
 */

const ROUTE_PATH = '/deepseek-splash-api'
const STATE_PATH = '/deepseek-splash-api/state'
const PING_PATH = '/deepseek-splash-api/ping'
const CACHE_MS = 3000

export const inject = ['webServer']

export function apply(ctx) {
  let cached = null
  let cachedAt = 0
  let pending = null
  let pings = 0
  let lastPing = 0

  const readInventory = async () => {
    if (cached !== null && Date.now() - cachedAt < CACHE_MS) return withPings()
    if (pending !== null) return pending
    pending = collect(ctx)
      .then((value) => {
        cached = value
        cachedAt = Date.now()
        return withPings()
      })
      .finally(() => {
        pending = null
      })
    return pending
  }

  const withPings = () => ({
    ...cached,
    pings,
    lastPing,
  })

  ctx.effect(
    () =>
      ctx.webServer.register({
        kind: 'prefix',
        path: ROUTE_PATH,
        handler: async (request, response) => {
          const path = new URL(request.url ?? ROUTE_PATH, 'http://localhost').pathname
          try {
            if (path === PING_PATH) {
              pings += 1
              lastPing = Date.now()
              respond(response, 200, { ok: true, pings, lastPing })
              return
            }
            if (path !== STATE_PATH) {
              respond(response, 404, { ok: false, error: 'unknown path' })
              return
            }
            respond(response, 200, await readInventory())
          } catch (error) {
            respond(response, 200, {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
              sessions: [],
              plugins: [],
              skills: [],
              model: null,
              modelCatalog: null,
              pings,
              lastPing,
            })
          }
        },
      }),
    'deepseek-splash: boot inventory route',
  )
}

function respond(response, status, body) {
  const text = JSON.stringify(body)
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.setHeader('content-length', Buffer.byteLength(text))
  response.end(text)
}

async function collect(ctx) {
  const [plugins, skills, modelCatalog, sessions] = await Promise.all([
    listPlugins(ctx),
    listSkills(ctx),
    listModelCatalog(ctx),
    listSessions(ctx),
  ])
  const defaultSelection = modelCatalog?.defaultSelection ?? null
  const model = defaultSelection
    ? modelCatalog.models.find(
        (entry) => entry.provider === defaultSelection.provider && entry.id === defaultSelection.model,
      ) ?? null
    : null
  return {
    ok: true,
    at: Date.now(),
    sessions,
    plugins,
    skills,
    model,
    modelCatalog,
  }
}

async function listModelCatalog(ctx) {
  const catalog = { providers: [], models: [], defaultSelection: null }
  try {
    const selection = ctx.get('agentDefaultModel')?.currentSelection?.()
    if (selection !== null && selection !== undefined && typeof selection === 'object') {
      catalog.defaultSelection = {
        provider: String(selection.provider ?? ''),
        model: String(selection.model ?? ''),
      }
    }
  } catch {
    catalog.defaultSelection = null
  }
  const llm = ctx.get('llm')
  if (typeof llm?.listProviders !== 'function') return catalog
  let providers = []
  try {
    providers = llm.listProviders()
  } catch {
    providers = []
  }
  if (!Array.isArray(providers)) providers = []
  catalog.providers = providers
    .map((provider) => ({ id: String(provider?.id ?? ''), name: String(provider?.name ?? provider?.id ?? '') }))
    .filter((provider) => provider.id !== '')
  const models = []
  const seen = new Set()
  for (const provider of providers) {
    let listed = []
    try {
      listed = await llm.listModels(provider.id)
    } catch {
      listed = []
    }
    if (!Array.isArray(listed)) continue
    for (const info of listed) {
      const id = String(info?.id ?? '')
      const key = provider.id + '/' + id
      if (id === '' || seen.has(key)) continue
      seen.add(key)
      models.push({
        provider: String(provider.id),
        providerName: String(provider.name ?? provider.id),
        id,
        name: String(info?.name || id),
        description: String(info?.description ?? ''),
        contextWindow: null,
        maxTokens: null,
        effort: '',
        modalities: Array.isArray(info?.inputModalities) ? info.inputModalities.map(String) : [],
      })
    }
  }
  const bounded = models.slice(0, 60)
  catalog.models = await Promise.all(
    bounded.map(async (model) => {
      try {
        const signal =
          typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
            ? AbortSignal.timeout(1200)
            : undefined
        const resolved = await llm.resolveModelInfo(model.provider, model.id, signal)
        if (resolved !== null && resolved !== undefined && typeof resolved === 'object') {
          if (resolved.context && Number.isFinite(resolved.context.contextWindow)) {
            model.contextWindow = Number(resolved.context.contextWindow)
          }
          if (Number.isFinite(resolved.defaultMaxTokens)) {
            model.maxTokens = Number(resolved.defaultMaxTokens)
          }
          if (resolved.reasoning?.defaultEffort) {
            model.effort = String(resolved.reasoning.defaultEffort)
          }
        }
      } catch {
        /* per-model metadata is advisory */
      }
      return model
    }),
  )
  return catalog
}

async function listSessions(ctx) {
  const limit = 12
  const query = ctx.get('sessionQuery')
  if (typeof query?.listSessions === 'function') {
    try {
      const signal = timeoutSignal(4000)
      const records = await query.listSessions(signal)
      if (Array.isArray(records)) {
        const picked = []
        for (const record of records) {
          const header = record?.header
          if (header === null || header === undefined) continue
          if (header.origin === 'subagent') continue
          const id = String(header.id ?? '')
          if (id === '') continue
          picked.push({ id, header, live: Boolean(record.live) })
          if (picked.length >= limit * 2) break
        }
        const titles = await readSessionTitles(ctx, picked.map((entry) => entry.id))
        const mapped = picked.map((entry) => ({
          id: entry.id,
          title: titles.get(entry.id) || '',
          cwd: typeof entry.header.cwd === 'string' ? entry.header.cwd : '',
          createdAt: Number(entry.header.createdAt ?? 0),
          live: entry.live,
        }))
        const titled = mapped.filter((entry) => entry.title !== '')
        return (titled.length >= 8 ? titled : mapped).slice(0, limit)
      }
    } catch {
      /* fall through to the live-session fallback */
    }
  }
  return listLiveSessions(ctx, limit)
}

async function readSessionTitles(ctx, ids) {
  const titles = new Map()
  const query = ctx.get('sessionQuery')
  try {
    const observations = await query.readTitleSnapshots(ids, timeoutSignal(4000))
    if (Array.isArray(observations)) {
      for (const entry of observations) {
        const title = entry?.status === 'fulfilled' ? entry.value?.title?.title : ''
        if (typeof title === 'string' && title.trim() !== '') {
          titles.set(String(entry.sessionId), title.trim())
        }
      }
    }
  } catch {
    /* titles are best effort; the Client falls back to the id prefix */
  }
  return titles
}

function listLiveSessions(ctx, limit) {
  const registry = ctx.get('sessions')
  const titles = ctx.get('sessionTitle')
  let sessions = []
  try {
    sessions = registry?.list?.() ?? []
  } catch {
    sessions = []
  }
  const rows = []
  for (const session of sessions) {
    const header = session?.header ?? {}
    if (header.origin === 'subagent') continue
    let title = ''
    try {
      const snapshot = titles?.get?.(session)
      title = typeof snapshot?.title === 'string' ? snapshot.title : ''
    } catch {
      title = ''
    }
    const id = String(session?.id ?? header.id ?? '')
    if (id === '') continue
    rows.push({
      id,
      title: title.trim(),
      cwd: typeof header.cwd === 'string' ? header.cwd : '',
      createdAt: Number(header.createdAt ?? 0),
      live: true,
    })
    if (rows.length >= limit) break
  }
  return rows
}

function timeoutSignal(ms) {
  if (typeof AbortSignal === 'undefined' || typeof AbortSignal.timeout !== 'function') return undefined
  return AbortSignal.timeout(ms)
}

async function listPlugins(ctx) {
  const manager = ctx.get('pluginManager')
  if (typeof manager?.listPlugins !== 'function') return []
  try {
    const list = await manager.listPlugins()
    if (!Array.isArray(list)) return []
    return list
      .map((entry) => ({
        id: String(entry?.entryId ?? ''),
        name: String(entry?.moduleName ?? ''),
        title: entry?.meta?.title ?? null,
        enabled: entry?.enabled !== false,
        phase: entry?.fiberPhase ?? null,
      }))
      .filter((entry) => entry.id !== '' || entry.name !== '')
      .slice(0, 200)
  } catch {
    return []
  }
}

async function listSkills(ctx) {
  const registry = ctx.get('skills')
  if (typeof registry?.list !== 'function') return []
  const options = {}
  const directory = ctx.get('workingDirectory')?.defaultDirectory
  if (typeof directory === 'string' && directory !== '') options.cwd = directory
  try {
    const list = await registry.list(options)
    if (!Array.isArray(list)) return []
    return list
      .map((skill) => ({
        name: String(skill?.name ?? ''),
        description: String(skill?.description ?? ''),
        source: String(skill?.source ?? ''),
        provider: String(skill?.provider ?? ''),
      }))
      .filter((skill) => skill.name !== '')
      .slice(0, 200)
  } catch {
    return []
  }
}
