
document.querySelector('.page').classList.add('loaded');

// burger

let burger = document.querySelector('.burger');
let burgerOpeners = document.querySelectorAll('._burger-opener');
let burgerClosers = document.querySelectorAll('._burger-closer');

burgerOpeners.forEach(opener => {
    opener.addEventListener('click', () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        burger.classList.add('active');
    })
})

burgerClosers.forEach(closer => {
    closer.addEventListener('click', () => {
        burger.classList.remove('active');
        let scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    })
})

// city

let cityBlock = document.querySelector('.city');
let cityCurrent = cityBlock.querySelector('.city__current');
let cityLists = cityBlock.querySelectorAll('.city__item');

cityLists.forEach(city => {
    city.addEventListener('click', () => {
        cityCurrent.textContent = city.textContent;
    })
})

// main page pagination

let screens = document.querySelectorAll('.screen');
let mainPagination = document.querySelector('.main-pagination');

if (mainPagination && screens.length) {
    mainPagination.style.display = 'none';
    mainPagination.classList.remove('hidden');

    let indexOfActiveSlide = 0;
    let mainPaginationBlock = mainPagination.querySelector('.main-pagination__pagination');
    screens.forEach((screen, index) => {
        let bullet = document.createElement('span');
        bullet.classList.add('main-pagination__pagination-bullet');
        mainPaginationBlock.appendChild(bullet);

        if (screen.offsetTop <= window.scrollY) {
            indexOfActiveSlide = index;
        }
    })

    let bullets = mainPaginationBlock.querySelectorAll('.main-pagination__pagination-bullet');
    bullets[indexOfActiveSlide].classList.add('active');

    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            bullets[indexOfActiveSlide].classList.remove('active');
            bullet.classList.add('active');
            indexOfActiveSlide = index;
            if (indexOfActiveSlide === 0) {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
                screens[indexOfActiveSlide].scrollIntoView({behavior: 'smooth'});
            }
        })
    })

    let arrowUp = mainPagination.querySelector('.main-pagination__arrow-up');

    arrowUp.addEventListener('click', () => {
        if (indexOfActiveSlide !== 0) {
            bullets[indexOfActiveSlide].classList.remove('active');
            indexOfActiveSlide--;
            bullets[indexOfActiveSlide].classList.add('active');
            if (indexOfActiveSlide === 0) {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
                screens[indexOfActiveSlide].scrollIntoView({behavior: 'smooth'});
            }
        }
    })

    let arrowDown = mainPagination.querySelector('.main-pagination__arrow-down');

    arrowDown.addEventListener('click', () => {
        if (indexOfActiveSlide !== bullets.length - 1) {
            bullets[indexOfActiveSlide].classList.remove('active');
            indexOfActiveSlide++;
            bullets[indexOfActiveSlide].classList.add('active');
            screens[indexOfActiveSlide].scrollIntoView({behavior: 'smooth'});
        }
    });

    let lastScrollTop = window.scrollY;

    window.addEventListener('scroll', () => {
        let st = window.scrollY;

        if (st > lastScrollTop){
            if (screens[indexOfActiveSlide + 1] && screens[indexOfActiveSlide + 1].offsetTop + 20 <= st) {
                bullets[indexOfActiveSlide].classList.remove('active');
                indexOfActiveSlide++;
                bullets[indexOfActiveSlide].classList.add('active');
                screens[indexOfActiveSlide].scrollIntoView({behavior: 'smooth'});
            }
         } else {
            if (screens[indexOfActiveSlide - 1] && screens[indexOfActiveSlide - 1].offsetTop + screens[indexOfActiveSlide - 1].scrollHeight - 20 > st) {
                bullets[indexOfActiveSlide].classList.remove('active');
                indexOfActiveSlide--;
                bullets[indexOfActiveSlide].classList.add('active');
                screens[indexOfActiveSlide].scrollIntoView({behavior: 'smooth'});
            }
         }

        lastScrollTop = st;
    })

    mainPagination.style.display = '';
}
if (document.querySelector('.main-banners__slider')) {
    const mainBannersSlider = new Swiper('.main-banners__slider', {
        navigation: {
            nextEl: '.main-banners__arrow-right',
            prevEl: '.main-banners__arrow-left'
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
        },
        simulateTouch: false,
        watchOverflow: true,
        slidesPerView: 1,
        effect: 'fade',
        touchMoveStopPropagation: true
    });
    let mainBannersPaginationItems = document.querySelectorAll('.main-banners__slider + .main-banners__right .main-banners__right-item');
    let activeBanner = document.querySelector('.main-banners__slider + .main-banners__right .main-banners__right-item.active');

    mainBannersPaginationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activeBanner.classList.remove('active');
            item.classList.add('active');
            activeBanner = item;
            mainBannersSlider.slideTo(index);
        })
    })

    if (document.querySelector('.main-banners__left-slider-container')) {
        const mainBannersInnerSlider = new Swiper('.main-banners__left-slider-container', {
            navigation: {
                nextEl: '.main-banners__left-slider-arrow-right',
                prevEl: '.main-banners__left-slider-arrow-left'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            watchOverflow: true,
            spaceBetween: 50,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                },
                380: {
                    slidesPerView: 4,
                },
                600: {
                    slidesPerView: 5,
                },
                768: {
                    slidesPerView: 2,
                },
                1230: {
                    slidesPerView: 3,
                }
            }
        })
    }
}

if (document.querySelector('.main-news__slider')) {
    const mainNewsSlider = new Swiper('.main-news__slider', {
        navigation: {
            nextEl: '.main-news__arrow-right',
            prevEl: '.main-news__arrow-left'
        },
        simulateTouch: false,
        watchOverflow: true,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            480: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3,
            }
        }
    });
}

if (document.querySelector('.main-partners__slider')) {
    const mainRepliesSlider = new Swiper('.main-partners__slider', {
        navigation: {
            nextEl: '.main-partners__arrow-right',
            prevEl: '.main-partners__arrow-left'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        simulateTouch: false,
        breakpoints: {
            320: {
                slidesPerView: 2,
                slidesPerColumn: 3,
            },
            768: {
                slidesPerView: 4,
                slidesPerColumn: 2,
            }
        },
        watchOverflow: true,
        autoHeight: false
    });
}

if (document.querySelector('.main-videos__slider')) {
    const mainVideosSlider = new Swiper('.main-videos__slider', {
        navigation: {
            nextEl: '.main-videos__arrow-right',
            prevEl: '.main-videos__arrow-left'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        simulateTouch: false,
        slidesPerView: 1,
        watchOverflow: true,
        spaceBetween: 30
    });
}

if (document.querySelector('.main-replies__slider')) {
    const mainRepliesSlider = new Swiper('.main-replies__slider', {
        navigation: {
            nextEl: '.main-replies__arrow-right',
            prevEl: '.main-replies__arrow-left'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        simulateTouch: false,
        slidesPerView: 4,
        watchOverflow: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1370: {
                slidesPerView: 4,
                spaceBetween: 80,
            }
        },
    });
}