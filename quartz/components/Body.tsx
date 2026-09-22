import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// H.cw site navigation. Keep the original Quartz body and its components intact.
const Body: QuartzComponent = ({ children, ctx, cfg, fileData }: QuartzComponentProps) => {
  const prefix = ctx.argv.serve || !cfg.baseUrl
    ? ""
    : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const slug = String(fileData.slug ?? "")
  const links = [
    { label: "首页", path: "", active: slug === "index" },
    { label: "个人主页", path: "about", active: slug === "about" },
    { label: "系列笔记", path: "系列笔记", active: slug === "系列笔记" || !["index", "about", "同行者", "关注我"].includes(slug) },
    { label: "同行者", path: "同行者", active: slug === "同行者" },
    { label: "关注我", path: "关注我", active: slug === "关注我" },
  ]
  const url = (path: string) => path ? `${prefix}/${path}.html` : `${prefix}/`

  return (
    <>
      <nav class="hcw-site-nav" aria-label="网站主导航">
        <a class="hcw-brand" href={url("")} aria-label="H.cw的小屋 首页">
          <span class="hcw-logo">H.</span><span>H.cw的小屋</span>
        </a>
        <div class="hcw-site-links">
          {links.map((item) => (
            <a class={item.active ? "hcw-nav-link active" : "hcw-nav-link"}
               href={url(item.path)} aria-current={item.active ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </div>
        {/* Quartz 自带 darkmode 插件监听 .darkmode，不另写独立主题逻辑。 */}
        <div class="hcw-nav-actions">
        <button
          type="button"
          class="darkmode hcw-theme-toggle"
          aria-label="切换浅色与深色模式"
          title="切换浅色与深色模式"
        >
          <span class="hcw-show-light" aria-hidden="true">☀ 浅色</span>
          <span class="hcw-show-dark" aria-hidden="true">☾ 深色</span>
        </button>
          <div class="hcw-atmo-control" id="hcw-atmo-control">
            <button type="button" class="hcw-atmo-toggle" id="hcw-atmo-toggle"
              aria-label="打开背景氛围设置" aria-expanded="false" aria-controls="hcw-atmo-menu"
              aria-haspopup="dialog">◈ 背景氛围 ▾</button>
            <div class="hcw-atmo-menu" id="hcw-atmo-menu" role="dialog" aria-label="背景氛围设置" hidden>
              <div class="hcw-atmo-menu-head">
                <div><strong>背景氛围</strong><small>背景、卡片与流光独立调节</small></div>
                <button type="button" class="hcw-atmo-close" aria-label="关闭设置" id="hcw-atmo-close">×</button>
              </div>
              <div class="hcw-atmo-label">背景风格</div>
              <div class="hcw-atmo-choices" role="group" aria-label="选择背景风格">
                <button type="button" data-hcw-palette="mist"><span class="hcw-atmo-swatch mist"></span><span>雾面青蓝</span></button>
                <button type="button" data-hcw-palette="ocean"><span class="hcw-atmo-swatch ocean"></span><span>深海蓝</span></button>
                <button type="button" data-hcw-palette="champagne"><span class="hcw-atmo-swatch champagne"></span><span>石墨香槟</span></button>
                <button type="button" data-hcw-palette="aurora"><span class="hcw-atmo-swatch aurora"></span><span>灰紫极光</span></button>
                <button type="button" data-hcw-palette="mountain"><span class="hcw-atmo-swatch mountain"></span><span>雪山</span></button>
              </div>
              <label class="hcw-atmo-label" for="hcw-atmo-opacity">卡片不透明度</label>
              <div class="hcw-atmo-alpha-row">
                <input id="hcw-atmo-opacity" type="range" min="28" max="72" step="1" value="42" aria-label="卡片不透明度" />
                <output id="hcw-atmo-opacity-output" for="hcw-atmo-opacity">42%</output>
              </div>
              <div class="hcw-atmo-label">流光效果</div>
              <div class="hcw-atmo-flow" role="group" aria-label="选择流光强度">
                <button type="button" data-hcw-flow="subtle">柔和</button>
                <button type="button" data-hcw-flow="vivid">明显</button>
                <button type="button" data-hcw-flow="off">关闭</button>
              </div>
              <p class="hcw-atmo-footnote">正文比普通卡片稍厚，以保证长文可读。设置仅保存在你的浏览器中。</p>
            </div>
          </div>
        </div>
      </nav>
      <div id="quartz-body">{children}</div>
      {/* Local student carousel: works both in preview and under /Pro/ on GitHub Pages. */}
      <script src={`${prefix}/static/hcw-peers.js`} defer></script>
      <script src={`${prefix}/static/hcw-follow.js`} defer></script>
      <script src={`${prefix}/static/hcw-library-reader-clean.js`} defer></script>
      <script src={`${prefix}/static/hcw-site-bg.js`} defer></script>
      <script src={`${prefix}/static/hcw-about-v2.js`} defer></script>
    </>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
