/*
Template Name: Hybrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: swiper init js
*/

//Default Swiper
var swiper = new Swiper(".default-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

//Navigation Swiper
var swiper = new Swiper(".navigation-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
    },
});

//Pagination Dynamic Swiper
var swiper = new Swiper(".pagination-dynamic-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

// Pagination fraction Swiper
var swiper = new Swiper(".pagination-fraction-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Pagination Custom Swiper
var swiper = new Swiper(".pagination-custom-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        clickable: true,
        el: ".swiper-pagination",
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    }
});

// Pagination Progress Swiper
var swiper = new Swiper(".pagination-progress-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Scrollbar Swiper
var swiper = new Swiper(".pagination-scrollbar-swiper", {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

// Vertical Swiper
var swiper = new Swiper(".vertical-swiper", {
    loop: true,
    direction: "vertical",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Mousewheel Control Swiper
var swiper = new Swiper(".mousewheel-control-swiper", {
    loop: true,
    direction: "vertical",
    mousewheel: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Effect Fade Swiper
var swiper = new Swiper(".effect-fade-swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Effect Coverflow Swiper
var swiper = new Swiper(".effect-coverflow-swiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "4",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
});

// Effect Flip Swiper
var swiper = new Swiper(".effect-flip-swiper", {
    loop: true,
    effect: "flip",
    grabCursor: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Effect Creative Swiper
var swiper = new Swiper(".effect-creative-swiper", {
    loop: true,
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Responsive Swiper
var swiper = new Swiper(".responsive-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 50,
        },
    },
});