/**
 * jQuery custom-scrollbar v0.0.1 (2012 SEP 11)
 * https://github.com/anuary/jquery-custom-scrollbar
 *
 * Licensed under the BSD.
 * https://github.com/anuary/jquery-custom-scrollbar/blob/master/LICENSE
 *
 * Author: Gajus Kuizinas <g.kuizinas@anuary.com>
 */
(function($){
	$.fn.ayCustomScrollbar	= function(options)
	{
		this.each(function(){
			var settings	= $.extend({
				sl:
				{
					wrapper: $(this).find('.wrapper'),
					scrollbar: $(this).find('.scrollbar'),
					handle: $(this).find('.handle')
				}
			}, options);
			
			var sl		= settings.sl;
			
			if(!sl.wrapper.length || !sl.scrollbar.length || !sl.handle.length)
			{
				throw 'Not all selectors reference exsting elements.';
			}
			
			var handle_height		= sl.handle.height();
			var scrollbar_height	= sl.scrollbar.height();
			var area_height			= sl.wrapper.find('>').eq(0).height()-scrollbar_height;
			
			var ratio	= (scrollbar_height-handle_height)/area_height;
			
			var mousedown;
			
			sl.wrapper.on('scroll', function(e){
				if(mousedown)
				{
					return;
				}
			
				var offset	= $(this).scrollTop();
				
				handle_position	= ratio*offset;
				
				sl.handle.css({top: ratio*offset});
			});
			
			var handle_position		= 0;
			var last_valid_position	= 0;
			var top;
			
			sl.handle.on('mousedown', function(e){
				
				e.preventDefault();
				
				if(!mousedown)
				{
					mousedown	= true;
					
					$(window).on('mouseup', function(e){
			
						$(window).off('mousemove');
						
						handle_position	= top;
						mousedown		= false;
					});
				}
				
				var client_y		= e.clientY;
				
				$(window).on('mousemove', function(e){
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
				});				
			});
		});
	};
})($)
