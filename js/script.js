

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu-sp');

// ハンバーガーメニューをクリックしたときにメニューを開閉
hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const handleScroll = debounce(function () {
    // スクロール関連の値を取得
    const scrollTop = window.scrollY; // 現在のスクロール位置
    const scrollHeight = document.documentElement.scrollHeight; // ページ全体の高さ
    const clientHeight = document.documentElement.clientHeight; // ビューポートの高さ

    // logo要素の処理
    const logoElements = document.querySelectorAll('.logo'); // logoクラスを持つすべての要素を取得
    logoElements.forEach(function (logoElement) {
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            // 一番下より100px上に達した場合
            logoElement.classList.remove('to-top');
            logoElement.classList.remove('d-none');
        } else if (scrollTop > 500) {
            logoElement.classList.add('d-none');
            logoElement.classList.remove('to-top');
        } else if (scrollTop > 200) {
            logoElement.classList.add('to-top');
            logoElement.classList.remove('d-none');
        } else {
            logoElement.classList.remove('to-top');
            logoElement.classList.remove('d-none');
        }
    });

    // menu要素の処理
    const menuElements = document.querySelectorAll('.menu'); // menuクラスを持つすべての要素を取得
    menuElements.forEach(function (menuElement) {
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            // 一番下より100px上に達した場合
            menuElement.classList.remove('to-top');
            menuElement.classList.remove('d-none');
        } else if (scrollTop > 500) {
            menuElement.classList.add('to-top');
        } else {
            menuElement.classList.remove('to-top');
        }
    });
}, 100); // 100msの間隔でスクロール処理を実行

window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {

    // DOM要素を取得
    const skillEls = document.querySelectorAll('.skills');
  
    // カウントアップの設定
    const animationDuration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameDuration);
    const easeOut = t => t * (2 - t);
    const animateCountUp = el => {
      let frame = 0;
      const countTo = parseInt(el.innerHTML, 10);
      const counter = setInterval( () => {
        frame++;
        const progress = easeOut(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);
  
        if (parseInt(el.innerHTML, 10) !== currentCount) {
          el.innerHTML = currentCount;
        }
  
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };
  
    // Intersection observerに渡すコールバック関数
    const cb = function(entries, observer) {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          const proficiencyVal = entry.target.dataset.proficiency;
          const skillBar = entry.target.querySelector('.skill-bar');
          const percentage = entry.target.querySelector('.skill-percentage');
          const countup = entry.target.querySelector('.countup');
  
          skillBar.style.width = proficiencyVal + '%';
          percentage.style.opacity = 1;
          countup.textContent = proficiencyVal;
          animateCountUp(countup);
  
          observer.unobserve(entry.target);
        }
      });
    };
  
    // Intersection observerに渡すオプション
    const options = {
      rootMargin: "-100px 0px"
    };
  
    // IntersectionObserver初期化
    const io = new IntersectionObserver(cb, options);
    io.POLL_INTERVAL = 100; // Polyfillの設定
    skillEls.forEach(el => {
      io.observe(el);
    });
  
  });


  'use strict'; /* 厳格にエラーをチェック */

{ /* ローカルスコープ */

// DOM取得
const tabMenus = document.querySelectorAll('.tab__menu-item');
console.log(tabMenus);

// イベント付加
tabMenus.forEach((tabMenu) => {
  tabMenu.addEventListener('click', tabSwitch);
})

// イベントの処理
function tabSwitch(e) {

  // クリックされた要素のデータ属性を取得
  const tabTargetData = e.currentTarget.dataset.tab;
  // クリックされた要素の親要素と、その子要素を取得
  const tabList = e.currentTarget.closest('.tab__menu');
  console.log(tabList);
  const tabItems = tabList.querySelectorAll('.tab__menu-item');
  console.log(tabItems);
  // クリックされた要素の親要素の兄弟要素の子要素を取得
  const tabPanelItems = tabList.
  nextElementSibling.querySelectorAll('.tab__panel-box');
  console.log(tabPanelItems);

  // クリックされたtabの同階層のmenuとpanelのクラスを削除
  tabItems.forEach((tabItem) => {
    tabItem.classList.remove('is-active');
  })
  tabPanelItems.forEach((tabPanelItem) => {
    tabPanelItem.classList.remove('is-show');
  })

  // クリックされたmenu要素にis-activeクラスを付加
  e.currentTarget.classList.add('is-active');
  // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
  tabPanelItems.forEach((tabPanelItem) => {
    if (tabPanelItem.dataset.panel ===  tabTargetData) {
      tabPanelItem.classList.add('is-show');
    }
  })

}

}

document.addEventListener("DOMContentLoaded", function () {
  const targets = document.querySelectorAll(".frame-in");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target); // 1回だけ実行する場合
          }
      });
  }, {
      root: null,
      rootMargin: "-100px",
      threshold: 0.1 // 10%見えたら実行
  });

  targets.forEach(target => {
      observer.observe(target);
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: { 
            delay: 2000, // 3秒ごとに自動再生
            disableOnInteraction: false 
        },
        speed: 1000,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });

    // 画像クリックイベント
    document.querySelectorAll(".swiper-slide img").forEach(img => {
        img.addEventListener("click", () => {
            console.log(`クリックされた画像: ${img.src}`);
        });
    });

    // 画面内に入ったらスライダーを動かす
    function triggerScroll(targetObj, swiperInstance) {
        let targetFlag = false;
        let $window = $(window);

        function checkVisibility() {
            let scrollTop = $window.scrollTop();
            let scrollBottom = scrollTop + $window.height();
            let targetTop = targetObj.offset().top;
            let targetBottom = targetTop + targetObj.height();

            if (scrollBottom > targetTop && scrollTop < targetBottom) {
                if (!targetFlag) {
                    swiperInstance.autoplay.start(); // Swiperの自動再生開始
                    targetFlag = true;
                }
            } else {
                if (targetFlag) {
                    swiperInstance.autoplay.stop(); // Swiperの自動再生停止
                    targetFlag = false;
                }
            }
        }

        // 初回実行
        checkVisibility();

        // スクロール時にチェック
        $window.on('scroll', checkVisibility);
    }

    // Swiperのオートプレイ制御を追加
    $(document).ready(function() {
        triggerScroll($('.mySwiper'), swiper);
    });
});

        document.addEventListener("DOMContentLoaded", function () {
            const images = document.querySelectorAll(".gallery img");
            const modal = document.getElementById("modal");
            const modalImage = document.getElementById("modalImage");
            const captionText = document.getElementById("caption");
            const prevButton = document.getElementById("prev");
            const nextButton = document.getElementById("next");
            let currentIndex = 0;
            
            function openModal(index) {
                modalImage.src = images[index].src;
                captionText.textContent = images[index].dataset.caption;
                modal.classList.add("active");
                currentIndex = index;
            }
            
            images.forEach((img, index) => {
                img.addEventListener("click", function () {
                    openModal(index);
                });
            });
            
            modal.addEventListener("click", function (event) {
                if (event.target === modal || event.target === modalImage) {
                    modal.classList.remove("active");
                }
            });
            
            prevButton.addEventListener("click", function (event) {
                event.stopPropagation();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                openModal(currentIndex);
            });
            
            nextButton.addEventListener("click", function (event) {
                event.stopPropagation();
                currentIndex = (currentIndex + 1) % images.length;
                openModal(currentIndex);
            });
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, index * 200);
                    }
                });
            }, { threshold: 0.2 });
            
            images.forEach(img => {
                observer.observe(img);
            });
        });

document.addEventListener("DOMContentLoaded", function () {
    const worksBoxes = document.querySelectorAll(".works-box");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("frame-in");
                }, index * 1000); // 1秒間隔でアニメーションを開始
            }
        });
    }, { threshold: 0.1 });
    
    worksBoxes.forEach(box => observer.observe(box));
});
