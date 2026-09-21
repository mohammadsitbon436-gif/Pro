/* H.cw Knowledge Library · Quartz v5 · SPA-compatible */
(function () {
  if (window.__hcwLibraryReaderCleanV3Installed) return;
  window.__hcwLibraryReaderCleanV3Installed = true;
  window.__hcwLibraryVersion = "reader-clean-v3";
  console.info("[H.cw] Knowledge Library reader-clean-v3 loaded");

  var scriptUrl = (document.currentScript && document.currentScript.src) ||
    new URL("static/hcw-library-reader-clean.js", document.baseURI).href;
  var configUrl = new URL("hcw-library.json", scriptUrl).href;
  var indexUrl = new URL("contentIndex.json", scriptUrl).href;
  var dataPromise = null;
  var scrollHandler = null;
  var resizeHandler = null;

  function loadData() {
    if (!dataPromise) {
      dataPromise = Promise.all([
        fetch(configUrl, { cache: "no-cache" }).then(function (r) {
          if (!r.ok) throw new Error("library config HTTP " + r.status);
          return r.json();
        }),
        fetch(indexUrl, { cache: "no-cache" }).then(function (r) {
          if (!r.ok) throw new Error("content index HTTP " + r.status);
          return r.json();
        }),
      ]).then(function (items) {
        return { config: items[0], index: items[1] };
      });
    }
    return dataPromise;
  }

  function bodySlug() {
    return (document.body && document.body.dataset && document.body.dataset.slug) || "";
  }

  function basePath() {
    var base = (document.body && document.body.dataset && document.body.dataset.basepath) || "";
    return base.replace(/\/$/, "");
  }

  function encPath(path) {
    return String(path).split("/").map(encodeURIComponent).join("/");
  }

  function noteUrl(slug) {
    return basePath() + "/" + encPath(slug) + ".html";
  }

  function folderUrl(folder) {
    return basePath() + "/" + encPath(folder) + "/index.html";
  }

  function normalizeSlug(value) {
    return String(value || "").toLowerCase();
  }

  function getVolumeForSlug(config, slug) {
    var target = normalizeSlug(slug);
    return (config.volumes || []).find(function (vol) {
      var folder = normalizeSlug(vol.folder);
      return target === folder + "/index" || target.indexOf(folder + "/") === 0;
    });
  }

  function noteEntries(index, folder) {
    var prefix = normalizeSlug(folder) + "/";
    return Object.keys(index)
      .map(function (key) { return index[key]; })
      .filter(function (item) {
        if (!item || !item.slug) return false;
        var slug = normalizeSlug(item.slug);
        return slug.indexOf(prefix) === 0 && slug !== prefix + "index";
      })
      .sort(function (a, b) {
        return String(a.title || a.slug).localeCompare(String(b.title || b.slug), "zh-CN");
      });
  }

  function make(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
  }

  function clearModeClasses() {
    // If a note page was wrapped by our independent reader shell, put Quartz's
    // original center children back before SPA navigation continues.
    var center = document.querySelector("#quartz-body > .center");
    if (center) {
      var shell = Array.from(center.children).find(function (el) {
        return el.classList && el.classList.contains("hcw-reader-shell");
      });
      if (shell) {
        var content = shell.querySelector(".hcw-reader-content");
        if (content) {
          while (content.firstChild) center.insertBefore(content.firstChild, shell);
        }
        shell.remove();
      }
    }

    document.body.classList.remove("hcw-library-volume-page", "hcw-library-note-page");
    document.querySelectorAll(".hcw-volume-shell").forEach(function (el) { el.remove(); });

    // Remove legacy reader nodes created by older hcw-library.js versions.
    document.querySelectorAll(
      "#quartz-body > .left.sidebar > .hcw-library-side, #quartz-body > .hcw-library-compact-bar"
    ).forEach(function (el) { el.remove(); });
    if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    scrollHandler = null;
    resizeHandler = null;
  }

  function renderLibrary(root, config, index) {
    root.replaceChildren();
    root.className = "hcw-library-root";

    var hero = make("section", "hcw-library-hero");
    hero.appendChild(make("div", "hcw-library-eyebrow", "MY KNOWLEDGE LIBRARY"));
    hero.appendChild(make("h1", "", "一卷一域，一页一思。"));
    hero.appendChild(make("p", "", "课程、研究与方法，在持续阅读与实践中逐渐形成自己的知识结构。"));
    root.appendChild(hero);

    var dashboard = make("section", "hcw-library-dashboard");
    var recent = make("div", "hcw-library-card hcw-library-recent");
    recent.appendChild(make("div", "hcw-library-card-title", "RECENTLY UPDATED · 最近更新"));

    (config.recent || []).forEach(function (r) {
      var item = index[r.slug] || index[normalizeSlug(r.slug)];
      if (!item) return;
      var row = make("a", "hcw-library-recent-row");
      row.href = noteUrl(item.slug);
      row.appendChild(make("small", "", r.date || ""));
      row.appendChild(make("strong", "", r.displayTitle || item.title || item.slug));
      var vol = getVolumeForSlug(config, item.slug);
      row.appendChild(make("span", "", vol ? vol.folder : ""));
      recent.appendChild(row);
    });
    dashboard.appendChild(recent);

    var allNotes = 0;
    (config.volumes || []).forEach(function (v) { allNotes += noteEntries(index, v.folder).length; });

    var status = make("aside", "hcw-library-card hcw-library-status");
    status.appendChild(make("h3", "", "LIBRARY STATUS"));
    var grid = make("div", "hcw-library-status-grid");
    [
      [config.volumes.length, "知识卷册"],
      [allNotes, "公开笔记"],
      [config.volumes.length, "主题目录"],
      [config.year || new Date().getFullYear(), "持续更新"],
    ].forEach(function (pair) {
      var box = make("div", "hcw-library-stat");
      box.appendChild(make("b", "", pair[0]));
      box.appendChild(make("span", "", pair[1]));
      grid.appendChild(box);
    });
    status.appendChild(grid);
    dashboard.appendChild(status);
    root.appendChild(dashboard);

    var heading = make("div", "hcw-library-shelf-head");
    var left = make("div");
    left.appendChild(make("div", "hcw-library-eyebrow", "COLLECTIONS"));
    left.appendChild(make("h2", "", "知识书架"));
    heading.appendChild(left);
    heading.appendChild(make("p", "", "每个卷册对应一个独立的 Obsidian 主题文件夹。"));
    root.appendChild(heading);

    var shell = make("section", "hcw-library-shelf-shell");
    var toolbar = make("div", "hcw-library-shelf-toolbar");
    toolbar.appendChild(make("div", "hcw-library-shelf-caption",
      "COLLECTION 01 — " + String(config.volumes.length).padStart(2, "0")));
    var controls = make("div", "hcw-library-shelf-controls");
    var prev = make("button", "hcw-library-round", "←");
    var next = make("button", "hcw-library-round", "→");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "向左浏览卷册");
    next.setAttribute("aria-label", "向右浏览卷册");
    controls.append(prev, next);
    toolbar.appendChild(controls);
    shell.appendChild(toolbar);

    var rail = make("div", "hcw-library-books");
    (config.volumes || []).forEach(function (vol) {
      var notes = noteEntries(index, vol.folder);
      var book = make("a", "hcw-library-book");
      book.href = folderUrl(vol.folder);
      var colors = Array.isArray(vol.theme) ? vol.theme : ["#5062cb", "#283575"];
      book.style.background = "linear-gradient(160deg," + colors[0] + "," + colors[1] + ")";
      var top = make("div");
      top.appendChild(make("div", "hcw-library-vol", vol.volume + " · " + vol.type));
      top.appendChild(make("div", "hcw-library-folder", vol.folder));
      var middle = make("div");
      middle.appendChild(make("h3", "", vol.folder));
      middle.appendChild(make("p", "", vol.english || ""));
      var foot = make("div", "hcw-library-book-foot");
      foot.appendChild(make("span", "", notes.length + " FILE" + (notes.length === 1 ? "" : "S")));
      foot.appendChild(make("span", "", "OPEN →"));
      book.append(top, middle, foot);
      rail.appendChild(book);
    });
    shell.appendChild(rail);
    shell.appendChild(make("div", "hcw-library-shelf-line"));
    root.appendChild(shell);

    prev.addEventListener("click", function () { rail.scrollBy({ left: -500, behavior: "smooth" }); });
    next.addEventListener("click", function () { rail.scrollBy({ left: 500, behavior: "smooth" }); });
    rail.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rail.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  function renderVolume(config, index, vol) {
    document.body.classList.add("hcw-library-volume-page");
    var center = document.querySelector("#quartz-body > .center");
    if (!center) return;

    var notes = noteEntries(index, vol.folder);
    var shell = make("section", "hcw-volume-shell");
    var crumb = make("nav", "hcw-library-breadcrumb");
    var back = make("a", "", "系列笔记");
    back.href = basePath() + "/%E7%B3%BB%E5%88%97%E7%AC%94%E8%AE%B0.html";
    crumb.append(back, make("span", "", "›"), make("span", "", vol.folder));
    shell.appendChild(crumb);

    var panel = make("article", "hcw-volume-panel");
    var hero = make("div", "hcw-volume-hero");
    hero.appendChild(make("div", "hcw-volume-no", vol.volume + " · " + vol.type));
    hero.appendChild(make("h1", "", vol.folder));
    hero.appendChild(make("p", "hcw-volume-desc", vol.description || ""));
    var meta = make("div", "hcw-volume-meta");
    meta.appendChild(make("span", "hcw-volume-pill", notes.length + " 篇笔记"));
    meta.appendChild(make("span", "hcw-volume-pill", "content/" + vol.folder + "/"));
    hero.appendChild(meta);
    panel.appendChild(hero);

    var content = make("div", "hcw-volume-content");
    var titleRow = make("div", "hcw-volume-section-row");
    var titleWrap = make("div");
    titleWrap.appendChild(make("div", "hcw-library-eyebrow", "NOTES"));
    titleWrap.appendChild(make("h2", "", "本卷笔记"));
    titleRow.appendChild(titleWrap);
    content.appendChild(titleRow);

    var cards = make("div", "hcw-volume-files");
    notes.forEach(function (note, i) {
      var card = make("a", "hcw-volume-file");
      card.href = noteUrl(note.slug);
      card.appendChild(make("small", "", "NOTE " + String(i + 1).padStart(2, "0")));
      card.appendChild(make("h3", "", note.title || note.slug));
      var summary = (note.content || "").replace(/\s+/g, " ").trim().slice(0, 92);
      card.appendChild(make("p", "", summary ? summary + (summary.length >= 92 ? "…" : "") : "打开笔记"));
      card.appendChild(make("div", "hcw-volume-file-path", note.filePath || note.slug));
      cards.appendChild(card);
    });
    content.appendChild(cards);
    panel.appendChild(content);
    shell.appendChild(panel);

    // Quartz folder pages wrap <article> and .page-listing inside .popover-hint,
    // so do not depend on a direct-child <article>. Replace the center content
    // as a whole; SPA navigation will restore the native DOM on the next page.
    center.replaceChildren(shell);
  }

  function setupNotePage(config, index, vol, slug) {
    document.body.classList.add("hcw-library-note-page");

    var right = document.querySelector("#quartz-body > .right.sidebar");
    var center = document.querySelector("#quartz-body > .center");
    if (!center) return;
    if (center.querySelector(":scope > .hcw-reader-shell")) return;

    // Capture Quartz's generated TOC before we hide its native sidebar.
    var sourceLinks = right ? Array.from(right.querySelectorAll(".toc-content li a")) : [];

    // Independent reader DOM. We keep Quartz's .center as a direct child of
    // #quartz-body, but move its existing content into our own content panel.
    // This isolates responsive layout from Quartz's native sidebar breakpoints.
    var shell = make("section", "hcw-reader-shell");
    var compactBar = make("nav", "hcw-reader-compact-bar");
    compactBar.setAttribute("aria-label", "笔记导航");

    var filesTab = make("button", "hcw-reader-compact-tab", "本卷文件");
    var tocTab = make("button", "hcw-reader-compact-tab", "文章目录");
    filesTab.type = tocTab.type = "button";
    filesTab.setAttribute("aria-controls", "hcw-library-files-panel");
    tocTab.setAttribute("aria-controls", "hcw-library-toc-panel");
    filesTab.setAttribute("aria-expanded", "false");
    tocTab.setAttribute("aria-expanded", "false");
    compactBar.append(filesTab, tocTab);

    var side = make("aside", "hcw-library-side");
    side.dataset.openPanel = "";

    function setCompactPanel(name) {
      side.dataset.openPanel = name;
      side.classList.toggle("compact-open", !!name);
      filesTab.classList.toggle("active", name === "files");
      tocTab.classList.toggle("active", name === "toc");
      filesTab.setAttribute("aria-expanded", name === "files" ? "true" : "false");
      tocTab.setAttribute("aria-expanded", name === "toc" ? "true" : "false");
    }

    function closeCompactPanel() {
      if (window.matchMedia("(max-width: 980px)").matches) setCompactPanel("");
    }

    filesTab.addEventListener("click", function () {
      setCompactPanel(side.dataset.openPanel === "files" ? "" : "files");
    });
    tocTab.addEventListener("click", function () {
      setCompactPanel(side.dataset.openPanel === "toc" ? "" : "toc");
    });

    var filesSection = make("section", "hcw-library-side-section hcw-library-files-section");
    filesSection.id = "hcw-library-files-panel";
    var filesHead = make("div", "hcw-library-side-head");
    filesHead.appendChild(make("div", "hcw-library-side-kicker", "FILES"));
    filesHead.appendChild(make("h3", "", vol.folder));
    filesSection.appendChild(filesHead);

    var searchWrap = make("div", "hcw-library-search-wrap");
    var search = document.createElement("input");
    search.type = "search";
    search.className = "hcw-library-search";
    search.placeholder = "搜索本卷笔记";
    search.setAttribute("aria-label", "搜索本卷笔记");
    searchWrap.appendChild(search);
    filesSection.appendChild(searchWrap);

    var fileScroll = make("div", "hcw-library-side-scroll");
    var fileList = make("div", "hcw-library-file-list");
    fileScroll.appendChild(fileList);
    filesSection.appendChild(fileScroll);
    side.appendChild(filesSection);
    side.appendChild(make("div", "hcw-library-side-divider"));

    var tocSection = make("section", "hcw-library-side-section hcw-library-toc-section");
    tocSection.id = "hcw-library-toc-panel";
    var tocHead = make("div", "hcw-library-side-head");
    tocHead.appendChild(make("div", "hcw-library-side-kicker", "CONTENTS"));
    var tocTitleRow = make("div", "hcw-library-toc-title-row");
    tocTitleRow.appendChild(make("h3", "", "目录"));
    var pos = make("span", "hcw-library-toc-position", "— / —");
    tocTitleRow.appendChild(pos);
    tocHead.appendChild(tocTitleRow);
    tocSection.appendChild(tocHead);
    var tocScroll = make("div", "hcw-library-side-scroll");
    var tocList = make("div", "hcw-library-toc-list");
    tocScroll.appendChild(tocList);
    tocSection.appendChild(tocScroll);
    side.appendChild(tocSection);

    var content = make("div", "hcw-reader-content");
    while (center.firstChild) content.appendChild(center.firstChild);
    shell.append(compactBar, side, content);
    center.appendChild(shell);

    var notes = noteEntries(index, vol.folder);
    filesTab.textContent = "本卷文件" + (notes.length ? " · " + notes.length : "");

    function renderFiles(query) {
      var q = String(query || "").trim().toLowerCase();
      fileList.replaceChildren();
      var count = 0;
      notes.forEach(function (note) {
        var hay = (note.title + " " + note.slug + " " + (note.filePath || "")).toLowerCase();
        if (q && hay.indexOf(q) === -1) return;
        count++;
        var a = make("a", "hcw-library-file-link" +
          (normalizeSlug(note.slug) === normalizeSlug(slug) ? " active" : ""));
        a.href = noteUrl(note.slug);
        a.appendChild(make("span", "hcw-library-file-name", note.title || note.slug));
        a.appendChild(make("span", "hcw-library-file-meta", vol.folder));
        fileList.appendChild(a);
      });
      if (!count) fileList.appendChild(make("div", "hcw-library-empty", "未找到匹配的笔记"));
    }
    renderFiles("");
    search.addEventListener("input", function () { renderFiles(search.value); });

    if (!sourceLinks.length) {
      sourceLinks = Array.from(content.querySelectorAll("article h2[id], article h3[id]")).map(function (h) {
        return { href: "#" + h.id, textContent: h.textContent, __depth: h.tagName === "H3" ? 2 : 1 };
      });
    }

    var tocItems = [];
    sourceLinks.forEach(function (src) {
      var href = src.getAttribute ? src.getAttribute("href") : src.href;
      if (!href || href.charAt(0) !== "#") return;
      var id = decodeURIComponent(href.slice(1));
      var target = document.getElementById(id);
      if (!target) return;
      var depth = src.__depth || 1;
      if (src.closest) {
        var li = src.closest("li");
        if (li) {
          if (li.classList.contains("depth-2")) depth = 2;
          else if (li.classList.contains("depth-1")) depth = 1;
          else depth = 0;
        }
      }

      var btn = make("button", "hcw-library-toc-link" + (depth >= 2 ? " sub" : ""));
      btn.type = "button";
      btn.textContent = (src.textContent || target.textContent || "").trim();
      btn.dataset.anchor = id;
      btn.title = btn.textContent;
      btn.addEventListener("click", function () {
        setActive(id, true);
        closeCompactPanel();

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            var offset = ((document.querySelector(".hcw-site-nav") || {}).offsetHeight || 72) + 26;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
            target.classList.add("hcw-library-anchor-flash");
            setTimeout(function () { target.classList.remove("hcw-library-anchor-flash"); }, 850);
          });
        });
      });
      tocList.appendChild(btn);
      tocItems.push({ id: id, target: target, button: btn });
    });

    tocTab.textContent = "文章目录" + (tocItems.length ? " · " + tocItems.length : "");

    function ensureVisible(btn) {
      if (!btn) return;
      var top = btn.offsetTop;
      var bottom = top + btn.offsetHeight;
      if (top < tocScroll.scrollTop + 8) {
        tocScroll.scrollTo({ top: Math.max(0, top - 12), behavior: "smooth" });
      } else if (bottom > tocScroll.scrollTop + tocScroll.clientHeight - 8) {
        tocScroll.scrollTo({ top: Math.max(0, bottom - tocScroll.clientHeight + 12), behavior: "smooth" });
      }
    }

    function setActive(id, keepVisible) {
      var active = -1;
      tocItems.forEach(function (item, i) {
        var yes = item.id === id;
        item.button.classList.toggle("active", yes);
        item.button.classList.remove("active-parent");
        if (yes) active = i;
      });
      if (active < 0) return;
      if (tocItems[active].button.classList.contains("sub")) {
        for (var j = active - 1; j >= 0; j--) {
          if (!tocItems[j].button.classList.contains("sub")) {
            tocItems[j].button.classList.add("active-parent");
            break;
          }
        }
      }
      pos.textContent = (active + 1) + " / " + tocItems.length;
      if (keepVisible !== false) ensureVisible(tocItems[active].button);
    }

    function syncFromScroll() {
      if (!tocItems.length) return;
      var offset = ((document.querySelector(".hcw-site-nav") || {}).offsetHeight || 72) + 42;
      var active = tocItems[0];
      tocItems.forEach(function (item) {
        if (item.target.getBoundingClientRect().top <= offset) active = item;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        active = tocItems[tocItems.length - 1];
      }
      setActive(active.id, true);
    }

    var ticking = false;
    scrollHandler = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        syncFromScroll();
      });
    };
    resizeHandler = scrollHandler;
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", resizeHandler, { passive: true });
    setTimeout(syncFromScroll, 80);
  }

  // Quartz may populate or replace #quartz-root *after* DOMContentLoaded.
  // Keep a lightweight DOM watcher so a directly loaded folder page receives
  // the same custom view as a page reached through SPA navigation.
  var currentSlug = null;
  var scanQueued = false;
  var scanObserver = null;

  function scan() {
    var slug = bodySlug();

    // Clean up exactly once when navigating to another slug. Re-running this
    // on every DOM mutation would delete our own custom page and create a loop.
    if (slug !== currentSlug) {
      clearModeClasses();
      currentSlug = slug;
    }

    if (slug === "系列笔记") {
      var existingRoot = document.querySelector("[data-hcw-library-root]");
      if (existingRoot && existingRoot.dataset.hcwLibraryReady === "1") return;
    } else if (document.querySelector(".hcw-volume-shell")) {
      return;
    } else if (document.querySelector("#quartz-body > .center > .hcw-reader-shell")) {
      return;
    }

    loadData().then(function (data) {
      if (slug !== bodySlug()) return;

      if (slug === "系列笔记") {
        var root = document.querySelector("[data-hcw-library-root]");
        if (!root || root.dataset.hcwLibraryReady === "1") return;
        root.dataset.hcwLibraryReady = "1";
        renderLibrary(root, data.config, data.index);
        return;
      }

      var vol = getVolumeForSlug(data.config, slug);
      if (!vol) return;

      if (normalizeSlug(slug) === normalizeSlug(vol.folder + "/index")) {
        if (document.querySelector(".hcw-volume-shell")) return;
        var center = document.querySelector("#quartz-body > .center");
        // Do not replace an incomplete Quartz shell. Wait until the native
        // folder listing has actually been inserted, then replace it once.
        if (!center || !center.querySelector(".page-listing")) return;
        renderVolume(data.config, data.index, vol);
      } else {
        if (document.querySelector("#quartz-body > .center > .hcw-reader-shell")) return;
        var article = document.querySelector("#quartz-body > .center article");
        if (!article) return;
        setupNotePage(data.config, data.index, vol, slug);
      }
    }).catch(function (error) {
      console.error("[H.cw 系列笔记] 初始化失败", error);
      var root = document.querySelector("[data-hcw-library-root]");
      if (root) {
        root.dataset.hcwLibraryReady = "0";
        root.textContent = "知识书架加载失败，请检查 hcw-library.json 与 contentIndex.json。";
      }
    });
  }

  function scheduleScan() {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(function () {
      scanQueued = false;
      scan();
    });
  }

  function start() {
    // Observe Quartz mount/replacement and body[data-slug] changes; our own
    // rendered page is recognized above, preventing re-render loops.
    scanObserver = new MutationObserver(scheduleScan);
    scanObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-slug"]
    });
    scheduleScan();
    window.addEventListener("load", scheduleScan, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
  document.addEventListener("nav", scheduleScan);
})();