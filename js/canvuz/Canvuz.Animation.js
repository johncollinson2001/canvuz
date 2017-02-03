Canvuz.Animation = function(_albums, _photos) {									
	//////////////////////////////////////////////////////////////////////////////////////////////
	//METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.play = function() {	
		this.animating = true;
		
		//clear the timeouts
		Canvuz.canvas.animation.clearAnimationTimeouts();			
				
		//unbind the canvas controls
		Canvuz.canvas.unbindUI();
		
		this.incrementTimer = function() {
			this.timer = this.timer+this.animationSpeed+this.interval;
		}
		
		this.showPhotoText = function(_timer, _albumid) {
			this.animations[animationIndex] = setTimeout(function() {
				Canvuz.canvas.albums[_albumid].showPhotoText();	
			}, _timer);
			animationIndex++;
		};
		this.hidePhotoText = function(_timer, _albumid) {
			this.animations[animationIndex] = setTimeout(function() {
				Canvuz.canvas.albums[_albumid].hidePhotoText();	
			}, _timer);
			animationIndex++;
		};
		
		//iterate through the albums
		var albumcount = this.albums.length;		
		var animationIndex = 0;
		for(i=0;i<albumcount;i++) {			
			//grab the id
			var albumid = this.albums[i];
			
			//animate to the album
			this.animations[animationIndex] = Canvuz.canvas.albums[albumid].animateTo(this.animationSpeed, this.timer);			
			animationIndex++;	
			this.showPhotoText(this.timer, albumid);
			this.incrementTimer();
					
						
			//iterate through the albums photos	
			var photocount = this.photos[albumid].length;
			for(j=0;j<photocount;j++) {						
				//animate the photo				
				this.animations[animationIndex] = Canvuz.canvas.albums[albumid].photos[this.photos[albumid][j]].animateTo(this.animationSpeed, this.timer);
				this.incrementTimer();
				animationIndex++;				
			}	
			
			this.hidePhotoText(this.timer, albumid);					
		}
		
		//set the animation to repeat
		this.animations[animationIndex] = setTimeout(function() {			
			Canvuz.canvas.animation.timer = 0;
			Canvuz.canvas.animation.play();
		}, this.timer);							
	};
	
	//clear the timeouts which are set during animation
	this.clearAnimationTimeouts = function() {		
		for(var i in this.animations) {			
			clearTimeout(this.animations[i]);
		}
	};
	
	//stop the animation
	this.stop = function() {
		this.animating = false;			
		
		$(Canvuz.canvas.svg.root()).stop(true, false);
		$(Canvuz.canvas.innerContainer).stop(true, false);
		$(Canvuz.canvas.outerContainer).stop(true, false);
		
		//clear the timeouts
		this.clearAnimationTimeouts();

		//reset timer
		this.timer = 0;
		
		//turn off all captions
		for(var album in Canvuz.canvas.albums) {
			Canvuz.canvas.albums[album].hidePhotoText();
		}
		
		//animate back to full extent
		Canvuz.canvas.animateToExtent(this.animationSpeed, this.timer);
		
		//binds the ui controls once we have zoomed back to full extent
		setTimeout(function() {Canvuz.canvas.bindUI();}, this.animationSpeed);
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////////
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.albums = _albums;
	this.photos = _photos;
	this.animationSpeed = 2500;
	this.timer = 0;
	this.interval = 1500;
	this.control = new Canvuz.Animation.Control();	
	this.animations = new Array();	
	this.animating = false;	
};

