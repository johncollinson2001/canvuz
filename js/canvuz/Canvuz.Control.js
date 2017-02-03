Canvuz.Control = function() {									
	//OTHER METHODS
	////////////////////////////////////////////////////////////////////////////////////////////				
	this.positionScroll = function() {
		//position the scroll controls
		var iconwidth = 64;
		var iconpadding = (($(Canvuz.canvas.elem).parent().width() / 100) * 2);
		var scrMiddle = ((Canvuz.canvas.viewwidth/2) / Canvuz.canvas.scrfactorx);
		var photoRadius = ((Canvuz.canvas.albums[Canvuz.canvas.currAlbum].photos[Canvuz.canvas.albums[Canvuz.canvas.currAlbum].currPhoto].width/2) / Canvuz.canvas.scrfactory);				
		var forwardButtonX = scrMiddle + photoRadius + iconpadding;
		var backButtonX = scrMiddle - photoRadius - iconpadding - iconwidth;
		var buttonY = ($(Canvuz.canvas.elem).parent().height() / 2) - iconwidth;
		this.forwardButton.css('left', forwardButtonX);
		this.backButton.css('left', backButtonX);
		this.forwardButton.css('top', buttonY);
		this.backButton.css('top', buttonY);
	};
	
	//CONTROLS
	////////////////////////////////////////////////////////////////////////////////////////////		
	//bind events to the extent button so it actually does something...
	this.bindextentButtonEvents = function() {
		//bind events on zoom to extent button
		//play animation		
		this.extentButton.bind('click', function() {
			Canvuz.canvas.unbindUI();	
			Canvuz.canvas.animateToExtent(Canvuz.canvas.ZOOM_SPEED, 0);				
			setTimeout(function() {Canvuz.canvas.bindUI();}, Canvuz.canvas.ZOOM_SPEED);			
		}); 
		//animate fade up in opacity
		this.extentButton.bind('mouseover', function() {
			Canvuz.canvas.control.extentButtonOpacity = 1;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.extentButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
		//animate fade down in opacity
		this.extentButton.bind('mouseleave', function() {
			Canvuz.canvas.control.extentButtonOpacity = 0.4;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.extentButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
	};
	
	//bind events to the extent button so it actually does something...
	this.bindzoomoutButtonEvents = function() {
		//bind events on zoom to extent button
		//play animation		
		this.zoomoutButton.bind('click', function() {
			if(Canvuz.canvas.zoomlevel==3) {									
				Canvuz.canvas.albums[Canvuz.canvas.currAlbum].animateTo(Canvuz.canvas.ZOOM_SPEED, 0);																			
			} else if(Canvuz.canvas.zoomlevel==2) {																			
				Canvuz.canvas.menu.animateTo(Canvuz.canvas.ZOOM_SPEED, 0);															
			}
			Canvuz.canvas.unbindUI();			
			setTimeout(function() {Canvuz.canvas.bindUI();}, Canvuz.canvas.ZOOM_SPEED);			
		}); 
		//animate fade up in opacity
		this.zoomoutButton.bind('mouseover', function() {
			Canvuz.canvas.control.zoomoutButtonOpacity = 1;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.zoomoutButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
		//animate fade down in opacity
		this.zoomoutButton.bind('mouseleave', function() {
			Canvuz.canvas.control.zoomoutButtonOpacity = 0.4;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.zoomoutButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
	};
	
	//bind events to the scroll forward button so it actually does something...
	this.bindForwardButtonEvents = function() {		
		//play animation	
		this.forwardButton.bind('click', function() {
			Canvuz.canvas.albums[Canvuz.canvas.currAlbum].scrollPhotoForward();
			Canvuz.canvas.unbindUI();			
			setTimeout(function() {Canvuz.canvas.bindUI();}, Canvuz.canvas.ZOOM_SPEED);			
		}); 
		//animate fade up in opacity
		this.forwardButton.bind('mouseover', function() {
			Canvuz.canvas.control.forwardButtonOpacity = 1;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.forwardButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
		//animate fade down in opacity
		this.forwardButton.bind('mouseleave', function() {
			Canvuz.canvas.control.forwardButtonOpacity = 0.4;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.forwardButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
	};
	
	//bind events to the scroll back button so it actually does something...
	this.bindBackButtonEvents = function() {				
		//play animation		
		this.backButton.bind('click', function() {
			Canvuz.canvas.albums[Canvuz.canvas.currAlbum].scrollPhotoBackward();
			Canvuz.canvas.unbindUI();			
			setTimeout(function() {Canvuz.canvas.bindUI();}, Canvuz.canvas.ZOOM_SPEED);			
		}); 
		//animate fade up in opacity
		this.backButton.bind('mouseover', function() {			
			Canvuz.canvas.control.backButtonOpacity = 1;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.backButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
		//animate fade down in opacity
		this.backButton.bind('mouseleave', function() {
			Canvuz.canvas.control.backButtonOpacity = 0.4;
			$(this).stop();
			$(this).animate({opacity: Canvuz.canvas.control.backButtonOpacity}, Canvuz.canvas.control.fadeSpeed);
		}); 
	};	
		
	//uinbind the scroll events
	this.unbindScrollEvents = function() {
		this.backButton.unbind('click');
		this.backButton.unbind('mouseenter');
		this.backButton.unbind('mouseleave');
		this.forwardButton.unbind('click');
		this.forwardButton.unbind('mouseenter');
		this.forwardButton.unbind('mouseleave');
	};
	
	//ANIMATION
	////////////////////////////////////////////////////////////////////////////////////////////		
	//show hide the extent button via animation
	this.hideExtent = function() {		
		$(this.extentButton).css('display', 'none');											
	};
	this.showExtent = function() {		
		$(this.extentButton).css('display', 'inline');			
	};
	//show hide the extent button via animation
	this.hideZoomOut = function() {		
		$(this.zoomoutButton).css('display', 'none');									
	};
	this.showZoomOut = function() {		
		$(this.zoomoutButton).css('display', 'inline');							
	};
	//show hide the extent button via animation
	this.hideScroll = function() {		
		$(this.forwardButton).css('display', 'none');											
		$(this.backButton).css('display', 'none');											
	};
	this.showScroll = function() {	
		this.positionScroll();
		$(this.forwardButton).css('display', 'inline');									
		$(this.backButton).css('display', 'inline');									
	};
	this.setButtons = function() {
		//check if we are animating
		if((Canvuz.canvas.animation != null) && (Canvuz.canvas.animation.animating)) {			
			if($(this.zoomoutButton).css('display') != 'none')
				this.hideZoomOut();
				this.hideExtent();
				this.hideScroll();
		} else {
			//set scroll controls
			if(Canvuz.canvas.zoomlevel==3) {												
				if($(this.scrolldiv).css('display') != 'inline')
					this.showScroll();										
			} else {				
				if($(this.scrolldiv).css('display') != 'none')
					this.hideScroll();				
			}
			
			//set zoom out control
			if(Canvuz.canvas.zoomlevel>=2) {
				if($(this.zoomoutButton).css('display') != 'inline')
					this.showZoomOut();
			} else {
				if($(this.zoomoutButton).css('display') != 'none')
					this.hideZoomOut();
			}
			
			//set extent button
			if(Canvuz.canvas.zoomlevel<1) {				
				if($(this.extentButton).css('display') != 'none')
					this.hideExtent();
			} else {						
				if($(this.extentButton).css('display') != 'inline')
					this.showExtent();	
			}
		}
	};
	
	//fade controls in or out
	this.fadeOutControls = function(_speed) {
		this.displayed = false;		
		//$(this.controlsdiv).fadeOut(_speed);		
		$(this.div).fadeOut(_speed);		
		$(this.scrolldiv).fadeOut(_speed);				
		setTimeout(function() {
			$('.button').css('opacity', '0.4');
			if(Canvuz.canvas.animation.animating) {
				$(Canvuz.canvas.control.div).fadeIn(_speed);
			}
		}, _speed);
	};	
	this.fadeInControls = function(_speed) {
		this.displayed = true;
		$(this.div).fadeIn(_speed);
		//$(this.controlsdiv).fadeIn(_speed);
		if(Canvuz.canvas.zoomlevel==3) {				
			$(this.scrolldiv).fadeIn(_speed);
		}
	};
	this.fadeOutScroll = function() {		
		$(this.scrolldiv).fadeOut(this.FADE_SPEED);				
	};
	
	//set the controls which change based on view/animation etc
	this.setControl = function() {	
		var speed = this.FADE_SPEED;
		if(!this.loaded) {
			speed = Canvuz.canvas.ENTRY_SPEED;
			this.loaded = true;
		} 		
		
		if(this.displayed) {			
			this.fadeOutControls(speed);
			var control = this;
			setTimeout(function() {control.setButtons();}, speed);
		} else {
			this.setButtons();
			this.fadeInControls(speed);
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////		
	this.extentsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/home_48.png';	
	this.zoomoutsrc	= Canvuz.canvas.IMAGE_DIRECTORY+'icons/zoomout_48.png';	
	this.forwardsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/arrow_right_64.png';		
	this.loadsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/open_48.png';	
	this.backsrc = Canvuz.canvas.IMAGE_DIRECTORY+'icons/arrow_left_64.png';		
	this.FADE_SPEED = 500;	
	this.displayed = false;
	this.loaded = false;
	
	//create scroll buttons
	this.forwardButton = $('<img />').attr('src', this.forwardsrc).attr('id', 'forwardScroll').attr('class', 'button').attr('alt', 'Click to scroll to the next photo').attr('title', 'Click to scroll to the next photo');	
	this.backButton = $('<img />').attr('src', this.backsrc).attr('id', 'backScroll').attr('class', 'button').attr('alt', 'Click to scroll to the previous photo').attr('title', 'Click to scroll to the previous photo');		
	this.forwardButtonOpacity = $(this.forwardButton).css('opacity');
	this.backButtonOpacity = $(this.backButton).css('opacity');		
	this.bindForwardButtonEvents();
	this.bindBackButtonEvents();
	if(Canvuz.canvas.zoomlevel < 3) {
		this.hideScroll();
	}								
	
	//create zoom to extent button
	this.extentButton = $('<img />').attr('src', this.extentsrc).attr('class', 'button').attr('alt', 'Click to view the entire canvas').attr('title', 'Click to view the entire canvas');	
	this.extentButtonOpacity = $(this.extentButton).css('opacity');
	this.bindextentButtonEvents();	
	//set the display to none for this button if the view width is at maximum
	if(Canvuz.canvas.viewwidth == Canvuz.canvas.docwidth)
		this.hideExtent();
		
	//create zoom out to album button
	this.zoomoutButton = $('<img />').attr('src', this.zoomoutsrc).attr('class', 'button').attr('alt', 'Click to zoom back to the album').attr('title', 'Click to zoom back to the album');	
	this.zoomoutButtonOpacity = $(this.zoomoutButton).css('opacity');
	this.bindzoomoutButtonEvents();
	if(Canvuz.canvas.zoomlevel < 3)
		this.hideZoomOut();			
	
	//create div to contain all master controls in this class
	this.controlsdiv = $('<div />').attr('class', 'control').append(this.extentButton).append(this.zoomoutButton);				
	this.div = $('<div />').attr('id', 'controls').append(this.controlsdiv);					
	
	//create div to contain scroll controls
	this.scrolldiv = $('<div />').attr('id', 'scrollControls').append(this.forwardButton).append(this.backButton);	
	
	//append the controls to the body
	$(Canvuz.canvas.elem).parent().append(this.div);
	$(Canvuz.canvas.elem).parent().append(this.scrolldiv);						
};

