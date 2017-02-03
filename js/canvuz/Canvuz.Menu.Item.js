Canvuz.Menu.Item = function(_minx, _miny, _albumid, _container) {										
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.drawItem = function() {				
		//draw title
		this.item = Canvuz.canvas.drawSVG().text(this.container, 0, 0, this.text, {
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: this.textPx,
			fontWeight: 'bold',			
			fill: '#FFFFFF'
		});
		
		//draw pic stack		
		this.drawPicStack();
	};
	
	//draw the picture stack effect
	this.drawPicStack = function() {
		var origrotate = -20;
		var rotatespacing = 20;
		var origx = -1100		
		var xspacing = 150;
		for(i=0;i<3;i++) {			
			var width;
			var height;			
			var filename;
			var x;
			var rotate;
			if(i==2) {
				rotate = origrotate+rotatespacing;
				x = origx+xspacing;
				width = Canvuz.canvas.albums[this.albumid].photos[this.coverPhoto].width*1.3;
				height = Canvuz.canvas.albums[this.albumid].photos[this.coverPhoto].height*1.3;
				filename = Canvuz.canvas.albums[this.albumid].photos[this.coverPhoto].filename;
				this.imageids[this.imageids.length] = this.coverPhoto;
			} else {	
				if(i==0) {
					rotate = origrotate;
					x = origx;
				} else {
					rotate = origrotate+(rotatespacing*2)
					x = origx+(xspacing*2);
				}
				for(var photo in Canvuz.canvas.albums[this.albumid].photos) {
					if(photo!=this.coverPhoto) {
						width = Canvuz.canvas.albums[this.albumid].photos[photo].width*1.3;
						height = Canvuz.canvas.albums[this.albumid].photos[photo].height*1.3;
						filename = Canvuz.canvas.albums[this.albumid].photos[photo].filename;
						this.imageids[this.imageids.length] = Canvuz.canvas.albums[this.albumid].photos[photo].id;
					}
				}
			}
			
			var photo = new Canvuz.StaticPhoto(x, (0-(height/1.1)), width, height, rotate, filename, this.container);							
			var item = this;
			$(photo.image).load(function() {				
				item.picStackLoaded();
			});			
			this.images[this.images.length] = photo;			
			
						
			if($.browser.webkit) {
				setTimeout(function() {
					item.picStackLoaded();
				}, 50);
			}
		}		
	};
	
	var picsStackLoadedCount = 0;	
	this.picStackLoaded = function() {		
		picsStackLoadedCount = picsStackLoadedCount+1;
		if(picsStackLoadedCount==3) {		
			Canvuz.canvas.menu.itemLoaded();
		}
	};
	
	//CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.bindRollOver = function() {
		var item = this.item;
		$(this.shell).bind('mouseenter', function() {
			$(item).attr('fill', '#FF0000');
			$(this).bind('mouseleave', function() {
				$(item).attr('fill', '#FFFFFF');
				$(this).unbind('mouseleave');
			});
		});
	};
	
	this.unbindRollOver = function() {
		$(this.shell).unbind('mouseenter');
	};
	
	//bind the zoom in on double click functionality
	this.bindAnimateTo = function() {					
		var item = this;		
		$(this.shell).bind('click', function() {								
			Canvuz.canvas.unbindUI();
			Canvuz.canvas.albums[item.albumid].animateTo(Canvuz.canvas.ZOOM_SPEED, 0);
			
			setTimeout(function() {										
				Canvuz.canvas.bindUI();
			}, Canvuz.canvas.ZOOM_SPEED);	
		});
	};	
	
	//bind the custom mouse cursor on mouse over
	this.bindCursor = function() {			
		$(this.shell).bind('mousemove', function() {			
			$(this).css('cursor', Canvuz.canvas.POINTER_ICO);
			$(this).unbind('mousemove');
		});
	};
	
	//bind the zoom in on double click functionality
	this.unbindAnimateTo = function() {		
		$(this.shell).unbind('click');
	};

	this.unbindCursor = function() {		
		$(this.shell).css('cursor', '');
		$(this.shell).unbind('mousemove');
	};
		
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.minx = _minx;
	this.miny = _miny;
	this.albumid = _albumid;	
	this.textPx = '450';	
	this.imageids = new Array();
	this.images = new Array();
	
	this.text = Canvuz.canvas.albums[this.albumid].titlestr;	
	this.item = null;
	this.coverPhoto = Canvuz.canvas.albums[this.albumid].coverPhoto;	
	
	//add the shell and container for this photo so we can transform it easily
	this.shell = Canvuz.canvas.svg.group(_container, {transform:'translate('+this.minx+', '+this.miny+')'});
	this.container = Canvuz.canvas.svg.group(this.shell);
	
	this.FRAME_PADDING_WIDTH = 10;
	this.FRAME_PADDING_HEIGHT = 30;
	
	this.drawItem();
};

