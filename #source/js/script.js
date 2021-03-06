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
    let descriptionLeft = description.querySelector('.catalog-category-desc__left');
    let descriptionContent = description.querySelector('.catalog-category-desc__container');
    let moreButton = description.querySelector('.catalog-category-desc__more');
    moreButton.addEventListener('click', () => {
        descriptionContent.style.maxHeight = `${descriptionContent.scrollHeight}px`;
        moreButton.classList.add('hidden');
    })
    descriptionContent.style.maxHeight = `${descriptionLeft.scrollHeight}px`
    if (descriptionContent.scrollHeight > descriptionContent.clientHeight) {
        moreButton.classList.remove('hidden');
    }
    window.addEventListener('resize', () => {
        if (descriptionContent.scrollHeight > descriptionContent.clientHeight) {
            moreButton.classList.remove('hidden');
        }
    })
}

// product-tabs

if (document.querySelector('.product-tabs')) {
    let tabsBlocks = document.querySelectorAll('.product-tabs');

    tabsBlocks.forEach(block => {
        let links = block.querySelectorAll('.product-tabs__tab');
        let items = block.querySelectorAll('.product-tabs__item');
        let indexOfActiveTab = 0;
        links[indexOfActiveTab].classList.add('active');
        items[indexOfActiveTab].classList.add('active');
        setTimeout(() => {
            items[indexOfActiveTab].parentElement.style.maxHeight = `${items[indexOfActiveTab].scrollHeight}px`;
        }, 0)

        links.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                links[indexOfActiveTab].classList.remove('active');
                items[indexOfActiveTab].classList.remove('active');
                indexOfActiveTab = index;
                links[indexOfActiveTab].classList.add('active');
                items[indexOfActiveTab].classList.add('active');
                setTimeout(() => {
                    items[indexOfActiveTab].parentElement.style.maxHeight = `${items[indexOfActiveTab].scrollHeight}px`;
                }, 0)
            })
        })
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

function popupImage(image, dataset = false) {
    let popup = document.createElement('div');

    popup.classList.add('popup-image');

    let popupImage = document.createElement('img');

    if (dataset) {
        popupImage.setAttribute('src', image.dataset.src);
    } else {
        popupImage.setAttribute('src', image.src);
    }
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

// sertificates

if(document.querySelector('.main-banners__left-slider-container .swiper-slide > img')) {
    let images = document.querySelectorAll('.main-banners__left-slider-container .swiper-slide > img');

    images.forEach(image => {
        image.addEventListener('click', () => popupImage(image, true));
    })
}

if(document.querySelector('.product-tabs__slider .swiper-slide > img')) {
    let images = document.querySelectorAll('.product-tabs__slider .swiper-slide > img');

    images.forEach(image => {
        image.addEventListener('click', () => popupImage(image, true));
    })
}

if(document.querySelector('.sertificates__slider .swiper-slide > img')) {
    let images = document.querySelectorAll('.sertificates__slider .swiper-slide > img');

    images.forEach(image => {
        image.addEventListener('click', () => popupImage(image, true));
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
    
        // ????????????????/???????????????? select

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
    
        // ???????????????? ?????? ?????????????? ???? option

        for (let j = 0; j < selectSingle_labels.length; j++) {
            selectSingle_labels[j].addEventListener('click', function (evt) {
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
            });
        }

        // ???????????????? ?????? ?????????????? ???? ?????????????????? select

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

// faq

if (document.querySelector('.faq')) {
    let items = document.querySelectorAll('.faq .faq__item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            let sign = item.querySelector('.faq__question > .faq__sign');
            let answer = item.querySelector('.faq__answer');

            if (sign.classList.contains('active')) {
                sign.classList.remove('active');
                answer.style.maxHeight = '';
                answer.style.marginTop = '';
            } else {
                sign.classList.add('active');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                answer.style.marginTop = '25px';
            }
            })
    })
}

// video

if (document.querySelector('.video')) {
    let videos = document.querySelectorAll('.video');

    videos.forEach(video => {
        video.addEventListener('click', function loadVideo() {
            video.innerHTML = `<iframe src="${video.dataset.videolink}" style="width: 100%; height: 100%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            video.classList.remove('video');
            video.removeEventListener('click', loadVideo);
        })
    })
}