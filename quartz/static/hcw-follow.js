/* H.cw / 关注我：与已确认 HTML 原型相同的卡片与联系信息。 */
(() => {
  // 仅在此处填写本人愿意公开的信息；留空时沿用“链接待添加”占位样式。
  const CONFIG = {
    avatar: "",
    github: "",
    bilibili: "",
    xiaohongshu: "",
    zhihu: "",
    email: ""
  };
  const icons = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8A11.2 11.2 0 0 0 8.46 22.63c.56.11.77-.24.77-.54v-2.07c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 .1 1.74-.72 2.13-1.1.1-.72.39-1.21.7-1.49-2.5-.29-5.14-1.25-5.14-5.53 0-1.22.44-2.21 1.15-2.99-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0C16.57 4 17.5 4.3 17.5 4.3c.61 1.54.23 2.67.12 2.96.71.78 1.14 1.77 1.14 2.99 0 4.29-2.64 5.24-5.16 5.52.4.35.76 1.04.76 2.1v3.12c0 .3.2.66.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg>',
    bilibili: 'B', xiaohongshu: '书', zhihu: '知'
  };
  const items = [
    { key: 'github', label: 'GitHub', note: '代码与项目' },
    { key: 'bilibili', label: 'Bilibili', note: '视频与日常' },
    { key: 'xiaohongshu', label: '小红书', note: '图文与生活' },
    { key: 'zhihu', label: '知乎', note: '思考与分享' }
  ];
  function safeWebUrl(value) {
    if (!value || !value.trim()) return '';
    try {
      const u = new URL(value.trim());
      return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '';
    } catch (_) { return ''; }
  }
  function renderFollow() {
    const root = document.querySelector('body[data-slug="关注我"] .follow-page');
    if (!root || root.dataset.hcwFollowRendered === 'true') return;
    root.dataset.hcwFollowRendered = 'true';
    const list = root.querySelector('#social-list');
    if (!list) return;
    list.replaceChildren();
    items.forEach(item => {
      const url = safeWebUrl(CONFIG[item.key]);
      const card = document.createElement(url ? 'a' : 'div');
      card.className = 'social-card' + (url ? '' : ' is-unset');
      if (url) {
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.setAttribute('aria-label', '前往 ' + item.label + '（新窗口打开）');
      }
      const icon = document.createElement('span');
      icon.className = 'social-icon';
      icon.innerHTML = icons[item.key];
      const label = document.createElement('span');
      label.className = 'social-text';
      const title = document.createElement('span');
      title.className = 'social-title';
      title.textContent = item.label;
      const detail = document.createElement('span');
      detail.className = 'social-detail';
      detail.textContent = url ? item.note : '链接待添加';
      label.append(title, detail);
      const arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = url ? '↗' : '·';
      card.append(icon, label, arrow);
      list.append(card);
    });
    if (CONFIG.avatar.trim()) {
      const img = document.createElement('img');
      const base = document.body.dataset.basepath || '';
      const avatarPath = CONFIG.avatar.trim();
      img.src = /^(https?:)?\/\//i.test(avatarPath) || avatarPath.startsWith('/') ? avatarPath : base + '/static/' + avatarPath.replace(/^\.?\//, '');
      img.alt = 'H.cw 的头像';
      root.querySelector('#avatar')?.replaceChildren(img);
    }
    if (CONFIG.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.email.trim())) {
      const a = document.createElement('a');
      a.href = 'mailto:' + CONFIG.email.trim();
      a.textContent = CONFIG.email.trim();
      root.querySelector('#email-text')?.replaceWith(a);
    }
    const year = root.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderFollow, { once: true });
  else renderFollow();
  document.addEventListener('nav', renderFollow);
})();
