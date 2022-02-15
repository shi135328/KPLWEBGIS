/*

jQuery Speedometer v1.0.3
by Jacob King
http://www.jacob-king.com/

Tested on IE7 and Firefox 3.6.3 with jQuery 1.4.2
***Requires jquery.jqcanvas-modified.js and excanvas-modified.js***



Usage: 
	$([selector]).speedometer([options object]);

Options:
	percentage: (float/int, default: 0) 
		Value to display on speedometer and digital readout. Can also be specified as the selector's innerHTML.
	scale: (float/int, default 100)
		The value considered to be 100% on the speedometer.
	limit: (float/int, default true)
		Specifies that the speedometer will "break" if the value is out of bounds.
	minimum: (float/int, default 0)
		The lowest value the needle can go without the glass cracking.
	maximum: (float/int, default 100)
		The highest value the needle can go without the glass cracking.
	animate: (boolean, default: true)
		Specifies that the speedometer needle will animate from current value to intended value.	
	suffix: (string, default ' %')
		A unit/string to display after the digital readout's value. Set to '' for none.
	
	thisCss: Default settings object for speedometer. Modifying this is not supported.
	
	digitalCss: Default settings object for digital readout. Modifying this is not supported.
	
*/
(function( $ ){
	$.fn.speedometer = function( options ){	
		/*
		 * A tad bit speedier, plus avoids possible confusion with other $(this)
		 * references.
		 */
		var $this = $(this);
		/* handle multiple selectors */
		if ($this.length > 1 ) {
			$this.each(function(){
				$(this).speedometer(options);				
			});
			return $this;
		}	
        //获取访问路径
		var location = (window.location+'').split('/');
		var basePath = location[0]+'//'+location[2]+'/'+location[3];
		
		var def = {
			percentage : $.trim($this.html()) || 0,
			scale: 216,
			limit: true,
			minimum: -15,
			maximum: 288,
			suffix: ' %',
			animate:true,
			thisCss: {
				position: 'relative', 
				width: '1024px',
				height: '600px',
				padding: '0px',
				border: '0px',
				fontFamily: 'Arial',
				fontWeight: '900',
				backgroundImage : "url('"+basePath+"/jsp/MeterCar/background.png')"		
			},
			digitalCss: {
				backgroundColor:'black',
				borderColor:'#555555 #999999 #999999 #555555',
				borderStyle:'solid',
				borderWidth:'2px',
				color:'white',
				fontSize:'16px',
				height:'20px',
				left:'72px',
				padding:'1px',
				position:'absolute',
				textAlign:'center',
				top:'65px',
				width:'60px',
				zIndex:'10',
				lineHeight:'20px',
				overflow:'hidden'
			}
		}
		$this.html('');		
		$this.css(def.thisCss);		
		$.extend(def, options);		
		/* out of range */
		if (def.limit && ( def.percentage > def.maximum || def.percentage < def.minimum ) ) {
			/* the glass cracks */
			$this.css('backgroundImage' , 'url("./background-broken.jpg")' );
		} else {
			/* call modified jqcanvas file to generate needle line */
			$this.jqcanvas (function (canvas,width,height ) {
				
				var ctx=canvas.getContext("2d");
				var xpos = canvas.width/2;
		        var ypos = canvas.height/2;
				var img=new Image();
				function animate(){ 	
					img.onload = function(){
					  ctx.drawImage(img, xpos - img.width / 2, ypos - img.height / 2);					 
					  ctx.save();
					  ctx.clearRect(0,0,1024,800);
					  ctx.translate(xpos, ypos);
					  ctx.rotate(i* Math.PI /180);
					  ctx.translate(-xpos, -ypos);
					  ctx.drawImage(img, xpos - img.width / 2, ypos - img.height / 2);
					  ctx.restore();	
					};
					img.src=basePath+"/jsp/MeterCar/zz.png";
					/* internally remember current needle value */
					$this.data('currentPercentage',i);					
					if ( i != def.percentage ) {					
						// properly handle fractions
						i += Math.abs( def.percentage - i ) < 1 ? def.percentage - i : def.increment;		
						setTimeout(function(){
							animate()
						},20);
					}
				}				
				
				/* Are we animating or just displaying the percentage? */
				if (def.animate) {
					var i = parseInt( $this.data('currentPercentage') ) || 0;
					def.increment = ( i < def.percentage ) ? 1 : -1;
				} else {
					var i = (def.percentage);
				}
				animate();					
			}, { verifySize: false, customClassName: '' } );
		}
		
		/* digital percentage displayed in middle of image */

		var digitalGauge = $( '<div></div>' );
		$this.append( digitalGauge );
		digitalGauge.css( def.digitalCss );
		digitalGauge.text( def.percentage);		
		return $this;
	}
})( jQuery )