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
  const url = (path: string) => `${prefix}/${path}`

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
        <button
          type="button"
          class="darkmode hcw-theme-toggle"
          aria-label="切换浅色与深色模式"
          title="切换浅色与深色模式"
        >
          <span class="hcw-show-light" aria-hidden="true">☀ 浅色</span>
          <span class="hcw-show-dark" aria-hidden="true">☾ 深色</span>
        </button>
      </nav>
      <div id="quartz-body">{children}</div>
      {/* Local student carousel: works both in preview and under /Pro/ on GitHub Pages. */}
      <script src={`${prefix}/static/hcw-peers.js`} defer></script>
      <script src={`${prefix}/static/hcw-follow.js`} defer></script>
    </>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor
