Canvuz.Animation.Control = function() {								
	//CONTROLS	
	//////////////////////////////////////////////////////////////////////////////////////////////		
	//this function is binded to the play button and initiates the animation
	this.playEvent = function() {
		//unbind original click
		$(this.button).unbind('click');		
		
		//animate canvas
		Canvuz.canvas.animate();
				
		//change the button image but first we need to know if we are hiding other controls.. if so we need to fade the controls out first
		//need to move this function into the set buttons function on Canvuz.canvas.control
		setTimeout(function() {
			$(Canvuz.canvas.animation.control.button).attr('src', Canvuz.canvas.animation.control.stopsrc).attr('alt', 'Click to stop the slideshow').attr('title', 'Click to stop the slideshow');
		}, Canvuz.canvas.control.FADE_SPEED);
						
		//bind new events to stop the animation on next click		
		$(this.button).bind('click', function() {
			Canvuz.canvas.animation.control.stopEvent(this);
		});
	};
	
	//this function is binded to the stop button and stops the animation
	this.stopEvent = function() {		
		//unbind original click
		$(this.button).unbind('click');
		
		//stop the animation
		Canvuz.canvas.stopAnimation();
				
		//change the button image but first we need to know if we are hiding other controls.. if so we need to fade the controls out first				
		$(Canvuz.canvas.animation.control.button).attr('src', Canvuz.canvas.animation.control.playsrc).attr('alt', 'Click to play the slideshow').attr('title', 'Click to play the slideshow');		
								
		//bind new events to play the animation on next click		
		$(this.button).bind('click', function() {
			Canvuz.canvas.animation.control.playEvent(this);
		});
	};
	
	//bidn events to the button so it actually does something...
	this.bindButtonEvents = function() {		
		//play animation		
		this.button.bind('click', function() {
			if($(Canvuz.canvas.animation.control.button).attr('src') == Canvuz.canvas.animation.control.playsrc) {
				Canvuz.canvas.animation.control.playEvent();				
			} else if($(Canvuz.canvas.animation.control.button).attr('src') == Canvuz.canvas.animation.control.stopsrc) {
				Canvuz.canvas.animation.control.stopEvent();
			}
		}); 
		//animate fade up in opacity
		this.button.bind('mouseover', function() {
			Canvuz.canvas.animation.control.buttonOpacity = 1;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.animation.control.buttonOpacity}, Canvuz.canvas.animation.control.fadeSpeed);
		}); 
		//animate fade down in opacity
		this.button.bind('mouseleave', function() {
			Canvuz.canvas.animation.control.buttonOpacity = 0.4;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.animation.control.buttonOpacity}, Canvuz.canvas.animation.control.fadeSpeed);
		}); 
	};
	
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////		
	this.playsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/play_48.png';	
	this.stopsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/stop_48.png';	
	this.fadeSpeed = 500;
	
	//create play/stop button
	this.button = $('<img />').attr('src', this.playsrc).attr('class', 'button').attr('alt', 'Click to play the slideshow').attr('title', 'Click to play the slideshow');	
	this.buttonOpacity = $(this.button).css('opacity');
	//bind events to button
	this.bindButtonEvents();		
	
	//create div to contain all animation controls
	this.div = $('<div />').attr('class', 'control').append(this.button);	
		
	//append the control to the canvas
	$(Canvuz.canvas.control.div).append(this.div);
};

