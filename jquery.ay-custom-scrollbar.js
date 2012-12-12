/**
 * jQuery custom-scrollbar v0.0.6
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
	$("<style type=\"text/css\"> body.ay-custom-scrollbar { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } </style>").appendTo('head');
	
	$.fn.ayCustomScrollbar	= function(sl)
	{	
		this.each(function(){
			var sl	= $.extend({
				wrapper: $(this).find('.wrapper'),
				scrollbar: $(this).find('.scrollbar'),
				handle: $(this).find('.handle')
			}, sl);
			
			if(!sl.wrapper.length || !sl.scrollbar.length || !sl.handle.length)
			{
				throw 'Not all selector references exist.';
			}
			
			var handle_height		= sl.handle.height(),
				scrollbar_height	= sl.scrollbar.height(),
				content				= sl.wrapper.find('>').eq(0);
				
			var content_height;
			var	ratio;
			var disabled;
			
			/**
			 * This event needs to be triggered when the scrollable content is modified.
			 */
			content.on('ay-change', function(){
				content_height	= content.height()-scrollbar_height;
				ratio			= (scrollbar_height-handle_height)/content_height;
			
				if(!isFinite(ratio) || ratio < 0)
				{
					sl.scrollbar.addClass('disabled');
					
					disabled	= true;
				}
				else
				{
					sl.scrollbar.removeClass('disabled');
					
					disabled	= false;
				}
			}).trigger('ay-change');
			
			var mousedown;
			
			sl.wrapper.on('scroll', function(e){
				if(mousedown)
				{
					return;
				}
			
				var offset	= $(this).scrollTop();
				
				handle_position	= ratio*offset;
				
				sl.handle.css({top: handle_position});
			});
			
			var handle_position		= 0,
				last_valid_position	= 0;
			var top;
			var client_y;
			
			var mousemove_event		= function(e){
				var move	= handle_position+e.clientY-client_y;
					
				if(move <= 0)
				{
					top	= 0;
				}
				else if(move >= scrollbar_height-handle_height)
				{
					top	= scrollbar_height-handle_height;
				}
				else
				{
					top	= move;
				}
				
				sl.wrapper.scrollTop(top/ratio);
				sl.handle.css({top: top});
			};
			
			var body = $('body');
			
			sl.handle.on('mousedown', function(e){
				
				if(disabled)
				{
					return;
				}
				
				body.addClass('ay-custom-scrollbar');
				
				mousedown	= true;
				
				$(document).on('mouseup', function(e){
					body.removeClass('ay-custom-scrollbar');
				
					$(document).off('mousemove', mousemove_event);
					
					handle_position	= top;
					mousedown		= false;
				});
				
				client_y		= e.clientY;
				
				$(document).on('mousemove', mousemove_event);				
			});
		});
	};
})($)