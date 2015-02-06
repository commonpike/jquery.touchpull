/*!
* jquery.touchpull.js 201502*pike
*
* $('#content').css('-webkit-overflow-scrolling','touch').touchpull();
* $('#content').on('touchpull',function(ev) {
*		alert('you pulled me upwards!')
* });
*/
(function( $ ){

	$.fn.touchpull = function( options ) {
	
		var settings = {
		
		}
		settings = $.extend(settings,options);
		
		return this.each(function() {
			
			//if (!('ontouchstart' in window)) {
			//	if (window.console) console.log('not a touch device');
			//	return;
			//}
			
			var $this = $(this);
			var stoptimer = null;
			var triggered = false;
			var debug = false;
			
			// touch
			$this.on('touchmove', function (ev) {
				if ($this.scrollTop()<0) {
					$this.data('pulling',true);
				} else if ($this.scrollTop()>0) {
					$this.data('pulling',false);
				} else {
					$this.data('pulling',false);
					triggered=false;
				}
				if (debug && window.console) console.log($this.scrollTop()+' '+$this.data('pulling'));
			}).on('touchend', function(ev) {
				if ($this.data('pulling')) {
					if (debug && window.console) console.log('trigger touchpull');
					$this.trigger('touchpull');
					triggered=true;
				}
				$this.data('pulling',false);
			});
			
			// desktop
			$this.on('scroll', function (ev) {
				clearTimeout(stoptimer);
				stoptimer = setTimeout(function() {
					$this.trigger('scrollstop');
				},100);
				if ($this.scrollTop()<0) {
					$this.data('pulling',true);
				} else if ($this.scrollTop()>0) {
					$this.data('pulling',false);
				} else {
					$this.data('pulling',false);
					triggered=false;
				}
				if (window.console) console.log($this.scrollTop()+' '+$this.data('pulling'));
			}).on('scrollstop', function(ev) {
				if ($this.data('pulling') && !triggered) {
					$this.trigger('touchpull');
					triggered=true;
					if (window.console) console.log('trigger touchpull');
				}
				$this.data('pulling',false);
			})
			
			
		});
	}
})( jQuery );