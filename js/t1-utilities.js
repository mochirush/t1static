t1.utilities = {
	equalHeights: (parent, child) => {
		let nodes = $(parent).find(child);
		let tallestHeight = [];
		nodes.each(function(){
			//$(this).height('auto');
	        let currentHeight = $(this).outerHeight();
	        tallestHeight.push(currentHeight);
	    });

	    let height = Math.max.apply(Math, tallestHeight);
		nodes.each(function(){
			$(this).outerHeight(height);
		});
	},
	equalHeightsMin: (parent, child) => {
		let nodes = $(parent).find(child);
		let tallestHeight = [];
		nodes.each(function(){
	        let currentHeight = $(this).outerHeight();
	        tallestHeight.push(currentHeight);
	    });

	    let height = Math.max.apply(Math, tallestHeight);
		nodes.each(function(){
			$(this).css({
				'minHeight': height
			});
		});
	},
	equalHeightsSelect: (parent, selector, child) => {
		let nodes = $(parent).find(child);
		let tallestHeight = $(selector).outerHeight();
		nodes.each(function(){
	        $(this).outerHeight(tallestHeight);
	    });
	},
	overlap: (parent, topLayer, layers) => {
		$(topLayer).addClass('position-absolute');
		t1.utilities.equalHeights(parent, layers);
	},
	ratioBkgImage: (selector) => {
		let windowWidth = $(window).width();
		$(selector).each(function(i, v){
			let width = $(v).width();
			let ratio = $(this).data().ratio;
			if(windowWidth < 992 && ratio == '1.95') {
				ratio = '0.95'
			};
			let height = parseFloat(width / ratio);
			$(v).outerHeight(height);
			
		});
	},
	heroOverLay: (selector) => {
		let height = $(selector).outerHeight();
		let overlay = $(selector).find('.hero-overlay');
		overlay.height(height);
	},
	bannerContent: () => {
        let headerHeight = $('header').outerHeight();
        let topNavBottomCoord = parseFloat($('.top-nav').position().top + $('.top-nav').outerHeight());
        let bannerContentHeight = parseFloat(headerHeight - topNavBottomCoord);
        $('.banner-content').height(bannerContentHeight);
        console.log('here')
	 }
};

