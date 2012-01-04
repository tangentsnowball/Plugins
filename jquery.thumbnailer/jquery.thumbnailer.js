//Generic thumbnail jquery plugin
//requires: jquery >= 1.4.4 and plugin stylesheet
//by Andy Sellick, Tangent Snowball http://www.tangentsnowball.com/
(function($){
    $.fn.thumbnailer = function(options) {

    //options
    var defaults = {
        zoom: 0,
        captions: 0,
        scrollThumbs: 1
    };
    var options = $.extend(defaults, options);

    /* functions here */
    function scrollthumbs(thisel,goleft,obj,blockwidth){
        var move = 0;
        var mylist = obj.find('.thumbwrapper ul');
        var parentwidth = obj.find('.thumbwrapper').width();
        var mypos = $(mylist).position();
        var mywidth = $(mylist).width();

        //left arrow click function, ironically moves list right
        if(goleft){
            move = mypos.left + (blockwidth * options.scrollThumbs);
            if(move <= 0){
                $(mylist).animate({
                    left:move
                },300,function(){
                    if(move == 0) {
                        thisel.removeClass('active');
                    }
                    else {
                        thisel.addClass('active');
                    }
                });
                obj.find('.rightnavclick').addClass('active');
            }
        }
        //right arrow click function
        else {
            result = (mypos.left + mywidth) - (parentwidth);
            if(result >= 0){
                var goleft = mypos.left - (blockwidth * options.scrollThumbs);
                $(mylist).animate({
                    left:goleft
                },300,function(){
                    if(result - blockwidth < 0){
                        thisel.removeClass('active');
                    }
                    else {
                        thisel.addClass('active');
                    }
                });
                obj.find('.leftnavclick').addClass('active');
            }
        }
        return false;
    }
    //position both the zoom lens and the zoomed image based on the current mouse position
    //this may not be particularly efficient yet
    function positionZoomer(thisel,e){
        var offsets = thisel.parent().offset();
        var zoomlens = thisel.find('.zoomlens');

        var zoomlenstop = Math.min(Math.max(e.pageY - offsets.top - (zoomlens.height() / 2),0),(thisel.height() - zoomlens.height() - 2));
        var zoomlensleft = Math.min(Math.max(e.pageX - offsets.left - (zoomlens.width() / 2),0),(thisel.width() - zoomlens.width() - 2));

        zoomlens.css({
            'top': zoomlenstop,
            'left': zoomlensleft
        });
        var zoomer = thisel.find('.zoomer');
        var zoomimg = zoomer.find('img');

        var zoomwidth = zoomimg.width();
        var zoomheight = zoomimg.height();
        var origimg = thisel.find('img');
        var origwidth = origimg.width();
        var origheight = origimg.height();
        //work out the percentage size diff between product image and full size image
        var percentw = (origwidth / zoomwidth) * 100;
        var percenth = (origheight / zoomheight) * 100;

        //now multiply up the zoom position based on the above
        var zoomimgtop = (zoomlenstop / percentw) * 100;
        var zoomimgleft = (zoomlensleft / percenth) * 100;
        
        //now work out the automatically applied margin and adjust accordingly
        var margintop = parseInt(origimg.css('margin-top'));
        var marginleft = parseInt(origimg.css('margin-left'));
        margintop = (margintop / percenth) * 100;
        marginleft = (marginleft / percentw) * 100;
        zoomimgtop = zoomimgtop - margintop;
        zoomimgleft = zoomimgleft - marginleft;

        zoomimg.css({
            'top': -zoomimgtop,
            'left': -zoomimgleft
        });
    }

    /* generic stuff here */
    return this.each(function() {
        var obj = $(this);

        var margintop = 0;
        var marginleft = 0;
        var blockwidth = 0;
        var blockheight = 0;
        var imagewidth = 0;
        var imageheight = 0;

        var imagethumbs = obj.find('.imagethumbs');
        var imagethumbsli = obj.find('.imagethumbs ul li');
        var imagethumbslilength = imagethumbsli.length;
        //if there are multiple thumbnails then do clever stuff
        if(imagethumbslilength){
            var numblocks = imagethumbsli.length; //find number of list items
            //find the thumbs ul and wrap it in a specific div, add some styles and add the navigation controls
            var $thumbwrapper = $('<div/>',{ 'class': 'thumbwrapper' });
            var $leftnav = $('<div/>',{
                'class': 'leftnavclick nav'
            }).html('<span></span>');
            var $rightnav = $('<div/>',{
                'class': 'rightnavclick nav active'
            }).html('<span></span>');
            var $imagethumbscontents = imagethumbs.html();
            $thumbwrapper.append($imagethumbscontents);
            var thumbwrapperul = obj.find('.thumbwrapper ul');

            //work out the space needed to contain the thumbnails
            imagethumbsli.each(function(index,element){
                var thisel = $(this);
                //find the size of the largest image
                var thisimg = thisel.find('img').attr('src');
                $temp = $('<img/>',{
                    'src': thisimg + "?" + new Date().getTime() //needed to counter ie's image caching
                }).load(function(){
                    //find dimensions of largest image
                    imagewidth = Math.max(imagewidth, parseFloat(this.width));
                    imageheight = Math.max(imageheight, parseFloat(this.height));
                    obj.find('.thumbwrapper a').css({
                        'width':imagewidth,
                        'height':imageheight
                    });
                    //find the dimensions of the largest li
                    blockwidth = Math.max(blockwidth, parseFloat(thisel.outerWidth(true)));
                    blockheight = Math.max(blockheight, parseFloat(thisel.outerHeight(true)));

                    //on the last element, do the rest of the stuff
                    if(index == imagethumbslilength - 1){
                        $rightnav.css('top', imageheight / 2);
                        $leftnav.css('top', imageheight / 2);
                        //now wrap the thumbnails in something we can position absolutely
                        var wrapperwidth = blockwidth * numblocks;
                        //only add the navigation controls if the total width of the thumbnails exceeds the parent width
                        imagethumbs.html('');
                        if(wrapperwidth > (obj.width() + 20)){
                            imagethumbs.append($thumbwrapper);
                            imagethumbs.append($leftnav).append($rightnav);
                            $thumbwrapper.css('margin','0px 26px');
                        }
                        else {
                            imagethumbs.append($thumbwrapper);
                        }
                        //set the parent ul to the width required, otherwise wrapping of floated elements occurs and breaks everything
                        obj.find('.thumbwrapper ul').width(wrapperwidth);
                        $thumbwrapper.height(imageheight + 20); //would set this to blockheight but there's an odd bug where it comes out too big

                        imagethumbs.find('a').each(function(){
                            var thisimg = $(this).find('img');
                            //centre align the thumbnail, first work out left margin
                            var marginleft = 0;
                            var thumbwidth = thisimg.width();
                            if(thumbwidth < imagewidth){
                                marginleft = (imagewidth - thumbwidth) / 2;
                            }
                            //now top margin
                            var margintop = 0;
                            var thumbheight = thisimg.height();
                            if(thumbheight < imageheight){
                                margintop = (imageheight - thumbheight) / 2;
                            }

                            thisimg.css({
                                'margin-left':marginleft,
                                'margin-top':margintop
                            });
                            $(this).height(imageheight).width(imagewidth);
                        });
                        //finally, add the active class to the first thumbnail
                        obj.find('.thumbwrapper ul li:first').addClass('active');
                    }
                }).appendTo($(this));
            });

            var imagemain = obj.find('.imagemain');
            obj.css({
                'width':275
            });
            var containerwidth = imagemain.width();
            var containerheight = imagemain.height();

            //centre align the initial main image
            //webkit browsers have problems with images and knowing their dimensions prior to them being loaded
            //however it turns out they also have a problem when using 'back' as the image is already loaded/cached
            //put simply, this all works, but if you're in e.g. chrome and load this, go to another page, then
            //hit 'back', the code below doesn't fire UNLESS we do the slightly odd src attr swap below.
            var tempsrc = imagemain.find('img').attr('src');
            imagemain.find('img').attr("src",'').attr("src",tempsrc).load(function(data){
                if($(this).width() < containerwidth){
                    $(this).css('margin-left',(containerwidth - $(this).width()) / 2);
                }
                if($(this).height() < containerheight){
                    $(this).css('margin-top',(containerheight - $(this).height()) / 2);
                }
            });
            
            if(options.captions){
                var caption = $(this).find('img').attr('alt');
                $('<span/>',{
                    'class':'caption'
                }).html(caption).hide().appendTo(imagemain).fadeIn('500');
            }
        }

        //switch main image for thumbnail clicked
        $('.imagethumbs li').live('click', function(event){
            if(!$(this).hasClass('active')){
                var parentobj = $(this).parents('.thumbnailwrapper');
                var newzoomimage = $(this).find('a').get(0).href;
                var newimage = $(this).find('a').attr('rel');
                var imagewrapper = parentobj.find('.imagemain');
                var bigimage = imagewrapper.find('img');

                margintop = 0;
                marginleft = 0;

                //clear up the previous zoom
                imagewrapper.find('.zoomer').remove();
                imagewrapper.find('.zoomlens').remove();
                imagewrapper.attr('href',newzoomimage);

                //now centre the big image vertically and horizontally in the block if needed
                bigimage.attr("src",'').attr("src",newimage).load(function(){
                    if(bigimage.width() < containerwidth){
                        marginleft = (containerwidth - bigimage.width()) / 2;
                    }
                    else {
                        marginleft = 0;
                    }
                    if(bigimage.height() < containerheight){
                        margintop = (containerheight - bigimage.height()) / 2;
                    }
                    else {
                        margintop = 0;
                    }
                    bigimage.css({
                        'margin-top': margintop,
                        'margin-left': marginleft
                    });
                });
                parentobj.find('.imagethumbs li').removeClass('active').removeClass('arrow');
                $(this).addClass('active');
                $(this).addClass('arrow');

                if(options.captions){
                    var caption = $(this).find('img').attr('alt');
                    bigimage.attr('alt',caption);
                    parentobj.find('.caption').html(caption);
                }
            }
            $(this).find('a').blur();
            event.preventDefault();
        });

        obj.find('.leftnavclick.active').live('click', function(event){
            //need to disable the button while move happens as its possible to click quickly and foul it up
            $(this).removeClass('active');
            scrollthumbs($(this),1,obj,blockwidth);
            event.preventDefault();
        });

        obj.find('.rightnavclick.active').live('click',function(event){
            $(this).removeClass('active');
            scrollthumbs($(this),0,obj,blockwidth);
            event.preventDefault();
        });
        
        if(options.zoom){
            //do the zoom
            obj.find('.imagemain').hover(
                function(e){ //onmouseover
                    var thisel = $(this);
                    var zoomer = thisel.find('.zoomer');
                    //if the elements don't exist then create them
                    if(!zoomer.length){
                        var mainimage = thisel.find('img');
                        var zoomback = thisel.get(0).href;
                        if(zoomback){
                            $zoomdiv = $('<span/>',{
                                'class':'zoomer'
                            }).css({
                                'width': mainimage.width(),
                                'height': mainimage.height(),
                                'left': thisel.width() + 50,
                                'top': mainimage.css('margin-top')
                            }).appendTo(thisel);

                            var origwidth = mainimage.width();
                            var origheight = mainimage.height();
            
                            $zoomedimg = $('<img/>',{
                                'src':zoomback
                            }).hide().appendTo(thisel.find('.zoomer')).fadeIn('1000').load(function(){
                                var zoomwidth = $(this).width();
                                var zoomheight = $(this).height();
                                var percentw = (origwidth / zoomwidth) * 100; //the percentage size the regular image is of the zoomed, larger image
                                var percenth = (origheight / zoomheight) * 100;
                                $lens = $('<span/>',{
                                    'class':'zoomlens'
                                }).css({
                                    //set zoomlens to be the same percent size of the product image as the product image is of the zoomed image
                                    'width': (origwidth / 100) * percentw,
                                    'height': (origheight / 100) * percenth
                                }).hide().appendTo(thisel).fadeIn('600');
                                positionZoomer($(this),e);
                            });
                        }
                    }
                    //otherwise just find and show the existing elements
                    else {
                        $(this).find('.zoomer').stop(false,true).fadeIn('1000');
                        $(this).find('.zoomlens').stop(false,true).fadeIn('600');
                    }
                },
                function(){ //onmouseout
                    $(this).find('.zoomer').stop(false,true).fadeOut('500');
                    $(this).find('.zoomlens').stop(false,true).fadeOut('500');
                }
            );
    
            obj.find('.zoomer').live('hover',function(){
                $(this).parent().find('.zoomer').stop(false,true).fadeOut('500');
                $(this).parent().find('.zoomlens').stop(false,true).fadeOut('500');
            });
    
            obj.find('.imagemain').mousemove(function(e){
                positionZoomer($(this),e);
            });
        }

        obj.find('.imagemain').click(function(e){
            e.preventDefault();
        });

    });
    };
})(jQuery);