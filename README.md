# dsh-deepseek-splash

**DSH（DeepSeek Harness）** Web 端的启动开屏动画：品牌标识、已加载的会话 / 插件 / 技能信息，然后淡出进入对话。

## 功能

- 注册到 `shell.overlay`（`order: -1000`），页面启动时覆盖在最上层；
- 播放一段开屏动画，展示加载信息，结束后淡出并移除；
- 每次页面加载只播放一次，不随会话切换重播；
- 跟随主题，尊重系统「减少动态效果」；
- 中英文双语。

## 安装

在 DSH 的「插件管理」里添加本地 bundle，选择本目录；或使用 `plugin_manager` 的 `install_bundle`。

安装后刷新页面即可看到开屏动画。

## 兼容性

- DSH 0.2.x（Web 端）

## 许可

MIT
