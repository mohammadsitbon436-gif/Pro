/* H.cw 同行者 V5 · Quartz SPA-compatible. */
(function () {
  if (window.__hcwPeersV5Installed) return;
  window.__hcwPeersV5Installed = true;

  const current = document.currentScript?.src || new URL("static/hcw-peers.js", document.baseURI).href;
  const dataUrl = new URL("hcw-peers-v5.json", current).href;
  const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PAGE_TEMPLATE = `<div class="hcw-peers-v5-shell">
    <aside class="hcw-peers-v5-rail" aria-label="同行者页面目录">
      <nav class="hcw-peers-v5-timeline">
        <a class="active" href="#hcw-peer-intro" data-hcw-peer-target="hcw-peer-intro">
          <small>00 / INTRO</small><strong>同行者</strong>
        </a>
        <a href="#hcw-peer-services" data-hcw-peer-target="hcw-peer-services">
          <small>01 / SERVICE</small><strong>服务内容</strong>
        </a>
        <a href="#hcw-peer-process" data-hcw-peer-target="hcw-peer-process">
          <small>02 / PROCESS</small><strong>辅导流程</strong>
        </a>
        <a href="#hcw-peer-records" data-hcw-peer-target="hcw-peer-records">
          <small>03 / RECORDS</small><strong>同行记录</strong>
        </a>
        <a href="#hcw-peer-faq" data-hcw-peer-target="hcw-peer-faq">
          <small>04 / FAQ</small><strong>常见问题</strong>
        </a>
        <a href="#hcw-peer-contact" data-hcw-peer-target="hcw-peer-contact">
          <small>05 / CONTACT</small><strong>联系咨询</strong>
        </a>
      </nav>
    </aside>

    <main class="hcw-peers-v5-main">
      <section class="hcw-peers-v5-hero">
        <div id="hcw-peer-intro" class="hcw-peers-v5-focus">
          <span class="hcw-peers-v5-eyebrow">THE PEOPLE ALONG THE WAY · 1 TO 1 SUPPORT</span>
          <h1>同行致远，<br>静待花开<span>。</span></h1>
          <p class="hcw-peers-v5-kicker">环境科学与工程类专业 · 一对一线上保研辅导</p>
          <p class="hcw-peers-v5-copy">
            从背景评估、文书准备，到专业课复习、面试训练和推免系统填报，把复杂的准备过程拆成清晰、可执行的阶段。
            辅导围绕每个人真实的经历和目标展开，不用一套模板去套所有人。
          </p>
          <div class="hcw-peers-v5-actions">
            <a class="hcw-peers-v5-primary" href="#hcw-peer-services" data-hcw-peer-target="hcw-peer-services">了解辅导内容 ↘</a>
            <a class="hcw-peers-v5-secondary" href="#hcw-peer-contact" data-hcw-peer-target="hcw-peer-contact">联系咨询 ↗</a>
          </div>
        </div>

        <aside class="hcw-peers-v5-identity">
          <div class="hcw-peers-v5-idtop">
            <span class="hcw-peers-v5-avatar"><img data-hcw-avatar alt="H.cw 头像"></span>
            <div>
              <h2>H.cw</h2>
              <p>中国科学技术大学 · 环境学院<br>环境科学与工程</p>
            </div>
          </div>
          <div class="hcw-peers-v5-tags">
            <span>环境专业</span><span>一对一线上</span><span>夏令营 / 预推免</span><span>按需组合</span>
          </div>
          <p class="hcw-peers-v5-idnote">更强调准备过程中的判断、梳理和练习，而不是替你完成应该由本人完成的申请与表达。</p>
        </aside>
      </section>

      <section class="hcw-peers-v5-section">
        <div id="hcw-peer-services" class="hcw-peers-v5-focus hcw-peers-v5-section-head">
          <span class="hcw-peers-v5-eyebrow">01 / HOW I CAN HELP</span>
          <h2>五个阶段，把准备做得更清楚。</h2>
          <p>可以选择单项服务，也可以按照申请周期组合成一对一全流程方案。每个模块根据目标院校、已有基础和准备进度调整。</p>
        </div>

        <div class="hcw-peers-v5-service">
          <article>
            <div class="hcw-peers-v5-snum">01 / BACKGROUND</div>
            <div class="hcw-peers-v5-service-main">
              <h3>背景评估｜先看清自己处在什么位置</h3>
              <p>把成绩、科研、竞赛、英语、方向偏好和时间节点放到同一个申请框架中判断，而不是只看某一个指标。</p>
              <button type="button" class="hcw-peers-v5-expand">查看具体内容 ＋</button>
              <div class="hcw-peers-v5-detail"><div><ul>
                <li>梳理院校层次、排名与成绩、科研竞赛、英语、实践经历和专业基础。</li>
                <li>结合地域偏好、研究兴趣和读研规划形成冲 / 稳 / 保申请思路。</li>
                <li>整理目标院校清单，并对导师方向和申请条件进行归类。</li>
                <li>建立夏令营、预推免、复试和推免系统阶段的时间节点规划。</li>
              </ul></div></div>
            </div>
            <div class="hcw-peers-v5-service-meta">
              <div><b>适合</b><span>定位不清 · 选择分散 · 节奏混乱</span></div>
              <div><b>产出</b><span>院校清单 · 导师方向 · 节点规划</span></div>
              <div><b>参考</b><span>¥100–120 / 次</span></div>
            </div>
          </article>

          <article>
            <div class="hcw-peers-v5-snum">02 / MATERIALS</div>
            <div class="hcw-peers-v5-service-main">
              <h3>文书辅导｜把经历整理成有逻辑的表达</h3>
              <p>从信息取舍、结构、事实表达和目标院校适配四个层面一起调整，让材料更清楚地呈现真实经历和研究兴趣。</p>
              <button type="button" class="hcw-peers-v5-expand">查看具体内容 ＋</button>
              <div class="hcw-peers-v5-detail"><div><ul>
                <li>简历：梳理信息层级、科研与实践表达，并根据申请方向调整重点。</li>
                <li>个人陈述 / 研究计划：调整故事线、研究兴趣与未来规划的衔接。</li>
                <li>导师联系邮件、推荐信素材：处理信息准确性、沟通语气与匹配信息。</li>
                <li>中英文自我介绍与 PPT：兼顾内容结构、时长控制与现场表达。</li>
              </ul></div></div>
            </div>
            <div class="hcw-peers-v5-service-meta">
              <div><b>材料</b><span>简历 · PS/RP · 推荐信 · 导师邮件</span></div>
              <div><b>展示</b><span>中英文自我介绍 · PPT</span></div>
              <div><b>参考</b><span>按材料类型与工作量计费</span></div>
            </div>
          </article>

          <article>
            <div class="hcw-peers-v5-snum">03 / COURSES</div>
            <div class="hcw-peers-v5-service-main">
              <h3>课程复习｜先给材料，再按需要把知识讲透</h3>
              <p>先提供复习材料和重点框架，再根据目标院校考核范围与个人薄弱点安排一对一课程。</p>
              <button type="button" class="hcw-peers-v5-expand">查看具体内容 ＋</button>
              <div class="hcw-peers-v5-detail"><div><ul>
                <li>根据目标院校考核内容确定复习范围，不把所有课程从头重新学一遍。</li>
                <li>可覆盖环境工程原理、水污染控制、大气污染控制等环境专业核心课程。</li>
                <li>结合典型问题训练规范表达，并针对薄弱章节进行专项讲解。</li>
                <li>环境热点可作为综合问答补充。</li>
              </ul></div></div>
            </div>
            <div class="hcw-peers-v5-service-meta">
              <div><b>先提供</b><span>复习资料 · 核心框架 · 高频问题</span></div>
              <div><b>再按需</b><span>重点串讲 · 答疑 · 专项强化</span></div>
              <div><b>参考</b><span>¥150–180 / 小时</span></div>
            </div>
          </article>

          <article>
            <div class="hcw-peers-v5-snum">04 / INTERVIEW</div>
            <div class="hcw-peers-v5-service-main">
              <h3>面试辅导｜把问题拆开，再把回答练清楚</h3>
              <p>分为单项辅导与单营 Mock。前者解决具体能力，后者按照某一院校或夏令营流程进行完整模拟。</p>
              <button type="button" class="hcw-peers-v5-expand">查看具体内容 ＋</button>
              <div class="hcw-peers-v5-detail"><div><ul>
                <li>科研深挖：背景、对象、过程、方法选择、个人贡献、结果与不足。</li>
                <li>口语练习：自我介绍、常见英文问答、专业术语表达与临场组织。</li>
                <li>专业提问：环境专业核心课程、热点问题以及课程之间的关联。</li>
                <li>单营 Mock：按目标院校已有考核信息设计流程，模拟后逐项复盘。</li>
              </ul></div></div>
            </div>
            <div class="hcw-peers-v5-service-meta">
              <div><b>单项</b><span>科研深挖 · 口语 · 专业提问</span></div>
              <div><b>Mock</b><span>定制题目 · 完整模拟 · 复盘</span></div>
              <div><b>参考</b><span>¥120–180 / 次</span></div>
            </div>
          </article>

          <article>
            <div class="hcw-peers-v5-snum">05 / SYSTEM</div>
            <div class="hcw-peers-v5-service-main">
              <h3>系统填报｜关键节点逐项核对，最后一步也不掉链子</h3>
              <p>提供流程说明、时间节点提醒、信息核对与提交前检查。账号登录、志愿提交和录取确认等关键操作由学生本人完成。</p>
            </div>
            <div class="hcw-peers-v5-service-meta">
              <div><b>协助</b><span>流程说明 · 节点提醒 · 信息核对</span></div>
              <div><b>本人完成</b><span>登录 · 提交 · 录取确认</span></div>
              <div><b>参考</b><span>全流程方案内可包含</span></div>
            </div>
          </article>
        </div>

        <div class="hcw-peers-v5-price">
          <button type="button" data-hcw-peer-price>
            <span><small>REFERENCE RANGE</small><strong>参考预算区间</strong></span>
            <em>按材料数量、修改轮次、Mock 次数和课时确定。＋</em>
          </button>
          <div class="hcw-peers-v5-price-content"><div>
            <table>
              <thead><tr><th>服务</th><th>参考区间</th><th>说明</th></tr></thead>
              <tbody>
                <tr><td>背景评估 / 选校策略</td><td>¥100–120 / 次</td><td>可包含院校清单、导师方向与节点规划</td></tr>
                <tr><td>简历精修</td><td>¥80–100 / 份</td><td>根据材料成熟度与修改轮次确定</td></tr>
                <tr><td>个人陈述 / 研究计划</td><td>¥120–150 / 份</td><td>涉及结构重组时按实际工作量确定</td></tr>
                <tr><td>导师邮件 / 推荐信 / 自我介绍</td><td>¥50–100 / 项</td><td>按具体材料类型与数量计费</td></tr>
                <tr><td>学术 / 个人风采 PPT</td><td>¥100–120 / 次</td><td>内容逻辑、展示结构与表达训练</td></tr>
                <tr><td>面试单项 / Mock</td><td>¥120–180 / 次</td><td>单项训练与单营定制 Mock 区间不同</td></tr>
                <tr><td>专业课一对一</td><td>¥150–180 / 小时</td><td>先提供复习材料，再按需安排课程</td></tr>
                <tr><td>全流程一对一</td><td>约 ¥1,200–2,600</td><td>按服务周期和实际模块组合确认</td></tr>
              </tbody>
            </table>
            <p>最终方案以双方确认的服务内容为准，不承诺“保证录取”或“百分百上岸”。</p>
          </div></div>
        </div>
      </section>

      <section class="hcw-peers-v5-section">
        <div id="hcw-peer-process" class="hcw-peers-v5-focus hcw-peers-v5-section-head">
          <span class="hcw-peers-v5-eyebrow">02 / HOW IT WORKS</span>
          <h2>一对一，不等于把所有内容都塞进一节课。</h2>
          <p>先判断当前阶段，再确认优先级。不同学生可以从不同节点进入流程，也可以只选择某一个模块。</p>
        </div>
        <div class="hcw-peers-v5-process">
          <div><b>01</b><h3>了解情况</h3><p>本科背景、排名、科研、目标方向和当前准备阶段。</p></div>
          <div><b>02</b><h3>确认重点</h3><p>识别最需要解决的问题，决定单项还是全流程。</p></div>
          <div><b>03</b><h3>建立计划</h3><p>按夏令营、预推免和复试节点安排材料与训练任务。</p></div>
          <div><b>04</b><h3>一对一推进</h3><p>文书、课程和面试按照实际进度持续调整。</p></div>
          <div><b>05</b><h3>复盘与填报</h3><p>复盘问题、更新计划，在关键填报节点进行核对提醒。</p></div>
        </div>
      </section>

      <section class="hcw-peers-v5-section">
        <div id="hcw-peer-records" class="hcw-peers-v5-focus hcw-peers-v5-section-head">
          <span class="hcw-peers-v5-eyebrow">03 / FELLOW TRAVELERS</span>
          <h2>把辅导过的人，认真记录下来。</h2>
          <p>记录每一次同行，也留下真实的准备过程。</p>
        </div>

        <div class="hcw-peers-v5-record-stack">
          <section>
            <h3>辅导记录</h3>
            <p class="hcw-peers-v5-subline">按批次整理院校层次、个人背景、辅导项目、Offer 与最终去向。</p>
            <div class="hcw-peers-v5-table-wrap">
              <table class="hcw-peers-v5-record-table">
                <colgroup><col><col><col><col><col><col></colgroup>
                <thead><tr><th>批次</th><th>院校层次</th><th>个人背景</th><th>辅导项目</th><th>Offer 情况</th><th>最终去向</th></tr></thead>
                <tbody data-hcw-peer-records></tbody>
              </table>
            </div>
          </section>

          <div class="hcw-peers-v5-divider"></div>

          <section>
            <h3>人物故事</h3>
            <p class="hcw-peers-v5-subline">展示愿意公开更多经历的同学，点击人物卡片可查看完整信息。</p>
            <div class="hcw-peers-v5-story-grid" data-hcw-peer-stories></div>
          </section>

          <div class="hcw-peers-v5-divider"></div>

          <section>
            <h3>同学反馈</h3>
            <div class="hcw-peers-v5-feedback-grid">
              <article><span>“</span><p>科研经历重新梳理以后，更清楚老师为什么会从研究背景一路追问到实验方法，也知道哪些内容必须由自己真正讲明白。</p><small>科研梳理 · 面试准备</small></article>
              <article><span>“</span><p>专业课复习不是从头重新背一遍，而是先建立框架，再围绕目标院校的考核重点补齐薄弱点，准备过程清楚很多。</p><small>课程复习 · 专业准备</small></article>
              <article><span>“</span><p>Mock 之后最有价值的是复盘，不只指出哪里没有答好，也会具体拆到问题怎么理解、回答顺序怎么调整。</p><small>单营 Mock · 复盘训练</small></article>
            </div>
          </section>
        </div>
      </section>

      <section class="hcw-peers-v5-section">
        <div id="hcw-peer-faq" class="hcw-peers-v5-focus hcw-peers-v5-section-head">
          <span class="hcw-peers-v5-eyebrow">04 / FAQ</span>
          <h2>先把常见问题讲清楚。</h2>
          <p>联系之前，可以先判断这类辅导是否适合自己。</p>
        </div>
        <div class="hcw-peers-v5-faqs">
          <details><summary><span>我现在还没有论文或竞赛经历，适合做保研辅导吗？</span><b>＋</b></summary><p>可以。背景评估不只看论文和竞赛，而是把排名、课程基础、科研参与、英语、实践经历、研究兴趣和目标院校放在一起判断。</p></details>
          <details><summary><span>可以只选择某一项服务吗？</span><b>＋</b></summary><p>可以。背景评估、文书、课程复习和面试训练都可以按单项安排，也可以根据准备周期组合成全流程方案。</p></details>
          <details><summary><span>专业课复习如何确定范围？</span><b>＋</b></summary><p>优先根据目标院校公开的考核方式、往年经验和学生当前基础确定重点。通常先提供复习材料和知识框架，再根据薄弱点按需安排一对一课程。</p></details>
          <details><summary><span>第一次沟通前需要准备什么？</span><b>＋</b></summary><p>建议准备本科院校、专业与排名、英语情况、主要科研或竞赛经历、意向地区或院校、方向偏好、当前准备阶段和最希望解决的问题。</p></details>
          <details><summary><span>辅导是否保证录取？</span><b>＋</b></summary><p>不保证。录取结果受到学生背景、院校名额、考核表现和申请策略等多种因素影响。辅导的目标是让准备更系统、表达更清楚、训练更有针对性。</p></details>
        </div>
      </section>

      <section class="hcw-peers-v5-section">
        <div id="hcw-peer-contact" class="hcw-peers-v5-focus hcw-peers-v5-contact">
          <div class="hcw-peers-v5-contact-main">
            <span class="hcw-peers-v5-avatar"><img data-hcw-avatar alt="H.cw 头像"></span>
            <div>
              <span class="hcw-peers-v5-eyebrow">05 / CONTACT</span>
              <h2>先聊清楚，再决定怎么准备。</h2>
              <p>联系时可以简单说明本科院校、专业排名、目标方向、当前准备阶段和主要困惑。</p>
              <small>可通过邮件、小红书或微信公众号联系。</small>
            </div>
          </div>
          <div class="hcw-peers-v5-contact-actions">
            <a class="hcw-peers-v5-primary" href="mailto:Hcw1021@mail.ustc.edu.cn">邮件联系 ↗</a>
            <button type="button" class="hcw-peers-v5-secondary" data-hcw-peer-copy>复制咨询模板</button>
          </div>
        </div>
      </section>
    </main>
  </div>`;

  function ensureMarkup(root) {
    if (!root.querySelector(".hcw-peers-v5-shell")) {
      root.innerHTML = PAGE_TEMPLATE;
      const prefix = new URL("../", current);
      root.querySelectorAll("[data-hcw-avatar]").forEach(img => {
        img.src = new URL("static/hcw-avatar-full-v2.webp", prefix).href;
      });
    }

    let dialog = document.querySelector("[data-hcw-peer-dialog]");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "hcw-peer-v5-dialog";
      dialog.setAttribute("data-hcw-peer-dialog", "");
      dialog.setAttribute("aria-labelledby", "hcw-peer-v5-dialog-title");
      dialog.innerHTML = '<button type="button" class="hcw-peer-v5-dialog-close" data-hcw-peer-dialog-close aria-label="关闭人物故事">×</button><div data-hcw-peer-dialog-content></div>';
      document.body.appendChild(dialog);
    }

    let toast = document.querySelector("[data-hcw-peer-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "hcw-peer-v5-toast";
      toast.setAttribute("data-hcw-peer-toast", "");
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
  }

  function create(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = String(text);
    return el;
  }

  function addRing(card) {
    if (card.querySelector(":scope > .hcw-atmo-ring")) return;
    const ring = create("span", "hcw-atmo-ring");
    ring.setAttribute("aria-hidden", "true");
    card.appendChild(ring);
  }

  function centerTarget(id, smooth = true) {
    const target = document.getElementById(id);
    if (!target) return;

    const siteNav = document.querySelector(".hcw-site-nav");
    const root = target.closest("[data-hcw-peers-v5]");
    const mobileRail = innerWidth <= 860 ? root?.querySelector(".hcw-peers-v5-rail") : null;
    const topOffset =
      (siteNav?.getBoundingClientRect().height || 0) +
      (mobileRail?.getBoundingClientRect().height || 0);

    const rect = target.getBoundingClientRect();
    const targetCenter = scrollY + rect.top + rect.height / 2;
    const usableHeight = Math.max(1, innerHeight - topOffset);
    const viewportCenter = topOffset + usableHeight / 2;
    const destination = Math.max(0, targetCenter - viewportCenter);

    scrollTo({
      top: destination,
      behavior: smooth && !reduce() ? "smooth" : "auto"
    });
  }

  function setupNavigation(root) {
    const timelineLinks = [...root.querySelectorAll(".hcw-peers-v5-timeline [data-hcw-peer-target]")];
    const jumpLinks = [...root.querySelectorAll("[data-hcw-peer-target]")];

    const items = timelineLinks.map(link => {
      const id = link.dataset.hcwPeerTarget;
      const anchor = document.getElementById(id);
      const section = anchor?.closest(".hcw-peers-v5-section")
        || anchor?.closest(".hcw-peers-v5-hero")
        || anchor;
      return { id, link, anchor, section };
    }).filter(item => item.anchor && item.section);

    jumpLinks.forEach(link => {
      link.addEventListener("click", event => {
        const id = link.dataset.hcwPeerTarget;
        if (!document.getElementById(id)) return;
        event.preventDefault();
        centerTarget(id, true);
        history.replaceState(null, "", "#" + id);
        timelineLinks.forEach(a => a.classList.toggle("active", a.dataset.hcwPeerTarget === id));
      });
    });

    let ticking = false;

    function currentViewportProbe() {
      const siteNav = document.querySelector(".hcw-site-nav");
      const mobileRail = innerWidth <= 860 ? root.querySelector(".hcw-peers-v5-rail") : null;
      const topOffset =
        (siteNav?.getBoundingClientRect().height || 0) +
        (mobileRail?.getBoundingClientRect().height || 0);
      const usable = Math.max(1, innerHeight - topOffset);
      return scrollY + topOffset + usable * 0.50;
    }

    function sectionStart(item) {
      return scrollY + item.section.getBoundingClientRect().top;
    }

    function updateActive() {
      ticking = false;
      if (!items.length) return;

      const probe = currentViewportProbe();
      const starts = items.map(sectionStart);

      // Active item = the section interval currently containing the viewport centre.
      // This avoids the previous "nearest heading" error on long sections such as FAQ/records.
      let activeIndex = 0;
      for (let i = 0; i < starts.length; i++) {
        const next = i + 1 < starts.length ? starts[i + 1] : Infinity;
        if (probe >= starts[i] && probe < next) {
          activeIndex = i;
          break;
        }
        if (probe >= starts[i]) activeIndex = i;
      }

      timelineLinks.forEach((link, index) => link.classList.toggle("active", index === activeIndex));
    }

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      if (document.getElementById(id)) {
        setTimeout(() => {
          centerTarget(id, false);
          updateActive();
        }, 80);
      }
    }
  }

  function setupServices(root) {
    root.querySelectorAll(".hcw-peers-v5-expand").forEach(button => {
      button.addEventListener("click", () => {
        const row = button.closest("article");
        const open = row.classList.toggle("open");
        button.textContent = open ? "收起详情 －" : "查看具体内容 ＋";
      });
    });
    const priceButton = root.querySelector("[data-hcw-peer-price]");
    priceButton?.addEventListener("click", () => {
      const wrap = priceButton.closest(".hcw-peers-v5-price");
      const open = wrap.classList.toggle("open");
      const em = priceButton.querySelector("em");
      if (em) em.textContent = open ? "按材料数量、修改轮次、Mock 次数和课时确定。－" : "按材料数量、修改轮次、Mock 次数和课时确定。＋";
    });
  }

  function recordRow(record) {
    const tr = document.createElement("tr");
    ["batch","tier","background","services","offers","destination"].forEach(key => {
      const td = document.createElement("td");
      td.textContent = record?.[key] || "待补充";
      tr.appendChild(td);
    });
    return tr;
  }

  function storyPhoto(story) {
    const wrap = create("span", "hcw-peer-story-avatar");
    if (story.photo && /^peers\/[\p{L}\p{N}_.\-/]+\.(?:png|jpe?g|webp)$/iu.test(story.photo) && !story.photo.includes("..")) {
      const img = document.createElement("img");
      img.src = new URL(story.photo.split("/").map(encodeURIComponent).join("/"), dataUrl).href;
      img.alt = (story.nickname || "同行者") + "的头像";
      img.loading = "lazy";
      img.addEventListener("error", () => { img.remove(); wrap.textContent = "H."; }, { once: true });
      wrap.appendChild(img);
    } else {
      wrap.textContent = (story.nickname || "H.").slice(0, 1);
    }
    return wrap;
  }

  function openStory(dialog, content, story) {
    content.replaceChildren();
    const eyebrow = create("span", "hcw-peers-v5-eyebrow", "STUDENT STORY");
    const title = create("h2", "", story.nickname || "昵称待补充");
    title.id = "hcw-peer-v5-dialog-title";
    const route = create("p", "hcw-peer-v5-dialog-route", `${story.from || "本科层次"} → ${story.to || "最终去向"}`);
    const grid = create("dl", "hcw-peer-v5-dialog-grid");
    [
      ["个人背景", story.background],
      ["辅导项目", story.services],
      ["Offer 情况", story.offers],
      ["最终去向", story.destination]
    ].forEach(([k,v]) => {
      const cell = create("div");
      cell.appendChild(create("dt","",k));
      cell.appendChild(create("dd","",v || "待补充"));
      grid.appendChild(cell);
    });
    content.append(eyebrow, title, route, grid);
    if (story.story) content.appendChild(create("p", "hcw-peer-v5-dialog-story", story.story));
    dialog.showModal?.();
  }

  function renderData(root, data) {
    const tbody = root.querySelector("[data-hcw-peer-records]");
    const storiesHost = root.querySelector("[data-hcw-peer-stories]");
    const dialog = document.querySelector("[data-hcw-peer-dialog]");
    const dialogContent = dialog?.querySelector("[data-hcw-peer-dialog-content]");
    const dialogClose = dialog?.querySelector("[data-hcw-peer-dialog-close]");

    if (tbody) {
      tbody.replaceChildren();
      const records = Array.isArray(data.records) && data.records.length ? data.records : [{}];
      records.forEach(record => tbody.appendChild(recordRow(record)));
    }

    if (storiesHost) {
      storiesHost.replaceChildren();
      const stories = Array.isArray(data.stories) && data.stories.length ? data.stories : [{}];
      stories.forEach(story => {
        const card = create("button", "hcw-peer-story-card hcw-atmo-panel");
        card.type = "button";
        card.dataset.hcwMaterial = "panel";
        const head = create("span", "hcw-peer-story-head");
        head.append(storyPhoto(story));
        const who = create("span");
        who.appendChild(create("strong", "", story.nickname || "昵称待补充"));
        who.appendChild(create("small", "", [story.batch, story.major].filter(Boolean).join(" · ") || "批次 · 专业方向"));
        head.appendChild(who);
        const route = create("span", "hcw-peer-story-route");
        route.append(create("b", "", story.from || "本科层次"), create("i", "", "→"), create("b", "", story.to || "最终去向"));
        const meta = create("span", "hcw-peer-story-meta", story.services || "辅导项目待补充");
        const more = create("span", "hcw-peer-story-more", "查看详细情况 ↗");
        card.append(head, route, meta, more);
        addRing(card);
        if (dialog && dialogContent) card.addEventListener("click", () => openStory(dialog, dialogContent, story));
        storiesHost.appendChild(card);
      });
    }

    if (dialog && dialogClose && dialog.dataset.hcwBound !== "1") {
      dialog.dataset.hcwBound = "1";
      dialogClose.addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    }
  }

  function setupContact(root) {
    const button = root.querySelector("[data-hcw-peer-copy]");
    const toast = document.querySelector("[data-hcw-peer-toast]");
    if (!button || !toast) return;
    const template = `你好，我想咨询环境科学与工程类专业保研辅导。

本科院校：
专业 / 排名：
英语情况：
主要科研 / 竞赛经历：
意向院校 / 地区 / 方向：
当前准备阶段：
目前最希望解决的问题：
`;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(template);
        toast.textContent = "已复制咨询模板";
      } catch (_) {
        toast.textContent = "浏览器未允许复制，请手动复制";
      }
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1700);
    });
  }

  function init(root) {
    if (root.dataset.hcwPeersV5Ready === "1") return;
    root.dataset.hcwPeersV5Ready = "1";
    ensureMarkup(root);
    setupNavigation(root);
    setupServices(root);
    setupContact(root);
    fetch(dataUrl, { cache: "no-cache" })
      .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(data => { if (root.isConnected) renderData(root, data); })
      .catch(error => {
        console.error("[H.cw 同行者 V5] 数据加载失败", error);
        renderData(root, { records:[{}], stories:[{}] });
      });
  }

  function scan() {
    document.querySelectorAll("[data-hcw-peers-v5]").forEach(init);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan, { once:true });
  else scan();
  document.addEventListener("nav", () => setTimeout(scan, 0));
})();
