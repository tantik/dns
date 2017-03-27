$(document).ready(initPage);
function initPage(){
	mobileMenu();
	swiperGallery();
	$('.slide-block').slideBlock();
	$('.accordion-block').slideBlock({
		durationSlide:	300,
		mode: 'accordion',
		linkSlide:	'a.slide-link',
		slideBlock:	'div.slide-box',
		openClass: 'slide-active',
	});
}
function mobileMenu(){
	$('a.open-nav').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('nav-visible');
		$('nav').slideToggle();
	});
	if ($(window).width() <= 800) {
		$('.fader').click(function() {
			$('body').removeClass('nav-visible');
			$('nav').slideUp();
		});
	}
}
var allGallery = {}
function swiperGallery(){
	allGallery.swiperTop = new Swiper('.swiper-top .swiper-container', {
		pagination: '.swiper-top .swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-top .swiper-button-next',
		prevButton: '.swiper-top .swiper-button-prev',
		slidesPerView: 4,
		slidesPerColumn: 2,
		paginationClickable: true,
		spaceBetween: 12
	});
	if($(window).width() <= 800){
		allGallery.swiperTop.destroy(true,true);
		allGallery.swiperTop = new Swiper('.swiper-top .swiper-container', {
			pagination: '.swiper-top .swiper-pagination',
			slidesPerView: 3,
			paginationClickable: true,
			spaceBetween: 8,
			freeMode: true
		});
	}else{
		allGallery.swiperTop.destroy(true,true);
		allGallery.swiperTop = new Swiper('.swiper-top .swiper-container', {
			pagination: '.swiper-top .swiper-pagination',
			paginationClickable: true,
			nextButton: '.swiper-top .swiper-button-next',
			prevButton: '.swiper-top .swiper-button-prev',
			slidesPerView: 4,
			slidesPerColumn: 2,
			paginationClickable: true,
			spaceBetween: 12
		});
	}
	$(window).resize(function(){
		if(window.innerWidth <= 800){
			allGallery.swiperTop.destroy(true,true);
			allGallery.swiperTop = new Swiper('.swiper-top .swiper-container', {
				pagination: '.swiper-top .swiper-pagination',
				slidesPerView: 3,
				paginationClickable: true,
				spaceBetween: 8,
				freeMode: true
			});
		}else{
			allGallery.swiperTop.destroy(true,true);
			allGallery.swiperTop = new Swiper('.swiper-top .swiper-container', {
				pagination: '.swiper-top .swiper-pagination',
				paginationClickable: true,
				nextButton: '.swiper-top .swiper-button-next',
				prevButton: '.swiper-top .swiper-button-prev',
				slidesPerView: 4,
				slidesPerColumn: 2,
				paginationClickable: true,
				spaceBetween: 12
			});
		}
	})
}
/* Slide Block */
(function($) {
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: 'a.slide-link',
			slideBlock: 'div.slide-box',
			openClass: 'slide-active',
			durationSlide: 500,
			openComplete: false,
			closeComplete: false,
			mode:	false, //'accordion' - accordion mode or false - slide-block
			childSlide:	'accordion-child', //use only if mode: 'accordion'
		}, options);
		this.each(function() {
			if (options.mode === 'accordion') {
				var accordion = jQuery(this);
				var childSlide = accordion.find('> .' + options.childSlide, this);
				childSlide.each(function(){
					var $this = jQuery(this);
					if (!$this.is('.' + options.openClass)) {
						$this.children(options.slideBlock).css('display','none');
					}
				});
				childSlide.each(function(){
					var $this = jQuery(this);
					var link = $(options.linkSlide, this).eq(0);
					link.click(function(){
						var that = $(this);
						if (that.closest(childSlide).is('.'+options.openClass)) {
							that.closest(childSlide).removeClass(options.openClass);
							that.closest(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
						} else {
							that.closest(accordion).find(childSlide).removeClass(options.openClass);
							that.closest(accordion).find(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});

							that.parent(childSlide).parent().addClass(options.openClass);
							that.parent(childSlide).parent().find('> ' + options.slideBlock).slideDown(durationSlide, function(){
								$('body,html').animate({scrollTop:that.offset().top},800);
								if(typeof( options.openComplete) == 'function') options.openComplete(this);
							});

						}
						return false;
					});
				});
			} else {
				var $this = jQuery(this);
				var link = $(options.linkSlide, this).eq(0);
				var slideBlock = $(options.slideBlock, this).eq(0);
				var openClass = options.openClass;
				var durationSlide = options.durationSlide;

				if (!$this.is('.'+openClass)) {
					$this.find(slideBlock).css('display','none');
				}
				link.click(function(){
					if ($this.is('.'+ openClass)) {
						$this.removeClass(openClass);
						$this.find(slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
					} else {
						$this.addClass(openClass);
						$this.find(slideBlock).slideDown(durationSlide, function(){if(typeof( options.openComplete) == 'function') options.openComplete(this)});
					}
					return false;
				});
			}
		});
		return this;
	};
})(jQuery);