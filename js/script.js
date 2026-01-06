"use strict";

const navButton = document.getElementById("navButton");
const globalNav = document.getElementById("globalNav");
const navText = document.getElementById("navText");

function navOpenClose() {
  navButton.addEventListener("click", () => {
    const expanded = navButton.getAttribute("aria-expanded") === "true";
    navButton.setAttribute("aria-expanded", !expanded);
    globalNav.setAttribute("aria-hidden", expanded);
    navText.setAttribute("aria-expanded", !expanded);
    navButton.setAttribute("aria-label", expanded ? "メニューを開く" : "メニューを閉じる");

    // メニューが開いたときに背景色クラスを更新
    if (!expanded) {
    // メニューが開いたとき（navが表示されたとき）
      document.body.className = document.body.className.replace(/has-\w+-bg/g, '');
      document.body.classList.add('has-dark-bg');
    } else {
      // メニューが閉じたときは通常の更新処理を実行
      updateHeaderBgClass();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navButton.getAttribute("aria-expanded") === "true") {
      navButton.click();
    }
  });
}

navOpenClose();

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function animation() {
if (!prefersReducedMotion) {
  const items = document.querySelectorAll('.js-clip-in, .js-fade-up');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          obs.unobserve(entry.target); // 1回で終了
        }
      });
    },
    {
      threshold: 0.3
    }
  );

    items.forEach(el => observer.observe(el));
  }
}

animation();

// すべてのハッシュリンクのハッシュを削除する処理
function removeHashFromLinks() {
  // すべてのハッシュリンク（href="#..."）を取得
  const hashLinks = document.querySelectorAll('a[href^="#"]');
  
  hashLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // 空のハッシュ（href="#"）の場合は何もしない
      if (href === "#") {
        e.preventDefault();
        return;
      }
      
      // ハッシュリンクの場合、デフォルト動作を防ぐ
      e.preventDefault();
      
      // ターゲット要素を取得
      const targetId = href.substring(1); // #を削除
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // スムーズスクロール
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else if (href === "#page-top" || href === "#top") {
        // ページトップへのスクロール
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  });
}

// ページ読み込み時に既存のハッシュを削除
function removeHashFromURL() {
  if (window.location.hash) {
    // ハッシュを削除（履歴に追加しない）
    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    );
  }
}

const topButton = document.getElementById("topButton");

function initTopButton() {
  if (!topButton) return;
  
  const topButtonLink = topButton.querySelector("a");
  
  if (topButtonLink) {
    topButtonLink.addEventListener("click", (e) => {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      topButton.classList.add("is-visible");
    } else {
      topButton.classList.remove("is-visible");
    }
  });
}

// 初期化
removeHashFromLinks();
removeHashFromURL();
initTopButton();

// ハッシュ変更イベントを監視して削除（外部からのハッシュ追加を防ぐ）
window.addEventListener("hashchange", () => {
  removeHashFromURL();
});

// スクロール時にbodyにクラスを追加
function updateHeaderBgClass() {
  const header = document.querySelector('.l-header');
  const headerRect = header.getBoundingClientRect();
  const centerY = headerRect.top + headerRect.height / 2;
  const elementBelow = document.elementFromPoint(headerRect.left + headerRect.width / 2, centerY + 30);
  
  // 親要素からdata-bg-typeを取得
  let bgType = 'light'; // デフォルト
  let current = elementBelow;
  while (current && current !== document.body) {
    if (current.dataset.bgType) {
      bgType = current.dataset.bgType;
      break;
    }
    current = current.parentElement;
  }
  
  document.body.className = document.body.className.replace(/has-\w+-bg/g, '');
  document.body.classList.add(`has-${bgType}-bg`);
}

// スクロール時に更新
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeaderBgClass();
      ticking = false;
    });
    ticking = true;
  }
});

// 初期化
updateHeaderBgClass();