//the album object is what puts the photos and album style onto the svg
//it contains the photos, titles and date/location (to come!)
//the shell is positioned on the svg
//the container contains all the drawings (and photos)
Canvuz.Album = function(_minx, _miny, _rotation, _title, _id) {														
	//OTHER METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//adds a photo to the album
	var rotateFlag = false;
	this.addPhoto = function(_width, _height, _filename, _caption, _id, _coverPhoto) {		
		if(_coverPhoto)
			this.coverPhoto = _id;
			
		if((this.currLineGroup.getBBox().width+_width)>this.PHOTO_LINE_WIDTH) {						
			this.currLineGroup = Canvuz.canvas.svg.group(this.container);								
			this.currPhotoX = this.PHOTOS_X;			
			this.currPhotoY = this.currPhotoY+this.PHOTOS_Y_SPACING;
		}
		
		var x = this.currPhotoX;
		var y = this.currPhotoY;
		var rotation;
		if(rotateFlag) {
			rotation = 6;
			rotateFlag = false;
		} else {
			rotation = -6;
			rotateFlag = true;
		}
		this.photos[_id] = new Canvuz.Photo(_width, _height, x, y, rotation, _filename, _caption, _id, this.id);							
		
		this.currPhotoX = this.currPhotoX+_width+this.PHOTOS_X_SPACING;
	};
	
	this.photoLoaded = function() {	
		this.photosLoaded = this.photosLoaded+1;
		if(this.photosLoaded==Canvuz.getArrayLength(this.photos)) {			
			Canvuz.canvas.albumLoaded();
		}
	};
	
	//loop through the photos and redraw on the canvas to the correct quality for the zoom level
	this.redrawImages = function() {
		for(var photo in this.photos) {
			this.photos[photo].redrawImage();
		}
	};
	
	//ANIMATION
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//animate to extent of the album
	this.animateTo = function(_speed, _timeout) {
		var albumid = this.id;
		return setTimeout(function() {							
			//zoom to vars																							
			var padding = 300;			
						
			var zoomtowidth = Canvuz.canvas.albums[albumid].WIDTH+padding;
			var zoomtoheight = Canvuz.canvas.albums[albumid].HEIGHT+padding;					
			var zoomtox = Canvuz.canvas.albums[albumid].minx-(padding/2);
			var zoomtoy = Canvuz.canvas.albums[albumid].miny-(padding/2);
						
			//rotation vars	
			var rotateto = 0 - Canvuz.canvas.albums[albumid].rotation;;								
			var rotatecx = Canvuz.canvas.albums[albumid].minx + (Canvuz.canvas.albums[albumid].WIDTH/2);
			var rotatecy = Canvuz.canvas.albums[albumid].miny + (Canvuz.canvas.albums[albumid].HEIGHT/2);		
			var zoom;
			if(Canvuz.canvas.zoomlevel>2) {
				zoom = 'out';
			} else {
				zoom = 'in';
			}				

			Canvuz.canvas.currAlbum = albumid;
			Canvuz.canvas.zoomlevel = 2;
			Canvuz.canvas.rotate(rotateto, rotatecx, rotatecy, _speed, zoom, 'album');						
			Canvuz.canvas.zoomTo(zoomtowidth, zoomtoheight, zoomtox, zoomtoy, _speed);							
		}, _timeout);				
	};		
	
	this.showPhotoText = function() {
		for(var photo in this.photos) {
			this.photos[photo].showText();	
		}
	};			
	this.hidePhotoText = function() {
		for(var photo in this.photos) {
			this.photos[photo].hideText();	
		}
	};			
	
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////		
	//draw the title of the album
	this.drawTitle = function() {				
		var x = 40;
		var y = this.HEIGHT-75;										
		var rotate = -90;
		
		var shell = Canvuz.canvas.svg.group(this.container, {transform:'translate('+x+', '+y+')'/*, onmousedown:'Canvuz.canvas.albums[\''+this.title+'\'].drag(evt)'*/});
		var container = Canvuz.canvas.svg.group(shell, {transform:'rotate('+rotate+')'});							
						
		this.title = Canvuz.canvas.drawSVG().text(container, 0, 0, this.titlestr, {					
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: this.TITLE_FONT_SIZE, 
			fill: '#FFFFFF'
		});									
	};

	//draw the left hand border of the album
	this.drawHeader = function() {
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = this.HEIGHT;		
				
		Canvuz.canvas.drawSVG().line(this.container, x1, y1, x2, y2, {
			stroke:Canvuz.canvas.COLOUR,
			strokeWidth:this.HEADER_STROKE
		});	
	};		
	
	//CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//bind the zoom in on double click functionality
	this.bindAnimateTo = function() {				
		//bind zoom to photo on double click of the photo
		var albumid = this.id;		
		$(this.shell).bind('click', function() {									
			Canvuz.canvas.unbindUI();
			Canvuz.canvas.albums[albumid].animateTo(Canvuz.canvas.ZOOM_SPEED,0);									
			
			setTimeout(function() {										
				Canvuz.canvas.bindUI();
			}, Canvuz.canvas.ZOOM_SPEED);	
		});
	};

	//bind the zoom in on double click functionality
	this.unbindAnimateTo = function() {		
		$(this.shell).unbind('click');
		// ie error tracked through to here
		//try modified jquery 1.3.2 from svg site...
	};

	//bind the custom mouse cursor on mouse over
	this.bindCursor = function() {		
		$(this.shell).bind('mouseover', function() {			
			$(this).css('cursor', Canvuz.canvas.ZOOMIN_ICO);			
		});
	};
	this.unbindCursor = function() {		
		$(this.shell).css('cursor', '');
		$(this.shell).unbind('mouseover');
	};
		
	//scroll to the next photo
	this.scrollPhotoForward = function() {			
		var nextPhoto = '';
		var flag = false;
		var i = 1;
		var firstPhoto = '';
		
		for(var photo in this.photos) {
			//grab the first photo
			if(firstPhoto=='')
				firstPhoto = photo;
			//we found the photo on the last pass so the photo were moving too must be this one
			if(flag) {
				nextPhoto = photo;
				break;
			}
			//found the current photo
			if(photo == this.currPhoto) {				
				//check if its the last in the array, if so use the firstPhoto value
				if(i==Canvuz.getArrayLength(this.photos)) {					
					nextPhoto = firstPhoto;
					break;
				} else {
					//mark flag as true so we grab the next photo on the next pass
					flag = true;
				}
			}
			i++;
		}		
		
		//do the animation	
		this.photos[nextPhoto].animateTo(Canvuz.canvas.ZOOM_SPEED, 0);		
		
		//set the current photo for the next scroll
		this.currPhoto = nextPhoto;
	};
	
	//scroll to the next photo
	this.scrollPhotoBackward = function() {				
		var nextPhoto = '';
		var flag = false;
		var i = 0;
		
		for(var photo in this.photos) {	
			//found the current photo
			if(photo == this.currPhoto) {
				//check that this is not the first photo in the array, if it is we will let the loop run till the end as were looking for the last photo
				if(i!=0)						
					break;
			} else {
				//set the next photo, this will be remembered if the curr photo is found on the next pass (aslong as this isnt the first iteration!)
				nextPhoto = photo;
			}
			i++;
		}		
		
		//do the animation		
		this.photos[nextPhoto].animateTo(Canvuz.canvas.ZOOM_SPEED, 0);		
		
		//set the current photo for the next scroll
		this.currPhoto = nextPhoto;
	};

	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.WIDTH = 4100;
	this.HEIGHT = 1794;
	this.minx = _minx;
	this.miny = _miny;
	this.rotation = _rotation;
	this.titlestr = _title;	
	this.id = _id;
	this.photos = new Array();	
	this.currPhoto = '';
	this.coverPhoto = '';	
	this.photosLoaded = 0;	
	
	this.title = null;
	this.location = null;
	this.infox = 0;
	this.infoy = 0;
	this.infowidth = 0;
	this.infoheight = 0;
	
	//CONSTANTS		
	this.HEADER_STROKE = 200;	
	this.TITLE_PADDING = 110;
	this.TITLE_FONT_SIZE = 140;		
	this.TITLE_ROTATION = 0;	
	this.PHOTO_LINE_WIDTH = 3345;
	this.PHOTOS_X = 445;
	this.PHOTOS_Y = 368;
	this.PHOTOS_X_SPACING = 175;
	this.PHOTOS_Y_SPACING = 575;	
	this.currPhotoX = this.PHOTOS_X;
	this.currPhotoY = this.PHOTOS_Y;	
	this.currLineGroup = null;
	
	//add the shell and container for this photo so we can transform it easily
	this.shell = Canvuz.canvas.svg.group(Canvuz.canvas.innerContainer, {id: this.id, transform:'translate('+this.minx+', '+this.miny+')'});
	this.container = Canvuz.canvas.svg.group(this.shell, {transform:'rotate('+this.rotation+','+(this.WIDTH/2)+','+(this.HEIGHT/2)+')'});							
	
	//draw background rectangle so we catch mouse over events across the whole album	
	Canvuz.canvas.svg.rect(this.container, 0, 0, this.WIDTH, this.HEIGHT, 60, 60, {fill: Canvuz.canvas.ALBUM_COLOUR, opacity:0.8});
	
	//create the group which will house the current line of photos
	this.currLineGroup = Canvuz.canvas.svg.group(this.container);								
			
	//DRAW THE ALBUM
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.drawHeader();	
	this.drawTitle();
};

