//the photo object stores the photos and adds them to the svg, along with the photos style (default - polaroid)
//the shell is positioned on the svg
//the container contains the photo and caption
Canvuz.Photo = function(_width, _height, _minx, _miny, _rotation, _filename, _caption, _id, _albumid) {			
	//OTHER METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.addComment = function(_comment, _author, _date) {						
		this.comments.addComment(_comment, _author, _date);
	};
	
	this.addComments = function() {
		this.comments = new Canvuz.Photo.Comments(0, 0, this.width, this.height);
		this.drawCommentsLink();
	};
	
	//ANIMATION
	//////////////////////////////////////////////////////////////////////////////////////////////		
	//animate to the photo
	this.animateTo = function(_speed, _timeout) {
		var photoid = this.id;
		var albumid = this.albumid;
		return setTimeout(function() {							
			//zoom to vars	
			var captionmargin = Canvuz.canvas.albums[albumid].photos[photoid].CAPTION_MARGIN + 10;																		
			var marginwidth = 150;
			var marginheight = 150;
						
			var canvasx = Canvuz.canvas.albums[albumid].photos[photoid].ALBUM_X+Canvuz.canvas.albums[albumid].photos[photoid].minx;
			var canvasy = Canvuz.canvas.albums[albumid].photos[photoid].ALBUM_Y+Canvuz.canvas.albums[albumid].photos[photoid].miny;											
						
			var zoomtowidth = Canvuz.canvas.albums[albumid].photos[photoid].width+marginwidth;
			var zoomtoheight = Canvuz.canvas.albums[albumid].photos[photoid].height+marginheight;					
			var zoomtox = canvasx-(marginwidth/2);
			var zoomtoy = canvasy-(marginheight/2)+captionmargin;
									
			var rotateto = 0 - Canvuz.canvas.albums[albumid].photos[photoid].rotation;
			var rotatecx = canvasx + (Canvuz.canvas.albums[albumid].photos[photoid].width/2);
			var rotatecy = canvasy + (Canvuz.canvas.albums[albumid].photos[photoid].height/2);									
																		
			Canvuz.canvas.albums[albumid].currPhoto = photoid;
			Canvuz.canvas.zoomlevel = 3;
			Canvuz.canvas.rotate(rotateto, rotatecx, rotatecy, _speed, 'in');									
			Canvuz.canvas.zoomTo(zoomtowidth, zoomtoheight, zoomtox, zoomtoy, _speed);							

			//unbind animate to on this photo so we cant animate to it again
			setTimeout(function() {
				Canvuz.canvas.albums[albumid].photos[photoid].unbindAnimateTo();
				Canvuz.canvas.albums[albumid].photos[photoid].unbindCursor();
				if(Canvuz.canvas.animation!=null&&!Canvuz.canvas.animation.animating)
					Canvuz.canvas.albums[albumid].photos[photoid].bindCommentsLink();	
			}, _speed);
		}, _timeout);						
	};	
		
	//rotate the photo on the canvas
	this.rotate = function(_rotation, _cx, _cy, _speed) {		
		$(this.container).animate({svgTransform: 'rotate('+_rotation+','+_cx+','+_cy+')'}, _speed);										
	};
	
	this.showText = function() {
		$(this.caption).attr('opacity','1');
		if(Canvuz.canvas.animation!=null&&!Canvuz.canvas.animation.animating)
			$(this.commentsLink).attr('opacity','1');	
	};
	this.hideText = function() {
		$(this.caption).attr('opacity','0');
		$(this.commentsLink).attr('opacity','0');
	};
	
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//draw the photos caption
	this.drawCaption = function() {
		this.caption = Canvuz.canvas.drawSVG().text(this.container, ((this.width + (this.FRAME_PADDING_WIDTH * 2)) / 2), ((this.height + (this.FRAME_PADDING_HEIGHT * 2)) + this.CAPTION_MARGIN), this.captionstr, {
			textAnchor: 'middle',
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: 32, 
			fontWeight: 'bold',
			fill: Canvuz.canvas.COLOUR
		});
	};
	
	//draw the photos caption
	this.drawCommentsLink = function() {
		this.commentsLink = Canvuz.canvas.drawSVG().text(this.container, ((this.width + (this.FRAME_PADDING_WIDTH * 2)) / 2), (this.height+this.CAPTION_MARGIN), 'Comments', {
			textAnchor: 'middle',
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: 20, 
			fontWeight: 'bold',
			fill: Canvuz.canvas.COLOUR
		});				
	};
	
	//draw the photos shadow effect
	this.drawShadow = function() {						
		Canvuz.canvas.drawSVG().rect(this.container, 0, 0, (this.width + (this.FRAME_PADDING_WIDTH * 2)), (this.height + (this.FRAME_PADDING_HEIGHT * 2)), 0, 0, {
			fill:'#000000', 
			fillOpacity:'0.4'
		});	
	};

	//draw the photos white polaroid style frame
	this.drawFrame = function() {						
		Canvuz.canvas.drawSVG().rect(this.container, (0 - this.FRAME_PADDING_WIDTH), (0 - this.FRAME_PADDING_WIDTH), this.width + (this.FRAME_PADDING_WIDTH * 2) , this.height + (this.FRAME_PADDING_HEIGHT * 2), 0, 0, {
			fill:Canvuz.canvas.POLAROID_COLOUR,
			stroke:'black',
			strokeWidth: '0.2px'
		})
	};
	
	//draw the photo on the canvas
	this.drawImage = function() {
		var imagepath = this.createImagePath();		
		this.image = Canvuz.canvas.drawSVG().image(this.container, 0, 0, this.width, this.height, imagepath);
		var albumid = this.albumid;
		$(this.image).load(function() {			
			Canvuz.canvas.albums[albumid].photoLoaded();
		});
		
		if($.browser.webkit) {
			var photo = this;
			setTimeout(function() {
				Canvuz.canvas.albums[albumid].photoLoaded();
			}, 50);
		}
	};	
	
	//loop through the photos and redraw on the canvas to the correct quality for the zoom level
	this.redrawImage = function() {		
		//check we havent already loaded the highest quality image
		if(!this.maxRendered) {				
			//check if the image is within the viewport 
			//x check
			if(((this.ALBUM_X+this.minx+this.width) > Canvuz.canvas.viewminx) && ((this.ALBUM_X+this.minx) < (Canvuz.canvas.viewminx + Canvuz.canvas.viewwidth))) {			
				//y check
				if(((this.ALBUM_Y+this.miny+this.height) > Canvuz.canvas.viewminy) && ((this.ALBUM_Y+this.miny) < (Canvuz.canvas.viewminy + Canvuz.canvas.viewheight))) {				
					//change the image path
					var imagepath = this.createImagePath();
					$(this.image).attr('href', imagepath);
				}
			}
		}
	};
	
	//create the image path which will change based on the screen factor
	this.createImagePath = function() {
		var imagepath = Canvuz.canvas.IMGRESIZE_PATH;
		var factor = 1;
		//do we need to render a resized image?
		if((Canvuz.canvas.scrfactor/2) > 1) {
			//we do, this is the factor we will scale the image by
			factor = Math.round(Canvuz.canvas.scrfactor/2);
			//but have we already rendered an image which is higher quality? if not reset the curr factor value
			if(factor < this.currFactorRendered) {	
				this.currFactorRendered = factor;			
			}
		} else {						
			//we dont so were going to render the full res image - mark this image as fully rendered
			this.maxRendered = true;			
			this.currFactorRendered = factor;
		}
		
		imagepath = imagepath + '?width=' + (this.width/this.currFactorRendered);
		imagepath = imagepath + '&height=' + (this.height/this.currFactorRendered);
		imagepath = imagepath + '&quality=' + '100';
		imagepath = imagepath + '&image=' + this.IMGRESIZE_IMAGE_PATH;
		
		return imagepath;
	};	
	
	//CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//bind the zoom in on double click functionality
	this.bindAnimateTo = function() {
		//bind zoom to photo on double click of the photo
		var photoid = this.id;		
		var albumid = this.albumid;
		$(this.shell).bind('click', function() {							
			Canvuz.canvas.unbindUI();
			Canvuz.canvas.albums[albumid].photos[photoid].animateTo(Canvuz.canvas.ZOOM_SPEED,0);					
						
			setTimeout(function() {				
				Canvuz.canvas.bindUI();								
			}, Canvuz.canvas.ZOOM_SPEED);	
		});
	};	
	//bind the zoom in on double click functionality
	this.unbindAnimateTo = function() {
		$(this.shell).unbind('click');
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
	
	this.bindCommentsLink = function() {	
		//change colour of text
		$(this.commentsLink).bind('mouseover', function() {
			$(this).attr('fill', '#FF0000');
			$(this).bind('mouseleave', function() {
				$(this).attr('fill', Canvuz.canvas.COLOUR);
				$(this).unbind('mouseleave');
			});
		});
		
		//bind mouse cursor
		$(this.commentsLink).bind('mousemove', function() {			
			$(this).css('cursor', Canvuz.canvas.POINTER_ICO);
			$(this).unbind('mousemove');
		});
		
		//bind click
		var photoid = this.id;		
		var albumid = this.albumid;
		$(this.commentsLink).bind('click', function() {					
			Canvuz.canvas.albums[albumid].photos[photoid].comments.showHide();			
		});
	};
	this.unbindCommentsLink = function() {	
		$(this.commentsLink).css('cursor', '');
		$(this.commentsLink).unbind('mousemove');
		$(this.commentsLink).unbind('mouseover');
		$(this.commentsLink).unbind('click');
	};
		
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.width = _width;
	this.height = _height;
	this.minx = _minx;
	this.miny = _miny;
	this.rotation = _rotation;
	this.filename = _filename;		
	this.captionstr = _caption;
	this.id = _id;
	this.albumid = _albumid;	
	
	this.image = null;
	this.commentsLink = null;
	this.comments = null;
	this.caption = null;
	this.currFactorRendered = Canvuz.canvas.scrfactor;
	this.maxRendered = false;	
	
	//CONSTANTS
	this.ALBUM_X = Canvuz.canvas.albums[this.albumid].minx;
	this.ALBUM_Y = Canvuz.canvas.albums[this.albumid].miny;
	this.FRAME_PADDING_WIDTH = 10;
	this.FRAME_PADDING_HEIGHT = 30;	
	this.IMGRESIZE_IMAGE_PATH = Canvuz.canvas.IMAGE_DIRECTORY+this.filename;
	this.CAPTION_MARGIN = 30;
	
	//add the shell and container for this photo so we can transform it easily
	this.shell = Canvuz.canvas.svg.group(Canvuz.canvas.albums[this.albumid].currLineGroup, {transform:'translate('+this.minx+', '+this.miny+')'});	
	this.container = Canvuz.canvas.svg.group(this.shell, {transform:'rotate('+this.rotation+','+(this.width/2)+','+(this.height/2)+')'});		
			
	//DRAW THE PHOTO
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.drawShadow();
	this.drawFrame();
	this.drawImage();
	this.drawCaption();		
	this.addComments();
	this.hideText();
};

