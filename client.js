window.__ModuleLoader__.load({
  id: '@stars-twinkle/dsh-deepseek-splash',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect } = React

    let splashSettled = false

    const EN = {
      title: 'DeepSeek boot sequence',
      brand: 'DEEPSEEK // HARNESS',
      boot: 'BOOT SEQUENCE',
      stage0: 'CORE',
      stage1: 'SESSIONS',
      stack: 'STACK',
      granted: 'GRANTED',
      identity: 'IDENTITY',
      sessions: 'SESSIONS',
      plugins: 'PLUGINS',
      skills: 'SKILLS',
      model: 'MODEL',
      directory: 'SESSION DIRECTORY',
      auth: 'ACCESS AUTHORIZED',
      entering: 'ENTERING SESSION',
      scanning: 'SCANNING',
      skip: 'SKIP',
      empty: 'NO ACTIVE SESSION',
      offline: 'LINK OFFLINE',
      subtitle: 'INITIALIZING WORKSPACE',
      loaded: 'LOADED',
      more: 'MORE',
    }

    const ZH = {
      title: 'DeepSeek 开屏序列',
      brand: 'DEEPSEEK // HARNESS',
      boot: '启动序列',
      stage0: '内核',
      stage1: '会话',
      stack: '栈',
      granted: 'GRANTED',
      identity: '识别',
      sessions: '会话',
      plugins: '插件',
      skills: '技能',
      model: '模型',
      directory: '会话目录',
      auth: 'ACCESS AUTHORIZED',
      entering: 'ENTERING SESSION',
      scanning: '扫描中',
      skip: '跳过',
      empty: '暂无活动会话',
      offline: '链路离线',
      subtitle: '正在初始化工作区',
      loaded: '已加载',
      more: '更多',
    }

    const CSS = `
.dsk-root{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:auto;background:#04060d;color:#dbe7ff;--dsk-display:'Bahnschrift','Segoe UI Variable Display','DIN Alternate','Segoe UI','DengXian','等线',system-ui,sans-serif;--dsk-mono:'Cascadia Code','Cascadia Mono','Consolas','SFMono-Regular','DengXian','等线',ui-monospace,monospace;font-family:var(--dsk-display);transition:opacity .85s cubic-bezier(.4,0,.2,1),filter .85s ease,transform .85s ease}
.dsk-root[data-exit="true"]{opacity:0;filter:blur(12px);transform:scale(1.025);pointer-events:none}
.dsk-bg,.dsk-grid,.dsk-scan,.dsk-frame{position:absolute;pointer-events:none}
.dsk-bg{inset:0;background:radial-gradient(1100px 720px at 50% -10%,rgba(56,132,255,.28),transparent 62%),radial-gradient(900px 640px at 88% 110%,rgba(0,229,255,.16),transparent 60%),radial-gradient(700px 500px at 8% 100%,rgba(124,92,255,.14),transparent 60%)}
.dsk-grid{left:-20%;right:-20%;top:-30%;bottom:-60%;background-image:linear-gradient(rgba(120,200,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(120,200,255,.09) 1px,transparent 1px);background-size:64px 64px;transform:perspective(900px) rotateX(62deg);transform-origin:50% 100%;-webkit-mask-image:radial-gradient(ellipse 60% 55% at 50% 70%,#000 0%,transparent 78%);mask-image:radial-gradient(ellipse 60% 55% at 50% 70%,#000 0%,transparent 78%);animation:dsk-drift 14s linear infinite;opacity:.8}
@keyframes dsk-drift{from{background-position:0 0,0 0}to{background-position:0 128px,128px 0}}
.dsk-scan{left:0;right:0;top:0;height:180px;background:linear-gradient(180deg,transparent 0%,rgba(94,234,255,.055) 45%,rgba(94,234,255,.1) 50%,rgba(94,234,255,.055) 55%,transparent 100%);animation:dsk-scan 6s linear infinite;opacity:.7}
@keyframes dsk-scan{0%{transform:translateY(-220px)}100%{transform:translateY(110vh)}}
.dsk-frame{inset:18px;border:1px solid rgba(120,200,255,.14);border-radius:8px}
.dsk-corner{position:absolute;width:18px;height:18px;border-color:rgba(120,210,255,.55);border-style:solid}
.dsk-corner-tl{left:-1px;top:-1px;border-width:2px 0 0 2px}
.dsk-corner-tr{right:-1px;top:-1px;border-width:2px 2px 0 0}
.dsk-corner-bl{left:-1px;bottom:-1px;border-width:0 0 2px 2px}
.dsk-corner-br{right:-1px;bottom:-1px;border-width:0 2px 2px 0}
.dsk-top{position:absolute;top:26px;left:clamp(24px,3.8vw,56px);right:clamp(24px,3.8vw,56px);z-index:6;display:flex;justify-content:space-between;align-items:center;font-family:var(--dsk-mono);font-size:11px;letter-spacing:.28em;color:rgba(150,205,255,.78);text-transform:uppercase}
.dsk-top-right{display:flex;align-items:center;gap:14px}
.dsk-top-b{color:rgba(120,180,255,.5);letter-spacing:.2em}
.dsk-stage{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;padding:82px clamp(24px,4vw,56px) 104px;overflow:hidden}
.dsk-screen{width:min(1020px,100%);height:min(560px,100%);display:flex;flex-direction:column;gap:12px;animation:dsk-screen-in .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes dsk-screen-in{from{opacity:0;transform:translateY(16px);filter:blur(5px)}to{opacity:1;transform:none;filter:none}}
.dsk-screen-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.dsk-screen-body.dsk-fill{align-items:stretch;justify-content:stretch}
.dsk-scene-head{display:flex;align-items:center;gap:14px;font-family:var(--dsk-mono);text-transform:uppercase;color:rgba(140,200,255,.55);font-size:10px;letter-spacing:.3em}
.dsk-scene-index{color:#4f86ff;font-weight:600}
.dsk-scene-title{color:#9ad4ff;font-weight:600;letter-spacing:.34em}
.dsk-scene-line{flex:1;height:1px;background:linear-gradient(90deg,rgba(120,200,255,.35),transparent)}
.dsk-scene-extra{color:rgba(140,200,255,.45);white-space:nowrap}
.dsk-brand-wrap{position:relative;display:flex;align-items:center;justify-content:center;min-height:clamp(58px,7.6vh,80px);padding:2px 0}
.dsk-brand-main{position:relative;z-index:1;animation:dsk-brand-in 1.15s cubic-bezier(.2,.8,.2,1) both}
.dsk-brand-echo{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;filter:blur(16px);opacity:.42;transform:scale(1.015);pointer-events:none}
.dsk-brand{display:block;width:clamp(236px,33vw,424px);height:auto;filter:drop-shadow(0 0 14px rgba(77,107,254,.45))}
.dsk-brand-wrap::after{content:"";position:absolute;left:8%;right:8%;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(150,220,255,.8),transparent);filter:blur(.5px);animation:dsk-brand-sweep 3.4s 1.2s ease-in-out infinite;opacity:0;pointer-events:none}
.dsk-brand-line{position:relative;width:clamp(180px,24vw,340px);height:1px;margin:2px auto 0;background:linear-gradient(90deg,transparent,rgba(120,200,255,.45),transparent);overflow:hidden}
.dsk-brand-line::after{content:"";position:absolute;top:-2px;left:-20%;width:34%;height:5px;background:linear-gradient(90deg,transparent,#9af2ff,transparent);filter:blur(.4px);animation:dsk-brand-dot 2.6s ease-in-out infinite}
@keyframes dsk-brand-in{0%{opacity:0;clip-path:inset(0 100% 0 0)}55%{opacity:1}100%{opacity:1;clip-path:inset(0 0 0 0)}}
@keyframes dsk-brand-sweep{0%{transform:translateY(0);opacity:0}12%{opacity:.7}55%{transform:translateY(74px);opacity:.25}70%,100%{transform:translateY(74px);opacity:0}}
@keyframes dsk-brand-dot{0%{left:-20%;opacity:0}18%{opacity:1}82%{opacity:1}100%{left:100%;opacity:0}}
.dsk-tag{font-family:var(--dsk-mono);font-size:11px;letter-spacing:.42em;color:rgba(140,200,255,.6);text-transform:uppercase}
.dsk-panel{position:relative;overflow:hidden;border:1px solid rgba(120,200,255,.14);border-radius:10px;padding:14px 18px 16px;background:linear-gradient(180deg,rgba(20,40,80,.42),rgba(8,16,32,.32));backdrop-filter:blur(6px);animation:dsk-rise .55s cubic-bezier(.2,.8,.2,1) both}
.dsk-panel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,rgba(56,200,255,.65),transparent)}
.dsk-panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.dsk-panel-title{font-family:var(--dsk-display);font-size:12px;font-weight:600;letter-spacing:.26em;color:#9ad4ff;text-transform:uppercase}
.dsk-panel-count{display:flex;align-items:center;gap:6px;font-family:var(--dsk-mono);font-size:10px;letter-spacing:.18em;color:rgba(140,200,255,.55)}
.dsk-orb{width:5px;height:5px;border-radius:50%;background:#38c8ff;box-shadow:0 0 8px #38c8ff;animation:dsk-pulse 1.6s ease-in-out infinite}
.dsk-sessions{display:grid;grid-template-columns:1fr 1fr;column-gap:32px}
.dsk-session{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(120,200,255,.08);animation:dsk-row .5s both;animation-delay:calc(var(--i,0) * 60ms)}
.dsk-session:last-child{border-bottom:0}
.dsk-idx{font-family:var(--dsk-mono);font-size:10px;color:rgba(120,190,255,.45)}
.dsk-name{font-family:var(--dsk-display);font-size:14px;letter-spacing:.02em;color:#dceaff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsk-meta{font-family:var(--dsk-mono);font-size:10px;color:rgba(140,200,255,.5);white-space:nowrap}
.dsk-stack{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:20px;align-items:stretch;height:100%}
.dsk-stack .dsk-panel{display:flex;flex-direction:column;min-height:0}
.dsk-models{display:grid;gap:1px;overflow:hidden}
.dsk-model-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;gap:12px;align-items:center;padding:5px 0;border-bottom:1px solid rgba(120,200,255,.07);animation:dsk-row .45s both;animation-delay:calc(var(--i,0) * 35ms)}
.dsk-model-row:last-child{border-bottom:0}
.dsk-model-name{font-family:var(--dsk-display);font-size:13px;color:#e2eeff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsk-model-row.is-default .dsk-model-name{color:#9af2ff;text-shadow:0 0 12px rgba(56,200,255,.35)}
.dsk-model-tag{font-family:var(--dsk-mono);font-size:8.5px;letter-spacing:.16em;color:#5ef0b0;border:1px solid rgba(94,240,176,.45);border-radius:3px;padding:2px 5px;white-space:nowrap}
.dsk-model-ctx{font-family:var(--dsk-mono);font-size:9.5px;color:rgba(140,200,255,.55);letter-spacing:.06em;white-space:nowrap}
.dsk-model-provider{font-family:var(--dsk-mono);font-size:9px;color:rgba(120,170,230,.4);white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}
.dsk-chips{display:flex;flex-wrap:wrap;gap:6px;overflow:hidden}
.dsk-chip{font-family:var(--dsk-mono);font-size:10.5px;line-height:1;color:#bfe0ff;border:1px solid rgba(120,200,255,.22);background:rgba(40,90,160,.18);border-radius:999px;padding:5px 9px;animation:dsk-row .45s both;animation-delay:calc(var(--i,0) * 35ms)}
.dsk-plugin-panel{display:flex;width:100%;height:100%;min-height:0}
.dsk-plugin-panel .dsk-panel{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}
.dsk-plugins{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);column-gap:14px;flex:1;min-height:0;overflow:hidden}
.dsk-plugin-chip{font-family:var(--dsk-mono);font-size:9px;line-height:1.5;color:rgba(191,224,255,.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-self:center;animation:dsk-row .4s both;animation-delay:calc(var(--i,0) * 4ms)}
.dsk-empty{font-family:var(--dsk-mono);font-size:10px;letter-spacing:.18em;color:rgba(140,200,255,.45);padding:10px 0}
.dsk-auth-ring{width:74px;height:74px;border-radius:50%;border:1px solid rgba(94,240,176,.55);display:flex;align-items:center;justify-content:center;box-shadow:0 0 34px rgba(94,240,176,.25),inset 0 0 22px rgba(94,240,176,.12);animation:dsk-auth-pop .7s cubic-bezier(.2,.8,.2,1) both}
.dsk-auth-check{font-size:30px;line-height:1;color:#5ef0b0}
@keyframes dsk-auth-pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}
.dsk-auth-title{font-family:var(--dsk-display);font-size:clamp(26px,4vw,44px);font-weight:600;letter-spacing:.3em;color:#5ef0b0;text-shadow:0 0 26px rgba(94,240,176,.45);text-transform:uppercase;text-align:center}
.dsk-auth-subtitle{font-family:var(--dsk-mono);font-size:10px;letter-spacing:.42em;color:rgba(94,240,176,.6);text-transform:uppercase}
.dsk-auth-line{width:min(360px,60%);height:1px;background:linear-gradient(90deg,transparent,rgba(94,240,176,.6),transparent);margin-top:6px}
.dsk-skip{pointer-events:auto;border:1px solid rgba(120,200,255,.28);background:rgba(10,24,48,.55);color:#9ad4ff;font-family:var(--dsk-mono);font-size:10px;letter-spacing:.24em;padding:8px 12px;border-radius:6px;cursor:pointer;text-transform:uppercase}
.dsk-skip:hover{background:rgba(30,70,130,.6);border-color:rgba(150,220,255,.5)}
.dsk-skip:focus-visible{outline:2px solid #38c8ff;outline-offset:2px}
.dsk-bottom{position:absolute;left:0;right:0;bottom:0;z-index:5;padding:16px clamp(22px,3.4vw,52px) 20px;background:linear-gradient(180deg,rgba(4,8,16,0),rgba(4,8,16,.82) 38%,rgba(4,8,16,.94))}
.dsk-bottom-meta{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:9px;font-family:var(--dsk-mono);font-size:9.5px;letter-spacing:.24em;color:rgba(140,200,255,.55);text-transform:uppercase}
.dsk-bottom-stats{display:flex;align-items:center;gap:14px;white-space:nowrap}
.dsk-bottom-stats b{color:#9af2ff;font-weight:600}
.dsk-track{position:relative;height:3px;background:rgba(120,200,255,.12);overflow:hidden;border-radius:2px}
.dsk-track-fill{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#2f6dff,#38c8ff 70%,#9af2ff);box-shadow:0 0 14px rgba(56,200,255,.8);transition:width .18s linear}
.dsk-track-ticks{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,transparent 0 39px,rgba(4,8,16,.9) 39px 41px);pointer-events:none}
@keyframes dsk-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes dsk-row{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes dsk-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
@media (max-width:860px){.dsk-stack{grid-template-columns:1fr}.dsk-sessions{grid-template-columns:1fr}.dsk-screen{height:auto}.dsk-auth-title{letter-spacing:.18em}}
@media (prefers-reduced-motion:reduce){.dsk-root *,.dsk-root *::before,.dsk-root *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
.dsk-light{background:#f3f6fc;color:#16233a}
.dsk-light .dsk-bg{background:radial-gradient(1100px 720px at 50% -10%,rgba(56,132,255,.16),transparent 62%),radial-gradient(900px 640px at 88% 110%,rgba(0,190,230,.10),transparent 60%),radial-gradient(700px 500px at 8% 100%,rgba(124,92,255,.09),transparent 60%)}
.dsk-light .dsk-grid{background-image:linear-gradient(rgba(40,90,170,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(40,90,170,.10) 1px,transparent 1px);opacity:.55}
.dsk-light .dsk-scan{background:linear-gradient(180deg,transparent 0%,rgba(60,140,255,.05) 45%,rgba(60,140,255,.09) 50%,rgba(60,140,255,.05) 55%,transparent 100%)}
.dsk-light .dsk-frame{border-color:rgba(30,90,170,.18)}
.dsk-light .dsk-corner{border-color:rgba(30,110,210,.5)}
.dsk-light .dsk-brand{filter:drop-shadow(0 0 10px rgba(77,107,254,.18))}
.dsk-light .dsk-brand-echo{opacity:.22}
.dsk-light .dsk-brand-line{background:linear-gradient(90deg,transparent,rgba(30,90,170,.35),transparent)}
.dsk-light .dsk-top{color:rgba(30,70,130,.78)}
.dsk-light .dsk-top-b{color:rgba(30,90,170,.55)}
.dsk-light .dsk-skip{background:rgba(255,255,255,.82);border-color:rgba(30,90,170,.28);color:#1d4ed8}
.dsk-light .dsk-skip:hover{background:rgba(219,234,254,.92);border-color:rgba(30,90,170,.45)}
.dsk-light .dsk-scene-head{color:rgba(40,80,140,.62)}
.dsk-light .dsk-scene-index{color:#2f6dff}
.dsk-light .dsk-scene-title{color:#1d4ed8}
.dsk-light .dsk-scene-line{background:linear-gradient(90deg,rgba(40,100,190,.4),transparent)}
.dsk-light .dsk-scene-extra{color:rgba(40,80,140,.55)}
.dsk-light .dsk-panel{background:linear-gradient(180deg,rgba(255,255,255,.94),rgba(240,246,255,.88));border-color:rgba(30,90,170,.16);box-shadow:0 10px 28px rgba(30,60,120,.07)}
.dsk-light .dsk-panel::before{background:linear-gradient(180deg,transparent,rgba(56,140,255,.55),transparent)}
.dsk-light .dsk-panel-title{color:#1d4ed8}
.dsk-light .dsk-panel-count{color:rgba(40,80,140,.6)}
.dsk-light .dsk-orb{background:#2563eb;box-shadow:0 0 8px rgba(37,99,235,.7)}
.dsk-light .dsk-idx{color:rgba(40,90,150,.5)}
.dsk-light .dsk-name{color:#16233a}
.dsk-light .dsk-meta{color:rgba(40,80,140,.6)}
.dsk-light .dsk-session,.dsk-light .dsk-model-row{border-bottom-color:rgba(30,90,170,.1)}
.dsk-light .dsk-model-name{color:#16233a}
.dsk-light .dsk-model-row.is-default .dsk-model-name{color:#1556d0;text-shadow:none}
.dsk-light .dsk-model-tag{color:#0f9f6e;border-color:rgba(15,159,110,.45)}
.dsk-light .dsk-model-ctx{color:rgba(40,80,140,.62)}
.dsk-light .dsk-model-provider{color:rgba(40,90,160,.5)}
.dsk-light .dsk-chip{color:#1e3a8a;border-color:rgba(40,110,200,.28);background:rgba(219,234,254,.72)}
.dsk-light .dsk-plugin-chip{color:rgba(22,40,70,.92)}
.dsk-light .dsk-empty{color:rgba(40,80,140,.55)}
.dsk-light .dsk-tag{color:rgba(40,90,160,.7)}
.dsk-light .dsk-bottom{background:linear-gradient(180deg,rgba(243,246,252,0),rgba(243,246,252,.88) 38%,rgba(243,246,252,.97))}
.dsk-light .dsk-bottom-meta{color:rgba(40,80,140,.6)}
.dsk-light .dsk-track{background:rgba(30,90,170,.14)}
.dsk-light .dsk-auth-ring{border-color:rgba(22,163,74,.5);box-shadow:0 0 34px rgba(22,163,74,.16),inset 0 0 22px rgba(22,163,74,.1)}
.dsk-light .dsk-auth-check{color:#16a34a}
.dsk-light .dsk-auth-title{color:#16a34a;text-shadow:0 0 24px rgba(22,163,74,.18)}
.dsk-light .dsk-auth-subtitle{color:rgba(22,140,74,.75)}
.dsk-light .dsk-auth-line{background:linear-gradient(90deg,transparent,rgba(22,163,74,.5),transparent)}
`

    const BRAND_SVG = "<path d=\"M78.6785 18.6823H77.1078V16.2472H78.6785C79.6513 16.2472 80.6342 16.0047 81.2672 15.3308C81.9009 14.6569 82.14 13.6232 82.14 12.59C82.14 11.5569 81.9109 10.5231 81.2672 9.84981C80.6247 9.17594 79.6513 8.93343 78.6785 8.93343C77.7056 8.93343 76.7228 9.17594 76.0886 9.84981C75.4549 10.5237 75.2158 11.5569 75.2158 12.59V22.5909H72.4605V6.50781H75.2158V7.53204H75.7209C75.7757 7.4689 75.8304 7.41525 75.8857 7.36161C76.5752 6.73244 77.6308 6.50781 78.6684 6.50781C80.2944 6.50781 81.9193 6.91236 82.9849 8.03549C84.0499 9.15861 84.4265 10.8835 84.4265 12.6001C84.4265 14.3166 84.0404 16.0326 82.9849 17.1647C81.9288 18.2967 80.2944 18.6834 78.6785 18.6834V18.6823Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M36.7486 6.94097H38.3188V9.37609H36.7486C35.7753 9.37609 34.7929 9.61859 34.1593 10.2925C33.5257 10.9663 33.2871 12.0001 33.2871 13.0332C33.2871 14.0664 33.5167 15.0996 34.1593 15.7734C34.8019 16.4473 35.7753 16.6898 36.7486 16.6898C37.722 16.6898 38.7049 16.4473 39.3385 15.7734C39.9722 15.0996 40.2108 14.0664 40.2108 13.0332V3.02344H42.9655V19.116H40.2108V18.0918H39.7057C39.6503 18.1544 39.5956 18.2086 39.5403 18.2622C38.8513 18.8908 37.7952 19.116 36.7576 19.116C35.1321 19.116 33.5067 18.712 32.4416 17.5889C31.3766 16.4658 31 14.7403 31 13.0243C31 11.3083 31.3856 9.59177 32.4416 8.45971C33.5067 7.33658 35.1321 6.94097 36.7486 6.94097Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M56.7855 12.8155V13.795H49.4483V11.8454H54.3152C54.2051 11.1358 53.9481 10.4709 53.4887 9.9853C52.8277 9.2846 51.808 9.03316 50.7983 9.03316C49.7886 9.03316 48.7688 9.2846 48.1078 9.9853C47.4468 10.686 47.2076 11.7555 47.2076 12.816C47.2076 13.8766 47.4462 14.9544 48.1078 15.6462C48.7688 16.338 49.788 16.5989 50.7983 16.5989C51.8085 16.5989 52.8277 16.3475 53.4887 15.6462C53.5804 15.5473 53.6631 15.4395 53.7458 15.3316H56.4642C56.2256 16.1765 55.849 16.9403 55.2796 17.5332C54.1777 18.692 52.479 19.1145 50.7983 19.1145C49.1175 19.1145 47.4188 18.701 46.3169 17.5332C45.215 16.3653 44.8111 14.5862 44.8111 12.816C44.8111 11.0458 45.2061 9.25778 46.3169 8.0989C47.4283 6.94001 49.1175 6.51758 50.7983 6.51758C52.479 6.51758 54.1777 6.93107 55.2796 8.0989C56.3904 9.26672 56.7855 11.0458 56.7855 12.816V12.8155Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M70.6151 12.8155V13.795H63.2779V11.8454H68.1448C68.0341 11.1358 67.7776 10.4709 67.3183 9.9853C66.6573 9.2846 65.6376 9.03316 64.6279 9.03316C63.6182 9.03316 62.5984 9.2846 61.9374 9.9853C61.2764 10.686 61.0372 11.7555 61.0372 12.816C61.0372 13.8766 61.2758 14.9544 61.9374 15.6462C62.5984 16.338 63.6182 16.5989 64.6279 16.5989C65.6376 16.5989 66.6573 16.3475 67.3183 15.6462C67.4105 15.5473 67.4927 15.4395 67.5748 15.3316H70.2938C70.0546 16.1765 69.678 16.9403 69.1086 17.5332C68.0067 18.692 66.3081 19.1145 64.6279 19.1145C62.9476 19.1145 61.2484 18.701 60.1465 17.5332C59.0446 16.3653 58.6406 14.5862 58.6406 12.816C58.6406 11.0458 59.0357 9.25778 60.1465 8.0989C61.2579 6.94001 62.9471 6.51758 64.6279 6.51758C66.3086 6.51758 68.0067 6.93107 69.1086 8.0989C70.22 9.26672 70.6151 11.0458 70.6151 12.816V12.8155Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M92.2781 19.1156C93.9589 19.1156 95.657 18.8731 96.7589 18.1813C97.8608 17.4896 98.2653 16.438 98.2653 15.3959C98.2653 14.3538 97.8697 13.2932 96.7589 12.6104C95.657 11.9276 93.9583 11.6756 92.2781 11.6756C91.5612 11.6756 90.9002 11.5767 90.4319 11.3163C89.9637 11.0464 89.7893 10.6424 89.7893 10.2379C89.7893 9.83332 89.9547 9.42039 90.4319 9.15944C90.9002 8.88955 91.626 8.80015 92.3418 8.80015C93.0576 8.80015 93.7834 8.89905 94.2528 9.15944C94.721 9.42933 94.8954 9.83332 94.8954 10.2379H97.6959C97.6959 9.1952 97.3383 8.13522 96.3376 7.4524C95.3368 6.76958 93.803 6.51758 92.2787 6.51758C90.7543 6.51758 89.2211 6.76008 88.2198 7.4524C87.219 8.14416 86.8603 9.1952 86.8603 10.2379C86.8603 11.2805 87.2185 12.3405 88.2198 13.0233C89.2205 13.7061 90.7538 13.9582 92.2787 13.9582C93.0682 13.9582 93.941 14.0571 94.464 14.3174C94.9881 14.5784 95.1714 14.9913 95.1714 15.3959C95.1714 15.8004 94.9881 16.2133 94.464 16.4743C93.941 16.7347 93.142 16.8336 92.3524 16.8336C91.5629 16.8336 90.7543 16.7347 90.2397 16.4743C89.7256 16.2139 89.5323 15.8004 89.5323 15.3959H86.2998C86.2998 16.4385 86.6943 17.4985 87.8063 18.1813C88.9171 18.8641 90.5979 19.1156 92.2787 19.1156H92.2781Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M112.094 12.8155V13.795H104.757V11.8454H109.624C109.514 11.1358 109.257 10.4709 108.798 9.9853C108.136 9.2846 107.117 9.03316 106.106 9.03316C105.095 9.03316 104.077 9.2846 103.416 9.9853C102.755 10.686 102.517 11.7555 102.517 12.816C102.517 13.8766 102.755 14.9544 103.416 15.6462C104.077 16.338 105.097 16.5989 106.106 16.5989C107.116 16.5989 108.136 16.3475 108.798 15.6462C108.889 15.5473 108.972 15.4395 109.054 15.3316H111.772C111.533 16.1765 111.157 16.9403 110.588 17.5332C109.486 18.692 107.787 19.1145 106.106 19.1145C104.425 19.1145 102.727 18.701 101.625 17.5332C100.524 16.3653 100.12 14.5862 100.12 12.816C100.12 11.0458 100.515 9.25778 101.625 8.0989C102.737 6.94001 104.427 6.51758 106.106 6.51758C107.786 6.51758 109.486 6.93107 110.588 8.0989C111.699 9.26672 112.093 11.0458 112.093 12.816L112.094 12.8155Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M125.924 12.8155V13.795H118.586V11.8454H123.453C123.344 11.1358 123.086 10.4709 122.627 9.9853C121.966 9.2846 120.947 9.03316 119.936 9.03316C118.926 9.03316 117.907 9.2846 117.246 9.9853C116.585 10.686 116.346 11.7555 116.346 12.816C116.346 13.8766 116.585 14.9544 117.246 15.6462C117.907 16.338 118.927 16.5989 119.936 16.5989C120.946 16.5989 121.966 16.3475 122.627 15.6462C122.719 15.5473 122.801 15.4395 122.885 15.3316H125.602C125.363 16.1765 124.987 16.9403 124.418 17.5332C123.316 18.692 121.617 19.1145 119.936 19.1145C118.256 19.1145 116.558 18.701 115.456 17.5332C114.354 16.3653 113.949 14.5862 113.949 12.816C113.949 11.0458 114.344 9.25778 115.456 8.0989C116.567 6.94001 118.256 6.51758 119.936 6.51758C121.617 6.51758 123.315 6.93107 124.418 8.0989C125.529 9.26672 125.924 11.0458 125.924 12.816V12.8155Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M130.524 3.02344H127.77V19.116H130.524V3.02344Z\" fill=\"var(--dsw-alias-brand-primary)\"/><path d=\"M135.227 12.4384L139.744 19.1146H136.337L131.819 12.4384L136.337 7.07422H139.744L135.227 12.4384Z\" fill=\"var(--dsw-alias-brand-primary)\"/><g clip-path=\"url(#dsk-brand-clip)\"><path d=\"M26.5174 3.39471C26.235 3.2567 26.1137 3.52006 25.9487 3.65346C25.8923 3.69659 25.8446 3.75294 25.7969 3.80469C25.3846 4.24516 24.9027 4.53439 24.2737 4.49989C23.3536 4.44814 22.5682 4.73737 21.8735 5.44119C21.7258 4.57349 21.2353 4.0554 20.4889 3.72304C20.0985 3.55054 19.7034 3.37746 19.4297 3.00197C19.2388 2.73459 19.1865 2.43673 19.091 2.14289C19.0301 1.96579 18.9697 1.78466 18.7656 1.75418C18.5442 1.71968 18.4574 1.90541 18.3705 2.06067C18.0232 2.69549 17.8887 3.39471 17.9019 4.10313C17.9324 5.6965 18.6051 6.96556 19.9421 7.86834C20.0939 7.97184 20.133 8.07535 20.0852 8.22658C19.9938 8.53766 19.8857 8.83955 19.7903 9.15063C19.7293 9.34901 19.6385 9.39271 19.4257 9.30588C18.692 8.9994 18.0583 8.54571 17.4982 7.99772C16.5477 7.07827 15.6881 6.06336 14.6162 5.26869C14.3644 5.08296 14.1125 4.91045 13.8521 4.746C12.7584 3.68394 13.9952 2.81164 14.2816 2.70814C14.5812 2.60003 14.3857 2.22857 13.4179 2.23317C12.4502 2.2372 11.5646 2.56151 10.4359 2.99335C10.2708 3.05832 10.0972 3.10547 9.91951 3.14457C8.8954 2.95022 7.83162 2.90709 6.72069 3.03245C4.62877 3.26533 2.95777 4.25436 1.72954 5.94261C0.254043 7.97184 -0.0932679 10.2777 0.33167 12.6824C0.778458 15.2171 2.07225 17.3153 4.06008 18.9558C6.12152 20.6567 8.49577 21.4905 11.2047 21.3306C12.8498 21.2358 14.6812 21.0155 16.7473 19.2669C17.2682 19.5262 17.8151 19.6297 18.7219 19.7074C19.4205 19.7724 20.0933 19.6729 20.6143 19.5648C21.4302 19.3923 21.3739 18.6367 21.0789 18.4981C18.6874 17.3843 19.2124 17.8374 18.7351 17.4706C19.9501 16.033 21.8063 13.4776 22.379 9.99821C22.4353 9.61409 22.5072 9.073 22.4986 8.76192C22.494 8.57216 22.5377 8.49856 22.7545 8.47671C23.3536 8.40771 23.935 8.24383 24.4692 7.94999C26.0188 7.10357 26.6439 5.71318 26.7911 4.04678C26.8129 3.79204 26.7865 3.52869 26.5174 3.39471ZM13.0143 18.3946C10.6964 16.5724 9.5722 15.9726 9.10816 15.9985C8.67402 16.0244 8.75222 16.5212 8.84768 16.8449C8.94773 17.1646 9.07768 17.3849 9.25996 17.6655C9.38589 17.8512 9.47272 18.1272 9.13404 18.3348C8.38766 18.7965 7.08985 18.1796 7.0289 18.1491C5.51833 17.2595 4.25559 16.0853 3.36546 14.4793C2.50581 12.9337 2.0067 11.2753 1.92447 9.50542C1.90262 9.07818 2.02855 8.92695 2.45406 8.84932C3.01413 8.74582 3.59144 8.72397 4.15093 8.80619C6.51656 9.15178 8.53027 10.2092 10.2185 11.8848C11.1822 12.8388 11.9114 13.979 12.6623 15.0929C13.461 16.2757 14.3201 17.4027 15.4144 18.3268C15.8008 18.6505 16.109 18.8966 16.404 19.0783C15.5144 19.1778 14.0297 19.1991 13.0143 18.3958V18.3946ZM14.1252 11.2489C14.1252 11.0591 14.277 10.9079 14.4679 10.9079C14.511 10.9079 14.5501 10.9165 14.5852 10.9292C14.6329 10.9464 14.6766 10.9723 14.7111 11.0114C14.7721 11.0718 14.8066 11.158 14.8066 11.2489C14.8066 11.4386 14.6548 11.5899 14.4639 11.5899C14.273 11.5899 14.1252 11.4386 14.1252 11.2489ZM17.5759 13.0188C17.3545 13.1096 17.1331 13.1873 16.9203 13.1959C16.5903 13.2131 16.2303 13.0791 16.0348 12.9153C15.7312 12.6605 15.5139 12.5179 15.423 12.0734C15.3839 11.8837 15.4057 11.5899 15.4402 11.4214C15.5185 11.0585 15.4316 10.8257 15.1757 10.614C14.9676 10.4415 14.7025 10.3938 14.4115 10.3938C14.3029 10.3938 14.2034 10.3461 14.1292 10.3076C14.0079 10.2472 13.9078 10.096 14.0033 9.91023C14.0338 9.84985 14.1815 9.70322 14.216 9.67734C14.6111 9.45251 15.0665 9.52612 15.488 9.6946C15.8784 9.85445 16.174 10.1477 16.5989 10.5623C17.033 11.0631 17.1112 11.2011 17.3585 11.5772C17.554 11.871 17.7317 12.1729 17.8536 12.5185C17.9272 12.7341 17.8317 12.9107 17.5759 13.0188Z\" fill=\"var(--dsw-alias-brand-primary)\"/></g><defs><clipPath id=\"dsk-brand-clip\"><rect width=\"26.634\" height=\"19.6\" fill=\"white\" transform=\"translate(0.163086 1.75)\"/></clipPath></defs>";
    // @dsh-brand-inline (generated from brand.svg)

    function BrandLogo() {
      return h('svg', {
        className: 'dsk-brand',
        viewBox: '0 0 143 23',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        role: 'img',
        'aria-label': 'DeepSeek',
        dangerouslySetInnerHTML: { __html: BRAND_SVG },
      })
    }

    function ScreenHead(parts) {
      return h(
        'div',
        { className: 'dsk-scene-head' },
        h('span', { className: 'dsk-scene-index' }, parts.index),
        h('span', { className: 'dsk-scene-title' }, parts.title),
        h('span', { className: 'dsk-scene-line' }),
        parts.extra ? h('span', { className: 'dsk-scene-extra' }, parts.extra) : null,
      )
    }

    function Panel(parts) {
      return h(
        'section',
        { className: 'dsk-panel' },
        h(
          'div',
          { className: 'dsk-panel-head' },
          h('span', { className: 'dsk-panel-title' }, parts.title),
          h(
            'span',
            { className: 'dsk-panel-count' },
            h('span', { className: 'dsk-orb' }),
            parts.count,
          ),
        ),
        parts.body,
      )
    }

    function pad(value) {
      const text = String(value)
      return text.length < 2 ? '0' + text : text
    }

    function compactCount(value) {
      const number = Number(value)
      if (!Number.isFinite(number) || number <= 0) return '—'
      if (number >= 1000000) {
        const millions = number / 1000000
        return (Number.isInteger(millions) ? String(millions) : millions.toFixed(1)) + 'M'
      }
      if (number >= 1000) return Math.round(number / 1000) + 'K'
      return String(number)
    }

    function shortPath(value) {
      const text = String(value || '').trim()
      if (text === '') return ''
      const parts = text.replace(/\\/g, '/').split('/').filter(Boolean)
      if (parts.length === 0) return ''
      if (parts.length <= 2) return parts.join('/')
      return '…/' + parts.slice(-2).join('/')
    }

    function Splash(props) {
      const t = props.t
      const useSessionsHook = props.useSessions
      const store = typeof useSessionsHook === 'function' ? useSessionsHook((snapshot) => snapshot) : null
      const [data, setData] = useState(null)
      const [stage, setStage] = useState(0)
      const [progress, setProgress] = useState(0)
      const [exiting, setExiting] = useState(false)
      const [done, setDone] = useState(function () {
        return splashSettled
      })
      const [dark, setDark] = useState(function () {
        if (typeof document === 'undefined' || !document.body) return true
        return document.body.hasAttribute('data-ds-dark-theme')
      })

      useEffect(
        function () {
          if (done) splashSettled = true
        },
        [done],
      )

      useEffect(
        function () {
          if (typeof document === 'undefined' || !document.body) return undefined
          const body = document.body
          const sync = function () {
            setDark(body.hasAttribute('data-ds-dark-theme'))
          }
          sync()
          if (typeof MutationObserver !== 'function') return undefined
          const observer = new MutationObserver(sync)
          observer.observe(body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
          return function () {
            observer.disconnect()
          }
        },
        [],
      )

      useEffect(
        function () {
          if (splashSettled) {
            setDone(true)
            return undefined
          }
          const reduced =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
          const speed = reduced ? 0.4 : 1
          const timers = []
          const at = function (ms, fn) {
            timers.push(window.setTimeout(fn, Math.round(ms * speed)))
          }
          at(1300, function () {
            setStage(function (value) {
              return Math.max(value, 1)
            })
          })
          at(3000, function () {
            setStage(function (value) {
              return Math.max(value, 2)
            })
          })
          at(4900, function () {
            setStage(function (value) {
              return Math.max(value, 3)
            })
          })
          at(7000, function () {
            setStage(function (value) {
              return Math.max(value, 4)
            })
          })
          at(8500, function () {
            setExiting(true)
          })
          at(9400, function () {
            setDone(true)
          })
          const skip = function () {
            setExiting(true)
            setProgress(100)
            timers.push(
              window.setTimeout(function () {
                setDone(true)
              }, Math.round(900 * speed)),
            )
          }
          const onKey = function (event) {
            if (splashSettled) return
            if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              skip()
            }
          }
          window.addEventListener('keydown', onKey)
          return function () {
            window.removeEventListener('keydown', onKey)
            for (const timer of timers) window.clearTimeout(timer)
          }
        },
        [],
      )

      useEffect(
        function () {
          if (stage >= 4) setProgress(100)
        },
        [stage],
      )

      useEffect(
        function () {
          let raf = 0
          const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
          const tick = function (now) {
            const ratio = Math.min(1, (now - start) / 7000)
            setProgress(Math.round(ratio * 100))
            if (ratio < 1) raf = window.requestAnimationFrame(tick)
          }
          raf = window.requestAnimationFrame(tick)
          return function () {
            window.cancelAnimationFrame(raf)
          }
        },
        [],
      )

      useEffect(
        function () {
          fetch('/deepseek-splash-api/ping', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}',
          }).catch(function () {
            return undefined
          })
        },
        [],
      )

      useEffect(
        function () {
          let alive = true
          let attempt = 0
          const load = function () {
            attempt += 1
            fetch('/deepseek-splash-api/state', { cache: 'no-store', headers: { accept: 'application/json' } })
              .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status)
                return response.json()
              })
              .then(function (value) {
                if (!alive) return
                if (value && value.ok) setData(value)
                else if (attempt < 3) window.setTimeout(load, 500)
              })
              .catch(function () {
                if (alive && attempt < 3) window.setTimeout(load, 500)
              })
          }
          load()
          return function () {
            alive = false
          }
        },
        [],
      )

      if (done) return null

      const serverSessions = data && Array.isArray(data.sessions) ? data.sessions : []
      const storeSessions =
        store && Array.isArray(store.ids)
          ? store.ids
              .map(function (id) {
                return store.byId ? store.byId[id] : undefined
              })
              .filter(function (session) {
                return session && session.origin !== 'subagent'
              })
          : []
      const sessions = (serverSessions.length > 0
        ? serverSessions
        : storeSessions.map(function (session) {
            return {
              id: session.id,
              title: session.displayTitle || '',
              cwd: session.cwd || '',
            }
          })
      )
        .filter(function (session) {
          return session && session.id && session.title
        })
        .slice(0, 12)

      const catalog = data && data.modelCatalog ? data.modelCatalog : null
      const models = catalog && Array.isArray(catalog.models) ? catalog.models : []
      const defaultSelection = catalog && catalog.defaultSelection ? catalog.defaultSelection : null
      const pluginList = (data && Array.isArray(data.plugins) ? data.plugins : []).filter(function (plugin) {
        return plugin && plugin.enabled !== false && (plugin.phase === null || plugin.phase === 'active')
      })
      const plugins = pluginList.length
      const skills = (data && Array.isArray(data.skills) ? data.skills : [])
        .map(function (skill) {
          return skill.name
        })
        .filter(function (name, index, list) {
          return name && list.indexOf(name) === index
        })
        .slice(0, 24)

      const scanning = data === null
      const stageLabel = t(stage < 1 ? 'stage0' : stage < 2 ? 'stage1' : stage < 3 ? 'stack' : stage < 4 ? 'plugins' : 'granted')

      const skipSplash = function () {
        setExiting(true)
        setProgress(100)
        window.setTimeout(function () {
          setDone(true)
        }, 900)
      }

      const sessionBody =
        sessions.length > 0
          ? h(
              'div',
              { className: 'dsk-sessions' },
              sessions.map(function (session, index) {
                return h(
                  'div',
                  { className: 'dsk-session', key: session.id, style: { '--i': String(index) } },
                  h('span', { className: 'dsk-idx' }, pad(index + 1)),
                  h('span', { className: 'dsk-name' }, session.title || String(session.id).slice(0, 8)),
                  h('span', { className: 'dsk-meta' }, shortPath(session.cwd)),
                )
              }),
            )
          : h('div', { className: 'dsk-empty' }, scanning ? t('scanning') : t('empty'))

      const modelBody =
        models.length > 0
          ? h(
              'div',
              { className: 'dsk-models' },
              models.map(function (model, index) {
                const isDefault =
                  defaultSelection !== null &&
                  defaultSelection.provider === model.provider &&
                  defaultSelection.model === model.id
                return h(
                  'div',
                  {
                    className: 'dsk-model-row' + (isDefault ? ' is-default' : ''),
                    key: model.provider + '/' + model.id,
                    style: { '--i': String(index) },
                  },
                  h('span', { className: 'dsk-model-name' }, model.name || model.id),
                  isDefault ? h('span', { className: 'dsk-model-tag' }, 'DEFAULT') : null,
                  h('span', { className: 'dsk-model-ctx' }, compactCount(model.contextWindow) + ' ctx'),
                  h('span', { className: 'dsk-model-provider' }, model.provider),
                )
              }),
            )
          : h('div', { className: 'dsk-empty' }, scanning ? t('scanning') : t('offline'))

      const skillBody =
        skills.length > 0
          ? h(
              'div',
              { className: 'dsk-chips' },
              skills.map(function (name, index) {
                return h(
                  'span',
                  { className: 'dsk-chip', key: name + ':' + index, style: { '--i': String(index) } },
                  name,
                )
              }),
            )
          : h('div', { className: 'dsk-empty' }, scanning ? t('scanning') : t('offline'))

      const PLUGIN_ROWS = 30
      const pluginColumns = Math.max(1, Math.min(8, Math.ceil(pluginList.length / PLUGIN_ROWS)))
      const pluginRows = Math.max(1, Math.ceil(pluginList.length / pluginColumns))
      const pluginBody =
        pluginList.length > 0
          ? h(
              'div',
              {
                className: 'dsk-plugins',
                style: { gridTemplateRows: 'repeat(' + pluginRows + ', minmax(0,1fr))' },
              },
              pluginList.map(function (plugin, index) {
                const moduleName = String(plugin.name || plugin.id || '')
                const label = moduleName.replace(/^@[^/]+\//, '') || moduleName
                return h(
                  'span',
                  {
                    className: 'dsk-plugin-chip',
                    key: moduleName + ':' + index,
                    title: moduleName,
                    style: { '--i': String(Math.min(index, 30)) },
                  },
                  label,
                )
              }),
            )
          : h('div', { className: 'dsk-empty' }, scanning ? t('scanning') : t('offline'))

      return h(
        'div',
        {
          className: 'dsk-root' + (dark ? '' : ' dsk-light'),
          'data-exit': exiting ? 'true' : 'false',
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': t('title'),
        },
        h('style', null, CSS),
        h('div', { className: 'dsk-bg', 'aria-hidden': 'true' }),
        h('div', { className: 'dsk-grid', 'aria-hidden': 'true' }),
        h('div', { className: 'dsk-scan', 'aria-hidden': 'true' }),
        h(
          'div',
          { className: 'dsk-frame', 'aria-hidden': 'true' },
          h('span', { className: 'dsk-corner dsk-corner-tl' }),
          h('span', { className: 'dsk-corner dsk-corner-tr' }),
          h('span', { className: 'dsk-corner dsk-corner-bl' }),
          h('span', { className: 'dsk-corner dsk-corner-br' }),
        ),
        h(
          'header',
          { className: 'dsk-top' },
          h('span', null, t('brand')),
          h(
            'div',
            { className: 'dsk-top-right' },
            h('span', { className: 'dsk-top-b' }, t('boot') + ' // ' + stageLabel),
            h('button', { type: 'button', className: 'dsk-skip', onClick: skipSplash }, t('skip') + '  ESC'),
          ),
        ),
        h(
          'div',
          { className: 'dsk-stage' },
          stage === 0
            ? h(
                'div',
                { className: 'dsk-screen', key: 'screen-0' },
                ScreenHead({ index: '01', title: t('identity'), extra: t('brand') }),
                h(
                  'div',
                  { className: 'dsk-screen-body' },
                  h(
                    'div',
                    { className: 'dsk-brand-wrap' },
                    h('div', { className: 'dsk-brand-echo', 'aria-hidden': 'true' }, h(BrandLogo, null)),
                    h('div', { className: 'dsk-brand-main' }, h(BrandLogo, null)),
                  ),
                  h('div', { className: 'dsk-brand-line', 'aria-hidden': 'true' }),
                  h('div', { className: 'dsk-tag' }, t('subtitle')),
                ),
              )
            : null,
          stage === 1
            ? h(
                'div',
                { className: 'dsk-screen', key: 'screen-1' },
                ScreenHead({ index: '02', title: t('sessions'), extra: scanning ? '--' : pad(sessions.length) }),
                h(
                  'div',
                  { className: 'dsk-screen-body' },
                  h('div', { style: { width: '100%' } }, Panel({
                    title: t('directory'),
                    count: scanning ? '--' : pad(sessions.length),
                    body: sessionBody,
                  })),
                ),
              )
            : null,
          stage === 2
            ? h(
                'div',
                { className: 'dsk-screen', key: 'screen-2' },
                ScreenHead({
                  index: '03',
                  title: t('stack'),
                  extra: (models.length + skills.length > 0 ? pad(models.length) + ' ' + t('model') + ' / ' + pad(skills.length) + ' ' + t('skills') : '--'),
                }),
                h(
                  'div',
                  { className: 'dsk-screen-body dsk-fill' },
                  h(
                    'div',
                    { className: 'dsk-stack' },
                    Panel({ title: t('model'), count: scanning ? '--' : pad(models.length), body: modelBody }),
                    Panel({ title: t('skills'), count: scanning ? '--' : pad(skills.length), body: skillBody }),
                  ),
                ),
              )
            : null,
          stage === 3
            ? h(
                'div',
                { className: 'dsk-screen', key: 'screen-3' },
                ScreenHead({
                  index: '04',
                  title: t('plugins'),
                  extra: scanning ? '--' : t('loaded'),
                }),
                h(
                  'div',
                  { className: 'dsk-screen-body dsk-fill' },
                  h('div', { className: 'dsk-plugin-panel' }, Panel({
                    title: t('plugins'),
                    count: scanning ? '--' : pad(plugins),
                    body: pluginBody,
                  })),
                ),
              )
            : null,
          stage === 4
            ? h(
                'div',
                { className: 'dsk-screen', key: 'screen-4' },
                ScreenHead({ index: '05', title: t('granted'), extra: t('boot') }),
                h(
                  'div',
                  { className: 'dsk-screen-body' },
                  h('div', { className: 'dsk-auth-ring' }, h('span', { className: 'dsk-auth-check' }, '✓')),
                  h('div', { className: 'dsk-auth-title' }, t('auth')),
                  h('div', { className: 'dsk-auth-subtitle' }, t('entering')),
                  h('div', { className: 'dsk-auth-line', 'aria-hidden': 'true' }),
                ),
              )
            : null,
        ),
        h(
          'div',
          { className: 'dsk-bottom' },
          h(
            'div',
            { className: 'dsk-bottom-meta' },
            h(
              'span',
              { className: 'dsk-bottom-stats' },
              h('span', null, t('sessions') + ' ' + pad(sessions.length)),
              h('span', null, t('model') + ' ' + pad(models.length)),
              h('span', null, t('skills') + ' ' + pad(skills.length)),
              h('span', null, t('plugins') + ' ' + pad(plugins)),
            ),
            h('b', null, (progress < 100 ? pad(progress) : '100') + ' %'),
          ),
          h(
            'div',
            { className: 'dsk-track' },
            h('div', { className: 'dsk-track-fill', style: { width: progress + '%' } }),
            h('div', { className: 'dsk-track-ticks', 'aria-hidden': 'true' }),
          ),
        ),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        /* A stale page can keep an older copy of this module alive; registering the
         * same locale namespace twice must not break the splash. */
        const registerLocale = (locale, dict, label) => {
          ctx.effect(() => {
            try {
              return ctx.locale.register('dsSplash', locale, dict)
            } catch (error) {
              console.warn('deepseek-splash: locale already registered, reusing it', error)
              return () => {}
            }
          }, label)
        }
        registerLocale('en', EN, 'deepseek-splash: en dictionary')
        registerLocale('zh', ZH, 'deepseek-splash: zh dictionary')
        const t = ctx.locale.bind('dsSplash')
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'deepseek-splash',
              order: -1000,
              label: () => t('title'),
            },
            (props) => h(Splash, Object.assign({}, props, { t: t })),
          ),
        )
      },
    }
  },
})
