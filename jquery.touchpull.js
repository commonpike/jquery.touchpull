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
			treshold	: 200, // px to pull up before it awakes
			timeout		: 100  // desktop only: timeout to trigger scrollstop
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
				var st = $this.scrollTop();
				if (st<-settings.treshold) {
					$this.data('pulling',true);
				} else if (st>=0) {
					$this.data('pulling',false);
					triggered=false;
				}
				if (debug && window.console) console.log(st+' '+$this.data('pulling'));
			}).on('touchend', function(ev) {
				if ($this.data('pulling') && !triggered) {
					if (debug && window.console) console.log('trigger touchpull');
					$this.trigger('touchpull');
					triggered=true; // block triggering until were get back to 0
				}
				$this.data('pulling',false);
			});
			
			// desktop
			$this.on('scroll', function (ev) {
				var st = $this.scrollTop();
				clearTimeout(stoptimer);
				stoptimer = setTimeout(function() {
					$this.trigger('scrollstop');
				},settings.timeout);
				if (st<-settings.treshold) {
					$this.data('pulling',true);
				} else if (st>=0) {
					$this.data('pulling',false);
					triggered=false;
				}
				if (debug && window.console) console.log(st+' '+$this.data('pulling'));
			}).on('scrollstop', function(ev) {
				if ($this.data('pulling') && !triggered) {
					$this.trigger('touchpull');
					triggered=true; // block triggering until were get back to 0
					if (debug && window.console) console.log('trigger touchpull');
				}
				$this.data('pulling',false);
			})
			
			
		});
	}
})( jQuery );