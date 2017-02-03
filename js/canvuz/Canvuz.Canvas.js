//The canvas object acts as a piece of paper, it is given dimensions as well as the view port of the screen
//It contains the svg object as a property which other objects are added too
Canvuz.Canvas = function(_docwidth, _docheight, _viewminx, _viewminy, _viewwidth, _viewheight, _elem) {													
	//OTHER METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//add an animation to the canvas
	this.addAnimation = function(_animation) {
		this.animation = _animation;		
	};
	
	this.addControl = function(_control) {
		this.control = _control;
	};
	
	this.addComments = function(_comments) {
		this.comments = _comments;
	};
	
	this.addMenu = function() {
		this.menu = new Canvuz.Menu(this.MENU_X, this.MENU_Y);
	};
	
	//add an album onto the canvas
	this.addAlbum = function(_title, _id) {
		var x = this.currAlbumX;
		var y = this.currAlbumY;
		var rotation = 90;
		this.albums[_id] = new Canvuz.Album(x, y, rotation, _title, _id);								
				
		if(Canvuz.getArrayLength(this.albums)==this.currAlbumLine) {
			this.currAlbumY = this.ALBUMS_Y;
			this.currAlbumX = this.currAlbumX+this.ALBUM_X_SPACING;
			this.currAlbumLine = this.currAlbumLine+this.ALBUMS_PER_LINE;
		} else {
			this.currAlbumY = this.currAlbumY+this.ALBUM_Y_SPACING;
		}				
	};				

	//loop through the albums and redraw the images on the canvas to the correct quality for the zoom level
	this.redrawImages = function() {
		for(var album in this.albums) {				
			this.albums[album].redrawImages();
		}
	};	
	
	//set the screen _factor - the viewbox mouse position rather than the screen position
	this.setScrFactor = function() {
		this.scrfactorx = this.viewwidth / $(this.svg.root()).attr('width');		
		this.scrfactory = this.viewheight / $(this.svg.root()).attr('height');	
		
		if(this.scrfactorx > this.scrfactory) {
			this.scrfactor = this.scrfactorx;
		} else if(this.scrfactory > this.scrfactorx) {
			this.scrfactor = this.scrfactory;
		}		
	};	

	//LOAD METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//registers an album as loaded so we can fade the canvas up once all pics are loaded
	var albumsLoadedCount = 0;
	var albumsLoaded = false;
	this.albumLoaded = function() {		
		albumsLoadedCount = albumsLoadedCount+1
		if(albumsLoadedCount==Canvuz.getArrayLength(this.albums)) {		
			albumsLoaded = true;						
			this.canvasLoaded();
		}
	};
	
	//registers the menu as loaded
	var menuLoaded = false;
	this.menuLoaded = function() {
		if(Canvuz.canvas.menu.loaded) {
			menuLoaded=true;			
			this.canvasLoaded();
		}
	}
	
	//checks whether all components are loaded an handles the load method
	var loaded = false;
	this.canvasLoaded = function() {		
		if(albumsLoaded&&(this.menu==null||menuLoaded))
			loaded = true;		
		if(loaded) {			
			$('#'+this.LOADING_ID).remove();
			$(this.masterContainer).animate({svgOpacity: 1}, this.ENTRY_SPEED);			
			this.initUI();
		}
	};	
	
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//add a label onto the canvas
	this.drawTitle = function(_x, _y, _rotation, _texts, _textsx, _textsy, _fonts, _sizes, _colours, _weights) {		
		this.titlerotate = _rotation;
		this.titlex=_x;
		this.titley=_y;
		this.titleShell = this.drawSVG().group(this.innerContainer, {transform:'translate('+_x+', '+_y+')'});
		var titleContainer = this.drawSVG().group(this.titleShell, {transform:'rotate('+_rotation+')'});					
		
		for(i=0;i<_texts.length;i++) {
			this.drawSVG().text(titleContainer, _textsx[i], _textsy[i], _texts[i], {					
				fontFamily: _fonts[i], 
				fontSize: _sizes[i],
				fontWeight: _weights[i],			
				fill: _colours[i]
			});					
		}
	};	
	
	this.drawLoadingIcon = function() {
		var iconpath = 'images/loading.gif';
		var icon = $('<img />').attr('src', iconpath);	
		var icondiv = $('<div />').attr('id', this.LOADING_ID).append(icon);
		$(this.elem).parent().append(icondiv);
	};

	//draw the photo on the canvas
	this.drawBG = function() {	
		var imagepath = 'images/demo/bg4.png';
		var x = -2000;
		var y = -9000;
		var width = 11680;
		var height = 11400;
		this.drawSVG().image(this.masterContainer, x, y, width, height, imagepath);		
	};
	
	this.drawSVGTimeouts = new Array();	
	this.drawSVG = function() {
		this.drawSVGTimeouts[this.drawSVGTimeouts.length] = setTimeout(function() {		
			//check if the svg extents have changed
			if(Canvuz.canvas.extentwidth != Canvuz.canvas.outerShell.getBBox().width) {
				//set extent data
				var padding = 500;
				Canvuz.canvas.extentwidth = Canvuz.canvas.outerShell.getBBox().width + padding;
				Canvuz.canvas.extentheight = Canvuz.canvas.outerShell.getBBox().height + padding;
				Canvuz.canvas.extentx = Canvuz.canvas.outerShell.getBBox().x - (padding/2);
				Canvuz.canvas.extenty = Canvuz.canvas.outerShell.getBBox().y - (padding/2);
				//animate to the new extent
				Canvuz.canvas.zoomTo(Canvuz.canvas.extentwidth, Canvuz.canvas.extentheight, Canvuz.canvas.extentx, Canvuz.canvas.extenty, 0);
			}
			for(i=0;i<Canvuz.canvas.drawSVGTimeouts.length;i++) {
				clearTimeout(Canvuz.canvas.drawSVGTimeouts[i]);
			}
		}, 100);
		return this.svg;
	};	
			
	//ANIMATION
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//animate the canvas
	this.animate = function() {		
		this.animation.play();		
	};
	
	//stop the animation
	this.stopAnimation = function() {
		this.animation.stop();
	};
	
	//animate to extent of the canvas
	this.animateToExtent = function(_speed, _timeout) {		
		return setTimeout(function() {	
			Canvuz.canvas.zoomlevel = 0;	
			Canvuz.canvas.currAlbum = '';
			Canvuz.canvas.currPhoto = '';
			if(Canvuz.canvas.innerRotation!=0) {
				Canvuz.canvas.rotate(0, Canvuz.canvas.innerRotatecx, Canvuz.canvas.innerRotatecy, _speed, 'out', 'extent');						
			} 
			//Canvuz.canvas.innerRotatecx = null;
			//Canvuz.canvas.innerRotatecy = null;
			
			Canvuz.canvas.zoomTo(Canvuz.canvas.extentwidth, Canvuz.canvas.extentheight, Canvuz.canvas.extentx, Canvuz.canvas.extenty, _speed);			
		}, _timeout);
	};
	
	//animate to extent of the canvas
	this.animateToTitle = function(_speed, _timeout) {		
		return setTimeout(function() {	
			var titlebbox = Canvuz.canvas.titleShell.getBBox();
			Canvuz.canvas.zoomlevel = 1;	
			Canvuz.canvas.currAlbum = '';
			Canvuz.canvas.currPhoto = '';
			
			Canvuz.canvas.rotate(0-Canvuz.canvas.titlerotate, Canvuz.canvas.titlex, Canvuz.canvas.titley, _speed, 'in', 'title');												
			Canvuz.canvas.zoomTo(Canvuz.canvas.outerShell.getBBox().height/1.9, 0, Canvuz.canvas.titlex*2, Canvuz.canvas.titley, _speed);			
		}, _timeout);
	};
	
	//animate a change in the view box
	this.animateViewBox = function(_speed) {
		//animate zoom
		$(this.svg.root()).animate({svgViewBox:this.viewminx.toString() + ', ' 
											+ this.viewminy.toString() + ', ' 
											+ this.viewwidth.toString() + ', ' 
											+ this.viewheight.toString()}, _speed); 
		
		//redraw the images
		this.redrawImages();		
	};
	
	this.animateIntro = function() {
		this.unbindUI();
		this.control.div.css('opacity', '0');
		for(var album in this.albums) {
			$(this.albums[album].shell).css('opacity','0');
		}
		this.animateToTitle(0, 0);
		this.animateToExtent(3000, 2000);
		setTimeout(function() {	
			for(var album in Canvuz.canvas.albums) {				
				$(Canvuz.canvas.albums[album].shell).animate({opacity: '1'}, 2500);
			}
		}, 5500);
		this.menu.animateTo(3000, 7500);
		setTimeout(function() {		
			Canvuz.canvas.control.div.animate({opacity: 1}, Canvuz.canvas.ENTRY_SPEED);
			Canvuz.canvas.bindUI();			
		}, 10500);
	}
	
	//rotate the canvas
	this.rotate = function(_rotation, _cx, _cy, _speed, _zoom, _object) {
		if(_zoom=='in') {	
			//console.log('rotating on a zoom in');
			if(_object=='album'||_object=='extent'||_object=='menu'||_object=='title') {
				//console.log('rotating inner container to menu or album');								
				if(this.innerRotation==null&&(this.innerRotatecx!=_cx||this.innerRotatecy!=_cy)) {										
					$(this.innerContainer).animate({svgTransform: 'rotate(0,'+_cx+','+_cy+')'}, 0);
				}
				if(this.innerRotatecx!=_cx||this.innerRotatecy!=_cy||this.innerRotation!=_rotation) {			
					this.innerRotatecx = _cx;
					this.innerRotatecy = _cy;		
					this.innerRotation = _rotation;
					$(this.innerContainer).animate({svgTransform: 'rotate('+this.innerRotation+','+this.innerRotatecx+','+this.innerRotatecy+')'}, _speed);
					if(this.innerRotation==0) {
						this.innerRotation=null;
					}				
				}
			} else {
				//console.log('rotating outer container to photo');				
				if(this.outerRotation==null&&(this.outerRotatecx!=_cx||this.outerRotatecy!=_cy)) {						
					$(this.outerContainer).animate({svgTransform: 'rotate(0,'+_cx+','+_cy+')'}, 0);
				}
				if(this.outerRotatecx!=_cx||this.outerRotatecy!=_cy||this.outerRotation!=_rotation) {
					this.outerRotatecx = _cx;
					this.outerRotatecy = _cy;						
					this.outerRotation = _rotation;
					$(this.outerContainer).animate({svgTransform: 'rotate('+this.outerRotation+','+this.outerRotatecx+','+this.outerRotatecy+')'}, _speed);				
				}
			}
		} else {
			//console.log('rotating on a zoom out');
			if(this.outerRotation!=null) {
				//console.log('rotating outer container from photo');									
				$(this.outerContainer).animate({svgTransform: 'rotate(0,'+this.outerRotatecx+','+this.outerRotatecy+')'}, _speed);
				this.outerRotation=null;
				if(this.innerRotatecx!=_cx||this.innerRotatecy!=_cy||this.innerRotation!=_rotation) {
					this.innerRotatecx = _cx;
					this.innerRotatecy = _cy;		
					this.innerRotation = _rotation;
					$(this.innerContainer).animate({svgTransform: 'rotate('+this.innerRotation+','+this.innerRotatecx+','+this.innerRotatecy+')'}, _speed);
				}
			} else {
				//console.log('rotating inner container from menu or album');								
				this.innerRotatecx = _cx;
				this.innerRotatecy = _cy;		
				this.innerRotation = 0;
				$(this.innerContainer).animate({svgTransform: 'rotate('+this.innerRotation+','+this.innerRotatecx+','+this.innerRotatecy+')'}, _speed);
				this.innerRotation=null;
			}
		}
	};	
	
	//zoom the canvas to a specific object, fitting the viewbox to the correct level
	this.zoomTo = function(_width, _height, _minx, _miny, _speed) {		
		//work out which is the larger, screen width or screen height, we must use this as our constraining axis
		if((_width/$(this.svg.root()).attr('width')) > (_height/$(this.svg.root()).attr('height'))) {								
			//set the new width and height
			this.viewwidth = _width;			
			//height must be proportional to width
			this.viewheight = this.viewwidth / (this.docwidth / this.docheight);
			//set the minx and miny
			this.viewminx = _minx;
			this.viewminy = _miny - ((this.viewheight - _height) / 2);
		} else {			
			//set the new width and height
			this.viewheight = _height;
			//width must be proportional to height
			this.viewwidth = this.viewheight * (this.docwidth / this.docheight);
			//set the minx and miny
			this.viewminy = _miny;
			this.viewminx = _minx - ((this.viewwidth - _width) / 2);
		}		
						
		//set the screen _factor - the viewbox mouse position rather than the screen position
		this.setScrFactor();
		
		//animate zoom
		this.animateViewBox(_speed);
	};	
	
	//NAVIGATION
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//pan the svg canvas
	this.pan = function(_evt) {  					
		var mouseclickx = _evt.clientX;
		var mouseclicky = _evt.clientY;		
		var newviewminx = this.viewminx;
		var newviewminy = this.viewminy;

		//set mouse cursor to closed hand
		this.bindPanCursor();
				
		//bind events to canvas		
		var removingScroll = false;
		$(this.elem).bind('mousemove', function(_evt) {	
			//remove scroll controls if they exist						
			if(($('#scrollControls').length>0)&&($('#scrollControls').css('display')=='block')) {
				if(!removingScroll) {
					removingScroll = true;
					Canvuz.canvas.control.fadeOutScroll();					
				}
			}
			//remove comments if they exist
			if(Canvuz.canvas.comments!=null&&$(Canvuz.canvas.comments.div).css('display')!='none')
				Canvuz.canvas.comments.fadeOut(500);	
			
			newviewminx = Canvuz.canvas.viewminx - ((_evt.clientX - mouseclickx) * Canvuz.canvas.scrfactor);
			newviewminy = Canvuz.canvas.viewminy - ((_evt.clientY - mouseclicky) * Canvuz.canvas.scrfactor);				
					
			Canvuz.canvas.svg.configure({viewBox: 
							newviewminx.toString() + ' ' + 
							newviewminy.toString() + ' ' + 
							Canvuz.canvas.viewwidth.toString() + ' ' + 
							Canvuz.canvas.viewheight.toString()}, 
							false);																										
		});		

		$(document).bind('mouseup', function() {
			Canvuz.canvas.viewminx = newviewminx;
			Canvuz.canvas.viewminy = newviewminy;

			Canvuz.canvas.bindCursor();			
			Canvuz.canvas.redrawImages();

			$(Canvuz.canvas.elem).unbind('mousemove');					
			$(this).unbind('mouseup');	
			//remove scroll bars we have too
			setTimeout(function() {
				if(removingScroll) {					
					Canvuz.canvas.albums[Canvuz.canvas.currAlbum].photos[Canvuz.canvas.albums[Canvuz.canvas.currAlbum].currPhoto].bindAnimateTo();
					Canvuz.canvas.albums[Canvuz.canvas.currAlbum].photos[Canvuz.canvas.albums[Canvuz.canvas.currAlbum].currPhoto].bindCursor();
					Canvuz.canvas.albums[Canvuz.canvas.currAlbum].photos[Canvuz.canvas.albums[Canvuz.canvas.currAlbum].currPhoto].unbindCommentsLink();
				}				
			}, 50);
		});			
	};	

	//CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////
	this.initUI = function()  {		
		this.bindUI();
		//disable documents dragstart event
		$(document).each(function() {
			this.ondragstart = function() {
				return false;
			};	
		});
		//set the css of the mouse cursor
		this.bindCursor();		
	};	
	
	//bind the controls to the ui
	this.bindUI = function() {							
		//bind zoom out to double right click
		$(this.elem).rightClick(function(evt) {
			//bring the actual element into a variable to add some custom attributes too
			var elem = $(this);
			//this variable stores the timeout for receiving a second click (for a double click)
			var timeout = null;
			
			//check to see if this is a double click, if double click is not set it must be a single...
			if (elem.data('doublerightclick')) {
				//clear timeout and reset the doubleclick bool
				clearTimeout(timeout);
				elem.data('doublerightclick', false);
				
				//check whether we are zooming out to an album or to full extent
				Canvuz.canvas.unbindUI();	
				if(Canvuz.canvas.zoomlevel==3) {									
					Canvuz.canvas.albums[Canvuz.canvas.currAlbum].animateTo(Canvuz.canvas.ZOOM_SPEED, 0);																			
				} else if(Canvuz.canvas.zoomlevel==2) {																			
					Canvuz.canvas.menu.animateTo(Canvuz.canvas.ZOOM_SPEED, 0);															
				} else if(Canvuz.canvas.zoomlevel==1) {					
					Canvuz.canvas.animateToExtent(Canvuz.canvas.ZOOM_SPEED, 0);														
				}
				setTimeout(function() {						
					Canvuz.canvas.bindUI();
				}, Canvuz.canvas.ZOOM_SPEED);	
			} else {
				//set double click to true
				elem.data('doublerightclick', true);
				
				//handle the single click if a the timeout is reached
				timeout = setTimeout((function(elem) {
					return function() {
						//turn off double click
						elem.data('doublerightclick', false);
						
						//single click implementation here
					}					
				})(elem), 250);
			}
			
			//bind events to remove a right click menu here if needed..
		});		
		
		//bind pan to mousedown
		$(this.elem).bind('mousedown', function(evt) {
			if(Canvuz.canvas.zoomlevel != 0) {
				if (evt.which == 1) {
					Canvuz.canvas.pan(evt);
				}			
			}
		});
		
		//bind the menu controls
		this.bindMenuControls();

		//bind the correct zoom depending on the zoom level
		this.bindObjectControls();
		
		//set the control
		if(this.control!=null) {
			this.control.setControl();
		}		
	};
	
	//unbind the controls from the ui
	this.unbindUI = function() {	
		if(this.comments!=null&&$(this.comments.div).css('display')!='none')
			this.comments.fadeOut(500);			
		
		//unbind canvas ui		
		$(this.elem).unbind('rightClick');
		$(this.elem).unbind('mousedown');
		$(this.elem).unbind('dblclick');
			
		//unbind object controls
		this.unbindMenuControls();				
		this.unbindPhotoControls();
		this.unbindAlbumControls();
			
		//set the control
		if(this.control!=null) {
			this.control.setControl();
		}			
	};		
	
	//bind the menu controls
	this.bindMenuControls = function() {		
		if(this.menu!=null) {						
			this.menu.bindControls();
		}
	};
	this.unbindMenuControls = function() {
		if(this.menu!=null) {
			this.menu.unbindControls();	
		}
	};
	
	//set the css of the mouse cursor when the mouse button is pressed
	this.bindPanCursor = function() {
		$(this.elem).css('cursor', this.HAND_ICO);
	};	
	//set the css of the mouse cursor when the mouse button is lifted
	this.bindCursor = function() {			
		$(this.elem).css('cursor', this.ARROW_ICO);
	};			
	
	//bind the zoom to albums or photos
	this.bindObjectControls = function() {
		this.bindAlbumControls();
		if(this.zoomlevel>1) {										
			this.bindPhotoControls();
		}
	};	
	//bind zoom to photos
	this.bindPhotoControls = function() {					
		//bind the photo cursors and zooms
		for(var album in this.albums) {
			if(album==Canvuz.canvas.currAlbum) {
				for(var photo in this.albums[album].photos) {
					this.albums[album].photos[photo].bindCursor();
					this.albums[album].photos[photo].bindAnimateTo();
				}			
			}
		}
	};
	//unbind zoom to photos
	this.unbindPhotoControls = function() {			
		//unbind photo cursors and zooms
		for(var album in this.albums) {
			for(var photo in this.albums[album].photos) {
				this.albums[album].photos[photo].unbindCursor();
				this.albums[album].photos[photo].unbindAnimateTo();
				this.albums[album].photos[photo].unbindCommentsLink();
			}						
		}
	};
	//bind zoom to albums
	this.bindAlbumControls = function() {		
		for(var album in this.albums) {	
			if(album!=this.currAlbum) {
				this.albums[album].bindCursor();
				this.albums[album].bindAnimateTo();
			}
			if(this.zoomlevel>=2) 
				this.albums[album].showPhotoText();
		}
	};
	//unbind zoom to albums
	this.unbindAlbumControls = function() {		
		for(var album in this.albums) {			
			this.albums[album].unbindCursor();
			this.albums[album].unbindAnimateTo();
			if(this.zoomlevel<=1) 
				this.albums[album].hidePhotoText();	
		}
	};		
	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.docwidth = _docwidth;
	this.docheight = _docheight;
	this.viewminx = _viewminx;
	this.viewminy = _viewminy;
	this.viewwidth = _viewwidth;
	this.viewheight = _viewheight;	
	this.elem = _elem;
	this.extentwidth = 0;
	this.extentheight = 0;
	this.extentx = 0;
	this.extenty = 0;
	this.albums = new Array();	
	this.title = null;	
	this.titlex = 0;
	this.titley = 0;
	this.titlerotate = 0;
	this.control = null;
	this.comments = null;
	this.animation = null;	
	this.menu = null;
	this.outerRotation = null;
	this.outerRotatecx = null;
	this.outerRotatecy = null;
	this.innerRotation = null;
	this.innerRotatecx = null;
	this.innerRotatecy = null;
	this.scrfactor = 0;	
	this.scrfactorx = 0;
	this.scrfactory = 0;
	this.zoomlevel = 0;
	this.currAlbum = '';		
	
	//CONSTANTS
	this.ALBUMS_Y = -8100;
	this.ALBUMS_X = 39525;
	this.currAlbumY = this.ALBUMS_Y;
	this.currAlbumX = this.ALBUMS_X;
	this.ALBUM_Y_SPACING = 4500;
	this.ALBUM_X_SPACING = 2000;
	this.ALBUMS_PER_LINE = 5;
	this.currAlbumLine = this.ALBUMS_PER_LINE;
	this.LOADING_ID = 'loadingIcon';
	this.DOC_MIN_X = 0;
	this.DOC_MIN_Y = 0;
	this.ENTRY_SPEED = 2000;
	this.ZOOM_SPEED = 2500;	
	this.FADE_SPEED = 1000;
	this.FONT = 'Reenie Beanie, Tahoma';
	this.COLOUR = '#000000';
	this.IMGRESIZE_PATH = Canvuz.domain+'/includes/imageresizer.php';
	this.IMAGE_DIRECTORY = Canvuz.domain+'/images/';
	this.ARROW_ICO = 'url("./images/icons/arrow_32.png"), default';	
	this.ZOOMIN_ICO = 'url("./images/icons/zoomin_32.png"), pointer';
	this.HAND_ICO = 'url("./images/icons/hand_32.png"), move';
	this.POINTER_ICO = 'url("./images/icons/pointer_32.png"), pointer';	
	this.MENU_X = 13500;
	this.MENU_Y = 6360;	
	this.ALBUM_COLOUR = '#ddd7be';
	this.POLAROID_COLOUR = '#fffffa';
	
	//configure svg canvas		
	this.svg = this.elem.svg('get');						
	this.svg.configure({preserveAspectRatio: 'xMidYMid meet'}, false);

	//set shell and container so we can transform canvas			
	this.masterContainer = this.svg.group({transform:'translate(0, 0)', opacity:'0'});	
	//draw any background images
	this.drawBG();	
	
	this.outerShell = this.svg.group(this.masterContainer, {transform:'translate(0, 0)'});
	this.outerContainer = this.svg.group(this.outerShell, {transform:'rotate(0, 0, 0)'});				
	this.innerShell = this.svg.group(this.outerContainer, {transform:'translate(0, 0)'});
	this.innerContainer = this.svg.group(this.innerShell, {transform:'rotate(0, 0, 0)'});		
	
	//set screen _factor to work out screen pixels against svg units
	this.setScrFactor();
	
	//set the loading icon
	this.drawLoadingIcon();	
};

