Canvuz.Menu = function(_x, _y) {										
	//LOAD METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	var picsStackLoadedCount = 0;
	var picStackLoaded = false;
	this.picStackLoaded = function() {	
		picsStackLoadedCount = picsStackLoadedCount+1;
		if(picsStackLoadedCount==2) {
			picStackLoaded = true;
			this.menuLoaded();
		}
	};
	
	var itemsLoadedCount = 0;
	var itemsLoaded = false;
	this.itemLoaded = function() {
		itemsLoadedCount=itemsLoadedCount+1;
		if(itemsLoadedCount==this.menuItems.length) {
			itemsLoaded=true;
			this.menuLoaded();
		}
	};
	
	this.menuLoaded = function() {		
		if(picStackLoaded&&itemsLoaded) {			
			this.loaded = true;	
			Canvuz.canvas.menuLoaded();
		}
	};
	
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.drawInfo = function() {
		var weight = 'bold';
		
		var line1 = 'Select an album by clicking on it...';
		var line1px = '500';
		var line1x = 0;
		var line1y = 0;
		
		var line2 = '...or use the play button in the bottom left corner';
		var line2px = '375';
		var line2x = line1x + 800;
		var line2y = line1y + 600;
		
		Canvuz.canvas.drawSVG().text(this.container, line1x, line1y, line1, {					
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: line1px,
			fontWeight: weight,			
			fill: '#FFFFFF'
		});	
		
		Canvuz.canvas.drawSVG().text(this.container, line2x, line2y, line2, {					
			fontFamily: Canvuz.canvas.FONT, 
			fontSize: line2px,
			fontWeight: weight,			
			fill: '#FFFFFF'
		});	
	};		
	
	this.drawOverlay = function() {
		var width = 10500;
		var height = 11375;	
		this.overlay = Canvuz.canvas.svg.rect(this.imageContainer, 5000, 0-height, width, height, {fill: '000000'});
	};
	
	//draw the background image on the canvas
	this.drawPicStack = function() {
		
		var origrotate = -20;
		var rotatespacing = 20;
		var origx = 0;		
		var xspacing = 5000;
		for(i=0;i<3;i++) {			
			var width = 10500;
			var height = 11375;			
			var filename;
			var x;
			var rotate;			
			if(i==2) {				
				filename = '';
				rotate = origrotate+rotatespacing;
				x = origx+xspacing;				
			} else {
				fill = '';
				if(i==0) {
					filename = 'demo/menu/001.jpg'
					rotate = origrotate;
					x = origx;
				} else {
					filename = 'demo/menu/002.jpg'
					rotate = origrotate+(rotatespacing*2)
					x = origx+(xspacing*2);
				}				
			}
			
			var photo = new Canvuz.StaticPhoto(x, (0-height), width, height, rotate, filename, this.imageContainer);							
			$(photo.image).load(function() {
				Canvuz.canvas.menu.picStackLoaded();
			});
			this.images[this.images.length] = photo;
			
			if($.browser.webkit) {
				setTimeout(function() {
					Canvuz.canvas.menu.picStackLoaded();
				}, 50);
			}
		}		
		this.drawOverlay();
	};	
	
	//populate the menu with items
	this.populateMenu = function() {		
		for(var album in Canvuz.canvas.albums) {					
			this.menuItems[this.menuItems.length] = new Canvuz.Menu.Item(this.itemsx, this.currItemY, Canvuz.canvas.albums[album].id, this.container);			
			this.currItemY = this.currItemY + this.itemSpacing;
		}
	};
	
	//ANIMATION
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//animate to extent of the album
	this.animateTo = function(_speed, _timeout) {	
		return setTimeout(function() {				
			//zoom to vars																							
			var padding = 545;									
			var zoomtowidth = Canvuz.canvas.menu.overlay.getBBox().width;
			var zoomtoheight = Canvuz.canvas.menu.overlay.getBBox().height;					
			var zoomtox = Canvuz.canvas.menu.menuminx-(padding/2);
			var zoomtoy = Canvuz.canvas.menu.menuminy-(padding*2);												
			
			var rotateto = 0;
			var rotatecx = Canvuz.canvas.innerRotatecx;
			var rotatecy = Canvuz.canvas.innerRotatecy;			
			var zoom;
			if(Canvuz.canvas.zoomlevel>1) {
				zoom = 'out';
			} else {
				zoom = 'in';
			}	
			
			Canvuz.canvas.zoomlevel = 1;
			Canvuz.canvas.currAlbum = '';
			Canvuz.canvas.currPhoto = '';
			Canvuz.canvas.rotate(rotateto, rotatecx, rotatecy, _speed, zoom, 'menu');									
			Canvuz.canvas.zoomTo(zoomtowidth, zoomtoheight, zoomtox, zoomtoy, _speed);						
		}, _timeout);				
	};
	
	//CONTROLS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	//bind the zoom in on double click functionalit
	this.bindAnimateTo = function() {		
		$(this.overlay).bind('click', function() {						
			Canvuz.canvas.unbindUI();			
			Canvuz.canvas.menu.animateTo(Canvuz.canvas.ZOOM_SPEED,0);												
			setTimeout(function() {										
				Canvuz.canvas.bindUI();
			}, Canvuz.canvas.ZOOM_SPEED);	
		});
		$(this.shell).bind('click', function() {						
			Canvuz.canvas.unbindUI();			
			Canvuz.canvas.menu.animateTo(Canvuz.canvas.ZOOM_SPEED,0);												
			setTimeout(function() {										
				Canvuz.canvas.bindUI();
			}, Canvuz.canvas.ZOOM_SPEED);	
		});
	};	
	this.unbindAnimateTo = function() {		
		$(this.overlay).unbind('click');		
		$(this.shell).unbind('click');	
	};
	
	//bind the custom mouse cursor on mouse over
	this.bindCursor = function() {		
		$(this.overlay).bind('mousemove', function() {			
			$(this).css('cursor', Canvuz.canvas.ZOOMIN_ICO);
			$(this).unbind('mousemove');
		});
		$(this.shell).bind('mousemove', function() {			
			$(this).css('cursor', Canvuz.canvas.ZOOMIN_ICO);
			$(this).unbind('mousemove');
		});
	};		
	this.unbindCursor = function() {		
		$(this.overlay).css('cursor', '');
		$(this.overlay).unbind('mousemove');
		$(this.shell).css('cursor', '');
		$(this.shell).unbind('mousemove');
	};
	
	this.bindControls = function() {		
		if(Canvuz.canvas.zoomlevel==0) {			
			this.bindAnimateTo();
			this.bindCursor();			
		} else {						
			for(i=0;i<this.menuItems.length;i++) {
				this.menuItems[i].bindAnimateTo();
				this.menuItems[i].bindCursor();
				this.menuItems[i].bindRollOver();
			}
		}
	};
	this.unbindControls = function() {		
		this.unbindAnimateTo();
		this.unbindCursor();
		for(i=0;i<this.menuItems.length;i++) {
			this.menuItems[i].unbindAnimateTo();
			this.menuItems[i].unbindCursor();
			this.menuItems[i].unbindRollOver();
		}
	};
	
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////		
	this.imageminx = _x;
	this.imageminy = _y;
	this.menuminx = this.imageminx + 5500;
	this.menuminy = this.imageminy - 10300;
	this.itemSpacing = 800;	
	this.itemsx = 1500;
	this.currItemY = 1700;
	this.menuItems = new Array();	
	this.images = new Array();
	this.loaded = false;
	
	//add the shell and container for this photo so we can transform it easily		
	this.imageShell = Canvuz.canvas.svg.group(Canvuz.canvas.masterContainer, {transform:'translate('+this.imageminx+', '+this.imageminy+')'});	
	this.imageContainer = Canvuz.canvas.svg.group(this.imageShell);	
	this.shell= Canvuz.canvas.svg.group(Canvuz.canvas.masterContainer, {transform:'translate('+this.menuminx+', '+this.menuminy+')'});
	this.container = Canvuz.canvas.svg.group(this.shell);		
	
	this.drawPicStack();
	this.drawInfo();	
	this.populateMenu();		
};

