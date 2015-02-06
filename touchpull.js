/*!
* jquery.touchpull.js 201502*pike
*
* $('.content').css('-webkit-overflow-scrolling','touch').touchpull();
*
*/
(function( $ ){

	$.fn.touchpull = function( options ) {
	
		var settings = {
		
		}
		settings = $.extend(settings,options);
		
		return this.each(function() {
			
			if (!('ontouchstart' in window)) {
				if (window.console) console.log('not a touch device');
				return;
			}
			
			var $this = $(this);
			
			$this.on('touchmove', function (ev) {
				if ($this.scrollTop()<0) {
					$this.data('pulling',true);
				} else {
					$this.data('pulling',false);
				}
				if (window.console) console.log($this.scrollTop()+' '+$this.data('pulling'));
			}).on('touchend', function(ev) {
			
				if ($this.data('pulling')) {
					$this.trigger('touchpull');
					if (window.console) console.log('trigger touchpull');
				}
				$this.data('pulling',false);
			});
		});
	}
})( jQuery );