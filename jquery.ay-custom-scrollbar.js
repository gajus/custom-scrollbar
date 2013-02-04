/**
 * jQuery custom-scrollbar v0.1.3
 * https://github.com/gajus/custom-scrollbar
 *
 * Licensed under the BSD.
 * https://github.com/gajus/custom-scrollbar/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 *
 * @note Only vertical scrollbar is supported.
 */
(function($){
	$("<style type=\"text/css\"> body.ay-custom-scrollbar-in-action { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } </style>").appendTo('head');
	
	$.ay = $.ay || {};
	
	$.ay.customScrollbar = function(options) {
		if (!options.scrollbar) {
			throw 'Missing scrollbar selector.';
		} else if (!options.container) {
			throw 'Missing container selector.';
		}
		
		var handle_position = 0,
			top,
			client_y,
			mousedown,
			sl,
			handle_height,
			scrollbar_height,
			content,
			ratio,
			disabled,
			mousemoveEvent,
			body = $('body');
		
		if (!options.onScroll) {
			options.onScroll = function () {};
		}
		
		sl = {
			wrapper: options.container.find('.overflow-scroll'),
			scrollbar: options.scrollbar,
			handle: options.scrollbar.find('.handle'),
		};
		
		handle_height = sl.handle.height();
		scrollbar_height = sl.scrollbar.height();
		content = sl.wrapper.find('>');
				
		options.container.on('ay-content-change', function () {		
			var real_scrollbar_height = scrollbar_height-handle_height,
				scrollable_height = content.height()-sl.wrapper.height();
			
			ratio = scrollable_height/real_scrollbar_height;
			
			if (!isFinite(ratio) || ratio < 0) {
				sl.scrollbar.addClass('disabled');
				disabled = true;
			} else {
				sl.scrollbar.removeClass('disabled');
				disabled = false;
			}
		}).trigger('ay-content-change');
		
		sl.wrapper.on('scroll', function(e){
			var offset	= $(this).scrollTop();
			
			options.onScroll(offset);
		
			if(mousedown) {
				return;
			}
			
			handle_position	= offset/ratio;
			
			sl.handle.css({top: handle_position});
		});
		
		mousemoveEvent = function (e) {		
			var move = handle_position+e.clientY-client_y,
				scrollTop;
				
			if (move <= 0) {
				top	= 0;
			} else if(move >= scrollbar_height-handle_height) {
				top	= scrollbar_height-handle_height;
			} else {
				top	= move;
			}
			
			scrollTop = top*ratio;
			
			options.onScroll(scrollTop);
			
			sl.wrapper.scrollTop(scrollTop);
			sl.handle.css({top: top});
		};
		
		sl.handle.on('mousedown', function (e) {
			if (disabled) {
				return;
			}
			
			body.addClass('ay-custom-scrollbar-in-action');
			
			mousedown	= true;
			
			$(document).on('mouseup', function(e){
				body.removeClass('ay-custom-scrollbar-in-action');
			
				$(document).off('mousemove', mousemoveEvent);
				
				handle_position	= top;
				mousedown		= false;
			});
			
			client_y		= e.clientY;
			
			$(document).on('mousemove', mousemoveEvent);				
		});
	};
})($)