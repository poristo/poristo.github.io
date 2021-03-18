(function ($) {
    "use strict";

    aosInit();

    $(window).on('scroll', function () {
        stickyHeader();
        scrollToTop();
    })

    $(document).ready(function () {
        disableBodyScroll();
        smoothScroll();
        backgroundColor();
        masonaryFilter();        
    })

    $(window).on('load', function () {
        isotopeInit();
    })

    // AOS init
    function aosInit() {
        AOS.init({
            duration: 700,
            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            once: true,
            startEvent: "load"
        })
    }

    // stickyHeader init
    function stickyHeader() {
        var sticky = $('.grip-header'),
            scroll = $(window).scrollTop();
        if (scroll >= 100) sticky.addClass('sticky');
        else sticky.removeClass('sticky');
    }

    // scrollToTop init
    function scrollToTop() {
        if ($(window).scrollTop() >= 500) {
            $('.scroll-top').addClass('show');
        } else {
            $('.scroll-top').removeClass('show');
        }
    }

    // disableBodyScroll init
    function disableBodyScroll() {
        var vScrollWidth = window.innerWidth - $(document).width();        
        function noBodyScroll() {
            $('html').css({
                'padding-right' : vScrollWidth+'px',
                'overflow-y' : 'hidden'
            })
        }
        function doBodyScroll() {
            setTimeout(function(){
            $('html').css({
                'padding-right' : 0,
                'overflow-y' : 'auto'
            }) },200)
        }
        var navbarToggler = $('.navbar-toggler');
        $(navbarToggler).on('click', function(){
            if(navbarToggler.attr('aria-expanded') == 'false') {
                noBodyScroll();
            }
            if(navbarToggler.attr('aria-expanded') == 'true') {
                doBodyScroll();
            }
        })
    }

    // Smooth-Scroll init
    function smoothScroll() {
        var scrollLink = $('.scroll-to-anim');
        scrollLink.on("click", function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - 100
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        })
    }

    // Inline BackgroundColor Init
    function backgroundColor() {
        $('[data-bgc]').each(function () {
            var color = $(this).attr('data-bgc')
            $(this).css({
                'background-color': color
            })
        })
    }

    // mesonary-filter init
    function masonaryFilter() {
        var $masonaryFilter = $('.mesonary-filter');
        $masonaryFilter.isotope();
        $('.work-filters').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $masonaryFilter.isotope({
                filter: filterValue
            });
            $(this).addClass('active').siblings().removeClass('active');
        })
    }

    // isotope init
    function isotopeInit() {
        var $mesonaryInit = $('.mesonaryInit').isotope();
        $mesonaryInit.imagesLoaded().progress( function() {
            $mesonaryInit.isotope('layout');
        })
    }

})(jQuery);