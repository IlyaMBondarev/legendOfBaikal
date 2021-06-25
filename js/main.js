
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

let cityBlocks = document.querySelectorAll('.city');

cityBlocks.forEach(cityBlock => {
    let cityCurrent = cityBlock.querySelector('.city__current');
    let cityLists = cityBlock.querySelectorAll('.city__item');

    cityLists.forEach(city => {
        city.addEventListener('click', () => {
            cityCurrent.textContent = city.textContent;
        })
    })
})

// dropdown-catalog

if (document.querySelector('.dropdown-catalog')) {
    let dropdownCatalog = document.querySelector('.dropdown-catalog');
    let dropdownCatalogMenu = dropdownCatalog.querySelector('.dropdown__menu');
    
    if (document.documentElement.scrollWidth > 1230) {
        dropdownCatalogMenu.style.left = `-${dropdownCatalog.offsetLeft}px`;
    } else {
        dropdownCatalogMenu.style.right = `-${document.documentElement.scrollWidth - dropdownCatalog.offsetWidth - dropdownCatalog.offsetLeft}px`;
        dropdownCatalogMenu.style.left = 'auto';
    }

    window.addEventListener('resize', () => {
        if (document.documentElement.scrollWidth > 1230) {
            dropdownCatalogMenu.style.left = `-${dropdownCatalog.offsetLeft}px`;
        } else {
            dropdownCatalogMenu.style.right = `-${document.documentElement.scrollWidth - dropdownCatalog.offsetWidth - dropdownCatalog.offsetLeft}px`;
            dropdownCatalogMenu.style.left = 'auto';
        }
    })
}

// main page pagination

if (document.querySelector('.screen') && document.querySelector('.main-pagination')) {
    
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
                    window.scrollTo({
                        top: screens[indexOfActiveSlide].offsetTop,
                        behavior: "smooth"
                    })
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
                    window.scrollTo({
                        top: screens[indexOfActiveSlide].offsetTop,
                        behavior: "smooth"
                    })
                }
            }
        })

        let arrowDown = mainPagination.querySelector('.main-pagination__arrow-down');

        arrowDown.addEventListener('click', () => {
            if (indexOfActiveSlide !== bullets.length - 1) {
                bullets[indexOfActiveSlide].classList.remove('active');
                indexOfActiveSlide++;
                bullets[indexOfActiveSlide].classList.add('active');
                window.scrollTo({
                    top: screens[indexOfActiveSlide].offsetTop,
                    behavior: "smooth"
                })
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
                }
            } else {
                if (screens[indexOfActiveSlide - 1] && screens[indexOfActiveSlide - 1].offsetTop + screens[indexOfActiveSlide - 1].scrollHeight - 20 > st) {
                    bullets[indexOfActiveSlide].classList.remove('active');
                    indexOfActiveSlide--;
                    bullets[indexOfActiveSlide].classList.add('active');
                }
            }

            lastScrollTop = st;
        })

        mainPagination.style.display = '';
    }
}

// catalog category description

if (document.querySelector('.catalog-category-desc')) {
    let description = document.querySelector('.catalog-category-desc');
    let descriptionContent = description.querySelector('.catalog-category-desc__container');
    let moreButton = description.querySelector('.catalog-category-desc__more');
    moreButton.addEventListener('click', () => {
        descriptionContent.style.maxHeight = `${descriptionContent.scrollHeight}px`;
        moreButton.classList.add('hidden');
    })
    if (descriptionContent.scrollHeight > descriptionContent.clientHeight) {
        moreButton.classList.remove('hidden');
    }
    window.addEventListener('resize', () => {
        if (descriptionContent.scrollHeight > descriptionContent.clientHeight) {
            moreButton.classList.remove('hidden');
        }
    })
}

// sort types

if (document.querySelector('.catalog-items__dropdown')) {
    let sortDropdowns = document.querySelectorAll('.catalog-items__dropdown');

    document.addEventListener('click', (event) => {
        sortDropdowns.forEach(dropdown => {

            let list = dropdown.querySelector('.catalog-items__dropdown-list');

            if (event.target === list || list.contains(event.target)) {

            }

            dropdown.classList.contains('active') ?
                dropdown.classList.remove('active') :
                    event.target === dropdown || dropdown.contains(event.target) ?
                        dropdown.classList.add('active') :
                        ''
        })
    })
}

// filters

if (document.querySelector('.catalog-filters')) {
    let filterBlock = document.querySelector('.catalog-filters');
    let filters = filterBlock.querySelectorAll('.catalog-filters__item');

    filters.forEach(filter => {
        let openers = filter.querySelectorAll('.catalog-filters__item-title > *');
        let info = filter.querySelector('.catalog-filters__item-info');

        openers.forEach(opener => {
            filter.classList.contains('active') 
                ? info.style.maxHeight = `${info.scrollHeight}px`: '';

            opener.addEventListener('click', () => {
                filter.classList.toggle('active');
                info.style.maxHeight = info.style.maxHeight ? '' : `${info.scrollHeight}px`;
            })
        })
    })


    // mobile

    if (document.querySelector('._filters-opener')) {

        let filterOpener = document.querySelector('._filters-opener');
        
        document.addEventListener('click', (event) => {
            if (filterBlock.classList.contains('active') && !(filterBlock.contains(event.target) || filterBlock === event.target) && !(filterOpener.contains(event.target) || filterOpener === event.target) ) {
                filterBlock.classList.remove('active');
                let scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        })

        filterOpener.addEventListener('click', () => {
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = 'fixed';
            filterBlock.classList.add('active');
        })
    }

    // double range inputs

    if (document.querySelector('.range')) {
        
        let ranges = document.querySelectorAll('.range');

        ranges.forEach(range => {
            let rangeBlock = range.querySelector('.range__block');
            let minButton = range.querySelector('.range__min');
            let maxButton = range.querySelector('.range__max');
            let rangeLine = range.querySelector('.range__center');

            let minInput = range.querySelector('input.range__curr-min');
            let maxInput = range.querySelector('input.range__curr-max');
            let minSpan = range.querySelector('span.range__curr-min');
            let maxSpan = range.querySelector('span.range__curr-max');

            let min = minInput.dataset.min;
            let max = maxInput.dataset.max;
            let rangeLength = max - min;

            let minPressed = false;
            let maxPressed = false;

            function handleMove (event) {
                if (minPressed) {
                    if (event.pageX - rangeBlock.offsetLeft >= 0 && event.pageX - rangeBlock.offsetLeft <= maxButton.offsetLeft) {
                        minButton.style.left = `${event.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.left = `${event.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = Math.round(minButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        minSpan.textContent = minInput.value;
                    } else if (event.pageX - rangeBlock.offsetLeft < 0) {
                        minButton.style.left = `0px`;
                        rangeLine.style.left = `0px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = min;
                        minSpan.textContent = minInput.value;
                    } else if (event.pageX - rangeBlock.offsetLeft > maxButton.offsetLeft) {
                        minButton.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        minInput.value = maxInput.value;
                        minSpan.textContent = minInput.value;
                    }
                } else if (maxPressed) {
                    if (event.pageX - rangeBlock.offsetLeft >= minButton.offsetLeft && event.pageX - rangeBlock.offsetLeft <= rangeBlock.offsetWidth) {
                        maxButton.style.left = `${event.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = Math.round(maxButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        maxSpan.textContent = maxInput.value;
                    } else if (event.pageX - rangeBlock.offsetLeft > rangeBlock.offsetWidth) {
                        maxButton.style.left = `${rangeBlock.offsetWidth}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = max;
                        maxSpan.textContent = maxInput.value;
                    } else if (event.pageX - rangeBlock.offsetLeft < minButton.offsetLeft) {
                        maxButton.style.left = `${minButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        maxInput.value = minInput.value;
                        maxSpan.textContent = maxInput.value;
                    }
                }
            }

            minButton.addEventListener('mousedown', () => {
                minPressed = true;
            })

            maxButton.addEventListener('mousedown', () => {
                maxPressed = true;
            })

            document.addEventListener('mousemove', (event) => handleMove(event))

            document.addEventListener('mouseup', function rangemoveStop() {
                minPressed = false;
                maxPressed = false;
            })

            minButton.addEventListener('touchstart', (event) => {
                event.preventDefault();
                minPressed = true;
                let touch = event.changedTouches[0];

                if (minPressed) {
                    if (touch.pageX - rangeBlock.offsetLeft >= 0 && touch.pageX - rangeBlock.offsetLeft <= maxButton.offsetLeft) {
                        minButton.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = Math.round(minButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        minSpan.textContent = minInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft < 0) {
                        minButton.style.left = `0px`;
                        rangeLine.style.left = `0px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = min;
                        minSpan.textContent = minInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft > maxButton.offsetLeft) {
                        minButton.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        minInput.value = maxInput.value;
                        minSpan.textContent = minInput.value;
                    }
                }
            })

            maxButton.addEventListener('touchstart', (event) => {
                event.preventDefault();
                maxPressed = true;
                let touch = event.changedTouches[0];

                if (maxPressed) {
                    if (touch.pageX - rangeBlock.offsetLeft >= minButton.offsetLeft && touch.pageX - rangeBlock.offsetLeft <= rangeBlock.offsetWidth) {
                        maxButton.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = Math.round(maxButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        maxSpan.textContent = maxInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft > rangeBlock.offsetWidth) {
                        maxButton.style.left = `${rangeBlock.offsetWidth}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = max;
                        maxSpan.textContent = maxInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft < minButton.offsetLeft) {
                        maxButton.style.left = `${minButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        maxInput.value = minInput.value;
                        maxSpan.textContent = maxInput.value;
                    }
                }
            })

            document.addEventListener('touchmove', (event) => {
                if (minPressed) {
                    let touch = event.changedTouches[0];
    
                    if (touch.pageX - rangeBlock.offsetLeft >= 0 && touch.pageX - rangeBlock.offsetLeft <= maxButton.offsetLeft) {
                        minButton.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = Math.round(minButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        minSpan.textContent = minInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft < 0) {
                        minButton.style.left = `0px`;
                        rangeLine.style.left = `0px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        minInput.value = min;
                        minSpan.textContent = minInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft > maxButton.offsetLeft) {
                        minButton.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.left = `${maxButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        minInput.value = maxInput.value;
                        minSpan.textContent = minInput.value;
                    }
                } else if (maxPressed) {
                    let touch = event.changedTouches[0];
    
                    if (touch.pageX - rangeBlock.offsetLeft >= minButton.offsetLeft && touch.pageX - rangeBlock.offsetLeft <= rangeBlock.offsetWidth) {
                        maxButton.style.left = `${touch.pageX - rangeBlock.offsetLeft}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = Math.round(maxButton.offsetLeft * rangeLength / rangeBlock.offsetWidth);
                        maxSpan.textContent = maxInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft > rangeBlock.offsetWidth) {
                        maxButton.style.left = `${rangeBlock.offsetWidth}px`;
                        rangeLine.style.width = `${maxButton.offsetLeft - minButton.offsetLeft}px`;
                        maxInput.value = max;
                        maxSpan.textContent = maxInput.value;
                    } else if (touch.pageX - rangeBlock.offsetLeft < minButton.offsetLeft) {
                        maxButton.style.left = `${minButton.offsetLeft}px`;
                        rangeLine.style.width = `0px`;
                        maxInput.value = minInput.value;
                        maxSpan.textContent = maxInput.value;
                    }
                }
            })

            document.addEventListener('touchend', function rangemoveStop() {
                minPressed = false;
                maxPressed = false;
            })

            document.addEventListener('touchcancel', function rangemoveStop(eent) {
                minPressed = false;
                maxPressed = false;
            })
        })
    }
}

function popupImage(image) {
    let popup = document.createElement('div');

    popup.classList.add('popup-image');

    let popupImage = document.createElement('img');

    popupImage.setAttribute('src', image.src);
    popupImage.setAttribute('alt', image.alt);

    popup.appendChild(popupImage);
    document.querySelector('body').appendChild(popup);

    popup = document.querySelector('body .popup-image');
    setTimeout(() => {
        popup.classList.add('active');
    }, 0)

    popup.addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.parentNode.removeChild(popup);
        }, 300)
    })
}

// product images

if (document.querySelector('.product-main__left')) {
    let productImagesBlock = document.querySelector('.product-main__left');
    let bigImage = productImagesBlock.querySelector('.product-main__image-big > img');
    let images = productImagesBlock.querySelectorAll('.product-main__image');

    images.forEach(image => {
        image.addEventListener('click', () => {
            bigImage.src = image.querySelector('img').src;
            bigImage.alt = image.querySelector('img').alt;
            images.forEach(image => {
                image.classList.remove('active');
            })
            image.classList.add('active');
        })
    })

    bigImage.addEventListener('click', () => popupImage(bigImage));
}

// cart images

if(document.querySelector('.cart-item__image > img')) {
    let images = document.querySelectorAll('.cart-item__image > img');

    images.forEach(image => {
        image.addEventListener('click', () => popupImage(image));
    })
}

// corporative-items mobile

if (document.querySelector('.corporative-items__head .corporative-items__info')) {
    let infoBlocks = document.querySelectorAll('.corporative-items__head .corporative-items__column');

    infoBlocks.forEach(block => {
        if (!(block.classList.contains('corporative-items__column-empty'))) {
            let opener = block.querySelector('.corporative-items__info-opener');
            let info = block.querySelector('.corporative-items__info');

            opener.addEventListener('click', () => {
                info.style.maxHeight = info.classList.contains('active') ? '' : `${info.scrollHeight}px`;
                opener.classList.toggle('active');
                info.classList.toggle('active');
            })
        }
    })
}

// select

if(document.querySelector('.__select')) {
    let selectSingle = document.querySelectorAll('.__select');

    selectSingle.forEach(selectSingle => {
        let selectSingle_title = selectSingle.querySelector('.__select__title');
        let selectSingle_arrow = selectSingle.querySelector('.__select__arrow');
        let selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
    
        // Открытие/закрытие select

        selectSingle_title.addEventListener('click', function () {
            if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
            } else {
            selectSingle.setAttribute('data-state', 'active');
            }
        });

        selectSingle_arrow.addEventListener('click', function () {
            if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
            } else {
            selectSingle.setAttribute('data-state', 'active');
            }
        });
    
        // Закрытие при нажатии на option

        for (let j = 0; j < selectSingle_labels.length; j++) {
            selectSingle_labels[j].addEventListener('click', function (evt) {
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
            });
        }

        // Закрытие при нажатии за пределами select

        window.addEventListener('click', function(event) {
            if (event.target !== selectSingle && !(selectSingle.contains(event.target))) {
            selectSingle.setAttribute('data-state', '');
            }
        })
    })
}

// animation pictures

if (document.querySelector('._animate-health-bottles') && document.querySelector('.health__top')) {
    let animateElementParent = document.querySelector('.health__top');
    let animateElement = document.querySelector('._animate-health-bottles');

    if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
        animateElement.style.transition = 'transform 1.3s ease-out';
        animateElement.style.transform = 'translateX(0)';
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
            animateElement.style.transition = 'transform 1.3s ease-out';
            animateElement.style.transform = 'translateX(0)';
        }
    })
}

if (document.querySelector('._animate-uniq-back') && document.querySelector('.uniq')) {
    let animateElementParent = document.querySelector('.uniq');
    let animateElement = document.querySelector('._animate-uniq-back');

    if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
        animateElement.style.transition = 'transform 0.8s ease-out';
        animateElement.style.transform = 'translateX(0)';
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
            animateElement.style.transition = 'transform 0.8s ease-out';
            animateElement.style.transform = 'translateX(0)';
        }
    })
}

if (document.querySelector('._animate-main-banner') && document.querySelector('.main-banner')) {
    let animateElementParent = document.querySelector('.main-banner');
    let animateElement = document.querySelector('._animate-main-banner');

    if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
        animateElement.style.transition = 'transform 0.8s ease-out';
        animateElement.style.transform = 'translateX(0)';
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > animateElementParent.offsetTop - (document.documentElement.clientHeight/2) && window.scrollY < animateElementParent.offsetTop + (animateElementParent.scrollHeight/2)) {
            animateElement.style.transition = 'transform 0.8s ease-out';
            animateElement.style.transform = 'translateX(0)';
        }
    })
}

// parallax

if (document.querySelector('._parallax')) {
    let image = document.querySelector('._parallax');
    let imageParent = document.querySelector('._parallax-parent');
    let yMin = -200;
    let yMax = 300;
    if (window.scrollY > imageParent.offsetTop - (document.documentElement.clientHeight)/2 && window.scrollY < imageParent.offsetTop + imageParent.scrollHeight) {
        let y = (window.scrollY - (imageParent.offsetTop - document.documentElement.clientHeight)) / (imageParent.offsetHeight + document.documentElement.clientHeight);
        image.style.top = `${yMin + y * (yMax - yMin)}px`;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > imageParent.offsetTop - (document.documentElement.clientHeight)/2 && window.scrollY < imageParent.offsetTop + imageParent.scrollHeight) {
            let y = (window.scrollY - (imageParent.offsetTop - document.documentElement.clientHeight)) / (imageParent.offsetHeight + document.documentElement.clientHeight);
            image.style.top = `${yMin + y * (yMax - yMin)}px`;
        }
    })
}

//sliders

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

if (document.querySelector('.uniq__slider')) {
    const uniqSlider = new Swiper('.uniq__slider', {
        navigation: {
            nextEl: '.uniq__arrow-right',
            prevEl: '.uniq__arrow-left'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            320: {
                slidesPerView: 2
            },
            480: {
                slidesPerView: 3
            },
            600: {
                slidesPerView: 4,
            }
        },
        watchOverflow: true,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    });
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