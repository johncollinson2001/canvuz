Canvuz.Photo.Comments = function(_x, _y, _width, _height) {																			
	//OTHER METHODS
	/////////////////////////////////////////////////////////////////////////////////////////////	
	this.addComment = function(_comment, _author, _date) {	
		this.comments[this.comments.length] = new Canvuz.Photo.Comments.Comment(_comment, _author, _date)
	};
	
	//LOADING METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.show = function() {
		var scrPhotoX = ((Canvuz.canvas.viewwidth/2) / Canvuz.canvas.scrfactorx);
		var scrPhotoY = (((Canvuz.canvas.viewheight-80)/2) / Canvuz.canvas.scrfactory);
		var scrPhotoWidth = (this.width / Canvuz.canvas.scrfactory);				
		var scrPhotoHeight = (this.height / Canvuz.canvas.scrfactory);
		
		var scrx = scrPhotoX - (scrPhotoWidth/2);
		var scry = scrPhotoY - (scrPhotoHeight/2);
		var scrwidth = scrPhotoWidth;
		var scrheight = scrPhotoHeight;
				
		Canvuz.canvas.comments.load(scrx, scry, scrwidth, scrheight, this.comments);		
	};
	this.hide = function() {
		Canvuz.canvas.comments.unload();		
	};
	this.showHide = function() {
		if($(Canvuz.canvas.comments.div).css('display')!='none') {
			this.hide();
		} else {
			this.show();
		}
	};
	
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.minx = _x;
	this.miny = _y;
	this.width = _width;
	this.height = _height;			
	this.comments = new Array();
	
	//CONSTANTS		
};

