(function( $ ){
    // Methods
    var m = {
        init: function(slide,o){
            clearTimeout(o.timer);
            o.slides = slide.children();
            o.active = o.slides.length-1;
            o.start(o.slides);
            // NAV
            var nav = $('<div class="slidezone-nav">').appendTo(slide);            
            // INDEX
            var index = $('<div class="slidezone-index">').appendTo(nav);
            // PREV
            $('<a class="slidezone-prev">')
            .click(function(){
                m.prev(slide,o);
            }).appendTo(index);
            // SLIDES
            for ( var i = 0; i <= o.active;  i++ ) {
                $('<a class="index'+i+'" data-id="'+i+'">')
                .click(function(){
                    clearTimeout(o.timer);
                    o.slideOut(slide,$(o.slides[o.active]));
                    o.active = $(this).data('id');
                    o.slideIn(slide,$(o.slides[o.active]));
                    slide.find('.active').removeClass('active');
                    slide.find('.index'+o.active).addClass('active');
                    o.timer = setTimeout(function () {
                        m.next(slide,o);
                    },o.delay);
                }).appendTo(index);
            }
            o.active = 0;
            // NEXT
            $('<a class="slidezone-next">')
            .click(function(){
                m.next(slide,o);
            }).appendTo(index);
            // KEY CONTROL
            $(document).keydown(function(e) {
                if ( e.keyCode == 37 ) { 
                    m.prev(slide,o);
                } else if ( e.keyCode == 39 ) { 
                    m.next(slide,o);
                }
            });
            // GET FIRST
            o.slideIn(slide,$(o.slides[o.active]));
            slide.find('.active').removeClass('active');
            slide.find('.index'+o.active).addClass('active');
            o.timer = setTimeout(function () {
                m.next(slide,o);
            },o.delay);
            return false;
        },
        next: function(slide,o,c){
            clearTimeout(o.timer);
            o.slideOut(slide,$(o.slides[o.active]),c);
            o.active = (o.active+1) % o.slides.length;
            o.slideIn(slide,$(o.slides[o.active]),c);
            slide.find('.active').removeClass('active');
            slide.find('.index'+o.active).addClass('active');
            o.timer = setTimeout(function () {
                m.next(slide,o);
            },o.delay);
        },
        prev: function(slide,o,c){
            clearTimeout(o.timer);
            o.slideOut(slide,$(o.slides[o.active]),c);
            o.active = ((o.active-1) < 0 ? o.slides.length+(o.active-1) : (o.active-1)) % o.slides.length;
            o.slideIn(slide,$(o.slides[o.active]),c);
            slide.find('.active').removeClass('active');
            slide.find('.index'+o.active).addClass('active');
            o.timer = setTimeout(function () {
                m.next(slide,o);
            },o.delay);
        },
        start: function(slides){
            slides.css({
                opacity:'0'
            });
        },  
        slideIn: function(slide,active){
            active.animate({
                opacity:'1'
            }, 600);
        },     
        slideOut: function(slide,active){
            active.animate({
                opacity:'0'
            }, 1200);
        }
    };
    $.fn.slidezone = function(o) {
        // Options
        o = $.extend({
            delay     : 3000,
            start     : m.start,
            slideIn   : m.slideIn,
            slideOut  : m.slideOut,
            slides    : [],
            timer     : null,
            active    : 0
        }, o);
        return m.init($(this),o);
    };
})( jQuery );