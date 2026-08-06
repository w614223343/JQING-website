(function () {
  "use strict";

  var doc = document.documentElement;

  /* ---------- 自定义光标（仅桌面端） ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    doc.classList.add("cursor-on");
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    var mx = window.innerWidth / 2;
    var my = window.innerHeight / 2;
    var rx = mx;
    var ry = my;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();

    var hoverSel = "a, button, [data-cursor]";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(hoverSel)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(hoverSel)) ring.classList.remove("is-hover");
    });
  }

  /* ---------- 顶部进度条 + Hero 视差 ---------- */
  var progress = document.getElementById("progress");
  var heroImg = document.querySelector(".hero__media img");

  function onScroll() {
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = "scaleX(" + p + ")";

    if (heroImg && window.scrollY < window.innerHeight * 1.2) {
      heroImg.style.transform = "scale(1.12) translateY(" + window.scrollY * 0.18 + "px)";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 全屏菜单 ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var menu = document.getElementById("menu");

  function setMenu(open) {
    menuBtn.classList.toggle("open", open);
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- 滚动显现 ---------- */
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });

  /* ---------- 作品分类筛选 ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".card");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      var f = btn.dataset.filter;
      cards.forEach(function (card) {
        var show = f === "all" || card.dataset.category === f;
        if (show) {
          if (card.classList.contains("is-hidden")) {
            card.classList.remove("is-hidden");
            card.classList.add("is-entering");
            card.addEventListener("animationend", function () {
              card.classList.remove("is-entering");
            }, { once: true });
          }
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  /* ---------- 灯箱 ---------- */
  var lbItems = Array.prototype.slice.call(document.querySelectorAll(".card__open, .fcard__open"));
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector(".lightbox__img");
  var lbCap = lightbox.querySelector(".lightbox__cap");
  var lbCount = lightbox.querySelector(".lightbox__count");
  var lbIndex = 0;

  function openLb(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    var el = lbItems[lbIndex];
    var img = el.querySelector("img");
    lbImg.src = el.dataset.full || img.src;
    lbImg.alt = img.alt || "";
    lbCap.textContent = el.dataset.title || "";
    lbCount.textContent =
      String(lbIndex + 1).padStart(2, "0") + " / " + String(lbItems.length).padStart(2, "0");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }

  function closeLb() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  lbItems.forEach(function (el) {
    el.addEventListener("click", function () {
      openLb(parseInt(el.dataset.index, 10));
    });
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLb);
  lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () {
    openLb(lbIndex - 1);
  });
  lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () {
    openLb(lbIndex + 1);
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });

  window.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openLb(lbIndex - 1);
    if (e.key === "ArrowRight") openLb(lbIndex + 1);
  });

  /* ---------- 精选横向滚动 ---------- */
  var track = document.getElementById("fTrack");

  document.getElementById("fPrev").addEventListener("click", function () {
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" });
  });
  document.getElementById("fNext").addEventListener("click", function () {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
  });
})();
