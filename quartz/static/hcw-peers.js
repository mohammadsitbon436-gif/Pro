/* H.cw peers carousel · no third-party dependencies; Quartz SPA-compatible. */
(function () {
  if (window.__hcwPeersInstalled) return;
  window.__hcwPeersInstalled = true;

  var scriptUrl = (document.currentScript && document.currentScript.src) ||
    new URL("static/hcw-peers.js", document.baseURI).href;
  var dataUrl = new URL("hcw-peers.json", scriptUrl).href;

  function el(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined && value !== null) node.textContent = String(value);
    return node;
  }
  function readable(value) {
    return typeof value === "string" && value.trim() ? value.trim() : "待填写";
  }
  function profileImage(student, large) {
    var wrap = el("span", large ? "hcw-peer-detail-visual" : "hcw-peer-visual");
    var cleanName = typeof student.name === "string" ? student.name.trim() : "";
    var englishInitial = cleanName.match(/[A-Za-z](?!.*[A-Za-z])/);
    var initial = englishInitial ? englishInitial[0].toUpperCase() : (cleanName.slice(0, 1) || "·");
    var placeholder = large ? initial : "PHOTO";
    var photo = typeof student.photo === "string" ? student.photo.trim() : "";
    // Use the local /static/peers/ directory only; no remote image URLs or injected HTML.
    if (/^peers\/[\p{L}\p{N}_.\-/]+\.(?:png|jpe?g|webp)$/iu.test(photo) && !photo.includes("..")) {
      var img = document.createElement("img");
      img.src = new URL(photo.split("/").map(encodeURIComponent).join("/"), dataUrl).href;
      img.alt = readable(student.name) + "的照片";
      img.loading = large ? "eager" : "lazy";
      img.addEventListener("error", function () { img.remove(); wrap.textContent = placeholder; }, { once: true });
      wrap.appendChild(img);
    } else {
      wrap.textContent = placeholder;
    }
    return wrap;
  }
  function addInfo(target, title, value) {
    var row = el("div");
    row.appendChild(el("dt", "", title));
    row.appendChild(el("dd", "", readable(value)));
    target.appendChild(row);
  }
  function renderDetail(host, student, index, allowPreview, dialog) {
    host.replaceChildren();
    var layout = el("div", "hcw-peer-detail-layout");
    var info = el("div", "hcw-peer-detail-info");
    info.appendChild(el("p", "hcw-peer-detail-kicker", "STUDENT PROFILE · " + String(index + 1).padStart(2, "0")));
    var name = el("h2", "", readable(student.name));
    name.id = "hcw-peer-modal-name";
    info.appendChild(name);

    var meta = el("dl", "hcw-peer-detail-meta");
    addInfo(meta, "研究生院校", student.graduate);
    addInfo(meta, "研究方向", student.research);
    addInfo(meta, "本科院校", student.undergraduate);
    addInfo(meta, "升学背景", student.background);
    info.appendChild(meta);

    var copy = el("div", "hcw-peer-detail-copy");
    if (student.intro) copy.appendChild(el("p", "hcw-peer-detail-intro", student.intro));
    if (student.story) copy.appendChild(el("p", "", student.story));
    if (student.message) copy.appendChild(el("p", "hcw-peer-detail-message", student.message));
    info.appendChild(copy);

    var media = el("div", "hcw-peer-detail-media");
    var visual = profileImage(student, true);
    media.appendChild(visual);
    if (allowPreview) {
      var upload = el("label", "hcw-peer-detail-upload", "上传照片预览");
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/png,image/jpeg,image/webp";
      input.setAttribute("aria-label", "上传照片，仅用于当前页面预览，不会保存");
      upload.appendChild(input);
      input.addEventListener("change", function () {
        var file = input.files && input.files[0];
        if (!file || !/^(image\/png|image\/jpeg|image\/webp)$/.test(file.type) || file.size > 12 * 1024 * 1024) return;
        if (dialog.__hcwPhotoPreviewURL) URL.revokeObjectURL(dialog.__hcwPhotoPreviewURL);
        var url = URL.createObjectURL(file);
        dialog.__hcwPhotoPreviewURL = url;
        var image = document.createElement("img");
        image.src = url;
        image.alt = readable(student.name) + "的照片（本地预览）";
        visual.replaceChildren(image);
      });
      media.appendChild(upload);
      media.appendChild(el("p", "hcw-peer-detail-upload-note", "仅本地预览，不会上传或保存"));
    }
    layout.appendChild(info);
    layout.appendChild(media);
    host.appendChild(layout);
  }
  function initialize(root) {
    if (root.dataset.hcwStatus) return;
    root.dataset.hcwStatus = "loading";
    var rail = root.querySelector("[data-hcw-rail]");
    var prev = root.querySelector("[data-hcw-prev]");
    var next = root.querySelector("[data-hcw-next]");
    var count = root.querySelector("[data-hcw-count]");
    var demo = root.querySelector("[data-hcw-demo]");
    var dialog = document.querySelector("[data-hcw-dialog]");
    var detail = dialog && dialog.querySelector("[data-hcw-detail]");
    var close = dialog && dialog.querySelector("[data-hcw-close]");
    if (!rail || !prev || !next || !count || !dialog || !detail || !close) return;
    var studentList = [];
    var previousFocus = null;
    function cardStep() {
      var card = rail.querySelector(".hcw-peer-card");
      if (!card) return 0;
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    }
    function updateControls() {
      var step = cardStep();
      var max = Math.max(0, rail.scrollWidth - rail.clientWidth);
      var index = step ? Math.min(studentList.length, Math.round(rail.scrollLeft / step) + 1) : 0;
      count.textContent = studentList.length ?
        String(index).padStart(2, "0") + " / " + String(studentList.length).padStart(2, "0") : "00 / 00";
      prev.disabled = rail.scrollLeft < 3;
      next.disabled = rail.scrollLeft >= max - 3;
    }
    function move(direction) {
      var step = cardStep();
      if (!step) return;
      var targetIndex = Math.round(rail.scrollLeft / step) + direction;
      rail.scrollTo({ left: Math.max(0, targetIndex * step),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    prev.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    rail.addEventListener("scroll", updateControls, { passive:true });
    rail.addEventListener("keydown", function (event) {
      if (event.target !== rail) return;
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    });
    window.addEventListener("resize", updateControls);
    close.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (dialog.__hcwPhotoPreviewURL) {
        URL.revokeObjectURL(dialog.__hcwPhotoPreviewURL);
        dialog.__hcwPhotoPreviewURL = null;
      }
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    });
    fetch(dataUrl, { cache: "no-cache" }).then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    }).then(function (data) {
      if (!root.isConnected) return;
      studentList = Array.isArray(data.students) ? data.students : [];
      rail.replaceChildren();
      if (demo) demo.hidden = !data.demo;
      if (studentList.length === 0) {
        rail.appendChild(el("p", "hcw-peers-loading", "学生展示区尚未开放。"));
      }
      studentList.forEach(function (student, index) {
        var card = el("button", "hcw-peer-card");
        card.type = "button";
        card.setAttribute("aria-label", "查看" + readable(student.name) + "的完整介绍");
        card.appendChild(profileImage(student, false));
        card.appendChild(el("p", "hcw-peer-label", "STUDENT PROFILE"));
        card.appendChild(el("h3", "hcw-peer-name", readable(student.name)));
        var meta = el("dl", "hcw-peer-meta");
        addInfo(meta, "本科院校", student.undergraduate);
        addInfo(meta, "研究生院校", student.graduate);
        card.appendChild(meta);
        var more = el("span", "hcw-peer-more");
        more.appendChild(el("span", "", "查看个人介绍"));
        more.appendChild(el("b", "", "↗"));
        card.appendChild(more);
        card.addEventListener("click", function () {
          previousFocus = card;
          renderDetail(detail, student, index, Boolean(data.demo), dialog);
          if (typeof dialog.showModal === "function") dialog.showModal();
        });
        rail.appendChild(card);
      });
      root.dataset.hcwStatus = "ready";
      requestAnimationFrame(updateControls);
    }).catch(function (error) {
      console.error("[H.cw 同行者] 加载学生资料失败", error);
      rail.replaceChildren(el("p", "hcw-peers-loading", "资料加载失败：请检查 quartz/static/hcw-peers.json 是否已复制并重新构建。"));
      count.textContent = "— / —";
      root.dataset.hcwStatus = "error";
    });
  }
  function scan() {
    document.querySelectorAll(".hcw-peers[data-hcw-peers]").forEach(initialize);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan, { once: true });
  else scan();
  // Quartz enables SPA navigation; initialize the page again when its content is replaced.
  document.addEventListener("nav", function () { setTimeout(scan, 0); });
})();
