$(function(){    
t1 = {
    loadScripts: () => {

        // Load editor object/plugins

        const urls = [
            'js/t1-utilities.js' // utils
            //'./?a=100832:js/t1-utilities.js'
        ];

        let scriptPartials = Promise.all(urls.map(url =>
            $.getScript(url).done((script, textStatus) => {
                console.log(textStatus);
            })
        ));
        $.when(scriptPartials).then(function(partials){
            t1.loadCarousels();
            t1.locationsMobile();
            t1.equalHeightList();
            t1.loads();
            t1.banner();
            t1.heroOverLayList();
        }); 

    },
    init: () => {
        t1.loadScripts();
       
    },
    banner: () => {
        // Ensure Locations is above fold + center align content
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();
        let stripHeight = $('.strip-divider.locations').height();
        if(windowWidth > 1199.8 && windowHeight < 1000) {
            let bannerHeight = parseFloat(windowHeight - stripHeight);
            $('header').height(bannerHeight);
            $('header .hero-overlay').height(bannerHeight + 16);
        };
        // Center Banner Content
        let headerHeight = $('header').outerHeight();
        let topNavBottomCoord = parseFloat($('.top-nav').position().top + $('.top-nav').outerHeight());
        let bannerContentHeight = parseFloat(headerHeight - topNavBottomCoord);
        $('.banner-content').height(bannerContentHeight);
    },
    heroOverLayList: () => {
        t1.utilities.heroOverLay('#why-attend');
    },
    loads: () => {
        setTimeout(() => {
            if ( matchMedia('screen and (min-width: 768px) and (max-width: 1440px').matches ) {
                t1.utilities.ratioBkgImage($('.showcase-locations .slide-content .card-header'));
            };

            if ( matchMedia('screen and (min-width: 768px)').matches ) {
                t1.utilities.ratioBkgImage($('.speakers .card-header'));
                t1.utilities.ratioBkgImage($('.speakers-secondary .card-header'));
            };
        }, 500);
            
    },
    resize: () => {
        t1.equalHeightList(); 
        t1.locationsMobile();
        
    },
    equalHeightList: () => {
        t1.utilities.equalHeights('.speakers-secondary', 'span.h3');
        t1.utilities.equalHeights('.speakers-secondary', 'p.card-text');

        // t1.utilities.ratioBkgImage($('.speakers .card-header'));
        // t1.utilities.ratioBkgImage($('.speakers-secondary .card-header'));
        // t1.utilities.ratioBkgImage($('.showcase-locations .slide-content .card-header'));
        
        if ( matchMedia('screen and (min-width: 768.8px)').matches ) {
            t1.utilities.equalHeights('.speakers', '.card-body');
            t1.utilities.equalHeights('.speakers', 'p.card-text');
            t1.utilities.equalHeightsMin('#Agenda', '.flickity-carousel .card-body');
        }
        
        // t1.utilities.equalHeights($('.speakers-secondary'), 'span.h3');
        // t1.utilities.equalHeights($('.speakers-secondary'), 'p.card-text');


        t1.utilities.equalHeights($('.showcase-locations .slide-content'), '.card-text');
        
    },
    resizeImages: () => {

    },
    locationsMobile: () => {
        let showCaseLocationOptions = {
            cellAlign: 'left',
            wrapAround: false,
            autoPlay: false,
            imagesLoaded: true,
            initialIndex: '0',
            draggable: true,
            setGallerySize: true,
            prevNextButtons: false,
            adaptiveHeight: true,
            percentPosition: false,
            pageDots: true
        };

        if ( matchMedia('screen and (max-width: 768px)').matches ) {
            showCaseLocationOptions.cellAlign = 'center';
            showCaseLocationOptions.wrapAround = true;
    
            let locationCarousel = $('.showcase-locations').flickity( showCaseLocationOptions );
            let locationCarouselData = locationCarousel.data('flickity');
            // $(speakerCarouselData.cells).each(function(i, v){
            //     let width = $(v.element).eq(0).width();
            //     let ratioHeight = parseFloat(width / 1.425);
            //     $(v.element).eq(0).find('.card-header').height(ratioHeight);
            // });
            t1.equalHeightList();
            t1.utilities.ratioBkgImage($('.showcase-locations .slide-content .card-header'));
            locationCarousel.flickity('resize');
            locationCarousel.flickity('select', 0);
        };
    
        if ( matchMedia('screen and (min-width: 768px)').matches ) {
            let locationCarousel = $('.showcase-locations').flickity( showCaseLocationOptions );
            let locationCarouselData = locationCarousel.data('flickity');
            // $(speakerCarouselData.cells).each(function(i, v){
            //     let width = $(v.element).eq(0).width();
            //     let ratioHeight = parseFloat(width / 1.425);
            //     $(v.element).eq(0).find('.card-header').height(ratioHeight);
            // });
            t1.equalHeightList();
            t1.utilities.ratioBkgImage($('.showcase-locations .slide-content .card-header'));
            locationCarousel.flickity('resize');
        };
    },
    loadCarousels: () => {
        if ( matchMedia('screen and (max-width: 767.8px)').matches ) {
            let speakerCarousel = 
                $('.speakers ').flickity({
                    cellSelector: '.slide-content',
                    cellAlign: 'center',
                    wrapAround: true,
                    autoPlay: false,
                    imagesLoaded: true,
                    initialIndex: '0',
                    draggable: true,
                    setGallerySize: true,
                    prevNextButtons: false,
                    adaptiveHeight: true,
                    percentPosition: false,
                    pageDots: true
                });
                // let speakerCarouselData = speakerCarousel.data('flickity');
                // $(speakerCarouselData.cells).each(function(i, v){
                   
                //     let width = $(v.element).eq(0).width();
                //     let ratioHeight = parseFloat(width / 1.45);
                //     console.log(ratioHeight)
                //      console.log(width)
                //     $(v.element).eq(0).find('.card-header').height(ratioHeight);
                // });
                t1.equalHeightList();
                t1.utilities.ratioBkgImage($('.speakers .slide-content .card-header'));
                speakerCarousel.flickity('resize');
                $('.Showcase .read-more').click(function(event){
                    $(this).parent().find('.card-text').toggleClass('expanded');
                    $(this).parent().outerHeight('auto');
                    speakerCarousel.flickity('resize');
                });
                speakerCarousel.flickity('select', 0);
        };
        let breakoutCarousel = $('.flickity-carousel[data-id="breaker-slider"]').flickity();
        breakoutCarousel.flickity('select', 0);
    }
};

t1.init();

// Banner Content 
    

    var isLateralNavAnimating = false;
    
    //open/close lateral navigation
    $('.cd-nav-trigger').on('click', function(event){
        event.preventDefault();
        //stop if nav animation is running 
        if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 
            
            $('body').toggleClass('navigation-is-open');
            $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                //animation is over
                isLateralNavAnimating = false;
            });
        }
    });
    
    // $('header').parallaxBackground();

    $('nav.top-nav').on("scroll", function(e) {
        console.log(e)
      if (this.scrollTop > 147) {
       console.log('past');
      }
    });

    // Top Navigation

    $('nav.top-nav .nav-link, .cd-primary-nav a').not($('.nav-link.dropdown-toggle, .cd-primary-nav .nav-link.dropdown-toggle')).click(function(event){
        event.preventDefault();
        let anchor = $(this).attr("href");
        $('nav.top-nav .nav-link').removeClass('active');
        $(this).addClass('active');
        $('html,body').animate({
            scrollTop: $(anchor).offset().top
        }, {
            complete: function(){
                    if($('#cd-nav').css('visibility') == 'visible') {
                        $('.cd-nav-trigger').click();
                    }
                    console.log($('#cd-nav').css('visibility') == 'visible')
                }
           });
        });

    $('nav.top-nav .dropdown-toggle').click(function(){
        $('.banner-content').toggleClass('z-index-sm');
    });

    $('.strip-divider.locations ul li a').click(function(event){
        event.preventDefault();
    })

    $('.Showcase .slide-content .register-for').click(function(event){
        let location = $(this).data().location;
        $('#register-form .modal-title').text(`Register for ${location}`);
    });

    // Variables
    let bodyClass = $('body').attr('class');
    if(bodyClass == 'Home' || bodyClass == 'Education' || bodyClass == 'Showcase Inside') {
        console.log(bodyClass)
        let $sliderNav = $('.slider-nav[data-item="Slider Navigation"]');
        //let $sliderNavItem = $('.slider-nav[data-item="Slider Navigation"]');

        //let $sliderNavColumn = $('.slider-nav-column[data-item="Slider Navigation"] .nav-listing');
        //let $sliderNavItemColumn = $('.slider-nav-column[data-item="Slider Navigation"] .nav-listing');
        
        let $slider = $('.flickity-carousel');
        let $sliderWithNav = $('.flickity-carousel[data-slider-nav="slider-nav"]');
        let $sliderData = $slider.data('flickity');

    

        let $sliderButtons = $slider.find('.flickity-prev-next-button');
        let $sliderActionButtons = $slider.find('button[data-button]');
        let $sliderDots = $slider.find('.flickity-page-dots li');
        let initialIndex = $sliderData.selectedIndex;

         // Flickity

        let flickitySliderNavToggle = (type, selectedIndex, sliderData, sliderID) => {
            let $slider = $(`.flickity-carousel[data-slider-id="${sliderID}"]`);
            let $sliderNav = $(`.slider-nav[data-slider-nav="${sliderID}"]`); 
            $sliderNav.find('a.nav-link').removeClass('active').eq(selectedIndex).addClass('active');
            $sliderNav.find('hr.nav-border').removeClass('active').eq(selectedIndex).addClass('active');
            $sliderNav.find('ul.nav-list').attr('data-scrollbar-x', type);
            $slider.find('button.flickity-button').attr('data-button', type);
            $slider.find('.flickity-page-dots li').attr('data-button', type);
        };
        
       
        $sliderNav.find('a.nav-link').click(function(event){
            event.preventDefault();
            let sliderID = $(this).data().sliderId;
            let type = $(this).data().type;
            let $slider = $(`.flickity-carousel[data-slider-id="${sliderID}"]`);
            let $sliderNav = $(`.slider-nav[data-slider-nav="${sliderID}"]`); 
            let selectedIndex = $sliderNav.find('a.nav-link').index($(this));
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            flickitySliderNavToggle(type, selectedIndex, null, sliderID);
            $slider.flickity('select', selectedIndex);
        });
        
        // $sliderNavItemColumn.find('a.nav-link').click(function(event){
        //     event.preventDefault();
        //     $(this).siblings().removeClass('active');
        //     $(this).addClass('active');
        //     let sliderID = $sliderNavItemColumn.offsetParent().data().sliderId;
        //     let selectedIndex = $sliderNavItemColumn.find('a.nav-link').index($(this));
        //     let type =  $sliderNavItemColumn.find('a.nav-link').eq(selectedIndex).data().type;
        //     flickitySliderNavToggle(type, selectedIndex, $sliderData);
        //     $(`.flickity-carousel[data-slider-id="${sliderID}"]`).flickity('select', selectedIndex);
        // });

        $sliderButtons.on('click', function(){
            let sliderIndex = $sliderData.selectedIndex;
            let type = $sliderNavItem.find('a.nav-link').eq(sliderIndex).data().type;
            flickitySliderNavToggle(type, sliderIndex, $sliderData);
            $slider.flickity('select', sliderIndex);
        });
        
        // $slider.on('select.flickity', function(){
        //     let $currentFlickityData = $(this).data('flickity');
        //     let sliderIndex = $currentFlickityData.selectedIndex;
        //     let sliderID = $currentFlickityData.element.dataset.sliderId;
            
        //     if($(`.slider-nav[data-slider-nav="${sliderID}"]`)) {
        //         let $sliderNav = $(`.slider-nav[data-slider-nav="${sliderID}"]`);
        //         let type = $sliderNav.find('a.nav-link').eq(sliderIndex).data().type;
        //         flickitySliderNavToggle(type, sliderIndex, null, sliderID);
        //     };
        // });
        



        $sliderActionButtons.on('click', function(){
            let data = $(this).data();
            window.location.href = `${data.url}`;
        });  

        // $sliderSecondaryWithNav.hover(function(){
        //     $sliderButtons.fadeToggle('slow');
          
        // });
        // Init with selected slide
        $sliderNav.find('a.nav-link').eq(initialIndex).click();
    };
    
    $('.nav-list[data-slider-nav="more-info"]').flickity({
        asNavFor: '.Showcase.Inside .flickity-carousel.tertiary',
        contain: true,
        pageDots: false,
        cellSelector: '.nav-link',
        adaptiveHeight: false,
        cellAlign: 'left',
        prevNextButtons: false
    });
    
    $('.nav-list[data-slider-nav="industries"]').flickity({
        asNavFor: '.Home .flickity-carousel.secondary',
        contain: true,
        pageDots: false,
        cellSelector: '.nav-item',
        adaptiveHeight: false,
        cellAlign: 'center',
        prevNextButtons: false
    });

    // let $sliderNavData = $sliderNav.data('flickity');
    // Background Images

    // Flickity with collapsable dropdown
    let initialCardHeight;
    let initialViewPortHeight;

    $('.toggle-arrow[aria-expanded="false"]').click(function(){
        let data = $(this).data().target.slice(1);
        let id = $(this).data().carousel;
        let $this = $(this);
        let cardContainer = $(`.card[data-id="${data}"]`);
        let cardBody = cardContainer.find('.card-body');
        let flickityInstance = $(`.flickity-carousel[data-carousel="${id}"]`).flickity();
        let flickityViewPort = $(`.flickity-carousel[data-carousel="${id}"] .flickity-viewport`);
        let agendaContainer = $(`.card[data-id="${data}"] .agenda-content p`);
        let expanded = $(cardContainer).attr('data-expanded');
        let previousExpanded = flickityViewPort.hasClass('expanded');
        let flickityData = flickityInstance.data('flickity');
        let currentIndex = flickityData.selectedIndex;
        if(expanded == 'false'){
            cardContainer.attr('data-expanded', 'true');
           
            flickityViewPort.addClass('expanded');
            $(agendaContainer).animate({
                height: agendaContainer[0].scrollHeight,
                opacity: 1
            });
            
        } else if(expanded == 'true') {
            cardContainer.attr('data-expanded', 'false');
            $(agendaContainer).animate({
                height: 0,
                opacity: 0
            });

        };

       let expandedCards = flickityViewPort.find('.card[data-expanded="true"]').length;

        if(expandedCards == '1' && previousExpanded == false) {
            $(flickityViewPort).animate({
                height: parseFloat(agendaContainer[0].scrollHeight + flickityViewPort.height())
            });
        };

       if(expandedCards == '0') {
            $(flickityViewPort).removeClass('expanded');
            $(flickityViewPort).animate({
                height: parseFloat(flickityViewPort.height() - agendaContainer[0].scrollHeight)
            });
        }
        $(this).toggleClass('expanded');

        flickityInstance.on('change.flickity', function(){
            console.log('changed');
            $(flickityViewPort).removeClass('expanded');
            cardContainer.attr('data-expanded', 'false');
            $(agendaContainer).animate({
                height: 0,
                opacity: 0
            });
            $this.removeClass('expanded');
        });

        flickityInstance.on( 'settle.flickity', function( event, index ) {
            if(currentIndex == index) {
                flickityInstance.flickity('resize');
            } 
        });
    });

    $('.main-hall-collapse').click(function(){
        $('.main-hall-agenda').fadeToggle();
        // $(this).toggleClass('fa-times fa-chevron-up');
    });

    $('.breakouts-collapse').click(function(){
        $('.breakouts-collapse').fadeToggle();
        // $(this).toggleClass('fa-times fa-chevron-up');
    });
    // $('.flickity-carousel[data-id="breaker-slider"]').flickity('select', '0');


    $('.flickity-carousel[data-id="breaker-slider"]').on('select.flickity', function() {
        let $currentFlickityData = $(this).data('flickity');
        let sliderIndex = $currentFlickityData.selectedIndex;
        let sliderID = $currentFlickityData.element.dataset.sliderId;
        let type = $currentFlickityData.selectedCell.element.dataset.type;
        let selectedSlideID = $currentFlickityData.selectedCell.element.dataset.id;
       
        // $($currentFlickityData.selectedElement).find('.toggle-arrow').click();
        $(`.flickity-carousel[data-slider-id="${sliderID}"]`).find('.flickity-page-dots li.dot.is-selected').attr('data-button', type);
    });
    
    

    let resizeStripLabels = (stripA, stripB) => {
        let width = $(stripA).outerWidth();
        let height = $(stripA).outerHeight();
        $(stripB).width(width);
        $(stripB).height(height);
    };

    resizeStripLabels($('.our-customers .strip-label'), $('.industry-summary .strip-label'));
    // Home Banner Overlay
    
    let overLayBanner = (selector) => {
        setTimeout(() => {
            //$(selector).find('.hero-overlay').width($(selector).width());
            $(selector).find('.hero-overlay').height($(selector).outerHeight());
        }, 100);
    };
    
    // $('header.primary-hero').imagesLoaded( { background: true }, function() {
    //     //resizeBKG($('.primary-hero'));
    //     //overLayBanner($('.primary-hero'));
    // });

    // $('body.Home section.secondary-hero[data-page="home"]').imagesLoaded( { background: true }, function() {
    //     $(this.elements).find('.flickity-viewport').attr('data-ratio', '2.14');
    //     // resizeBKG($(this.elements).find('.flickity-viewport'));
    //     //resizeStrip();
    // });
    
    $('body.Home section.tertiary-hero, body.Education section.tertiary-hero').imagesLoaded( { background: true }, function() {
        overLayBanner($('.tertiary-hero'));
        // resizeBKG($('[data-ratio="2.14"]'));
    });
    

    $(window).resize(function(){
         overLayBanner($('.primary-hero'));
         
         overLayBanner($('.secondary-hero'));
         overLayBanner($('.tertiary-hero'));
         // overLayBanner($('section'));
        // resizeBKG($('[data-ratio="2.14"], [data-ratio="2.45"], [data-ratio="1.93"]'));
         //resizeIMG($('[data-ratio="1.93"]'));
         // resizeIMG($('[data-ratio="1.93"], [data-ratio="0.95"], [data-ratio="1.425"]'));
         //resizeStrip();
         resizeStripLabels($('.our-customers .strip-label'), $('.industry-summary .strip-label'));

            
     
        // if ( matchMedia('screen and (min-width: 768px)').matches ) {
        //     $('.Showcase #Speakers .flickity-carousel-mobile').flickity('destroy');
        // };
        t1.resize();
         
        
    });
    
    // 

    
});