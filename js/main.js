
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