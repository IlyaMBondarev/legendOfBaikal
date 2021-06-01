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
    const mainPartnersSlider = new Swiper('.main-partners__slider', {
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

if (document.querySelector('.catalog-viewed__slider')) {
    const catalogViewedSlider = new Swiper('.catalog-viewed__slider', {
        navigation: {
            nextEl: '.catalog-viewed__arrow-right',
            prevEl: '.catalog-viewed__arrow-left'
        },
        simulateTouch: false,
        watchOverflow: true,
        spaceBetween: 15,
        breakpoints: {
            320: {
                slidesPerView: 'auto',
            },
            768: {
                slidesPerView: 5,
            }
        }
    });
}

if (document.querySelector('.product-also__slider')) {
    const productAlsoSlider = new Swiper('.product-also__slider', {
        navigation: {
            nextEl: '.product-also__arrow-right',
            prevEl: '.product-also__arrow-left'
        },
        simulateTouch: false,
        watchOverflow: true,
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1023: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
}

let aboutArticlesPCSlider, aboutArticlesMobileSlider;

if (document.querySelector('.about-articles__slider-pc')) {
    aboutArticlesPCSlider = new Swiper('.about-articles__slider-pc', {
        navigation: {
            nextEl: '.about-articles__arrow-right',
            prevEl: '.about-articles__arrow-left'
        },
        pagination: {
            el: '.about-articles__pagination',
            clickable: true,
            dynamicBullets: true
        },
        simulateTouch: false,
        slidesPerView: 1,
        watchOverflow: true,
        spaceBetween: 15,
    });
}

if (document.querySelector('.about-articles__slider-mobile')) {
    aboutArticlesMobileSlider = new Swiper('.about-articles__slider-mobile', {
        slidesPerView: 1,
        watchOverflow: true,
        spaceBetween: 15,
    });
}

if (document.querySelector('.about-articles__slider-pc') && document.querySelector('.about-articles__slider-mobile')) {
    aboutArticlesPCSlider.controller.control = aboutArticlesMobileSlider;
    aboutArticlesMobileSlider.controller.control = aboutArticlesPCSlider;
}

if (document.querySelector('.corporative-slider__slider')) {
    const mainNewsSlider = new Swiper('.corporative-slider__slider', {
        navigation: {
            nextEl: '.corporative-slider__arrow-right',
            prevEl: '.corporative-slider__arrow-left'
        },
        pagination: {
            el: '.corporative-slider__pagination',
            clickable: true,
            dynamicBullets: true
        },
        simulateTouch: false,
        watchOverflow: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });
}