/* H.cw / 关注我 · Progressive enhancement.
 * Essential avatar, links and email are already in content/关注我.md; no JS required for them.
 * Do not replace the entire social list at runtime or reintroduce legacy platforms.
 */
(() => {
  if (window.__hcwFollowProgressiveV2) return;
  window.__hcwFollowProgressiveV2 = true;
  const init = () => {
    const root = document.querySelector('body[data-slug="关注我"] .follow-page');
    if (!root) return;
    const year = root.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());
    // Resolve the asset against the main navigation link for all Quartz base URLs.
    const avatar = root.querySelector('#avatar img');
    const home = document.querySelector('.hcw-site-nav .hcw-brand')?.href;
    if (avatar && home) {
      avatar.src = new URL('static/hcw-avatar.webp', home).href;
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  document.addEventListener('nav', () => setTimeout(init, 0));
})();
