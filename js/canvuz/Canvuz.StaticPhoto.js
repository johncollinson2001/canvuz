Canvuz.StaticPhoto = function(_x, _y, _width, _height, _rotation, _filename, _container) {									
	//DRAW CONSTRUCTS
	//////////////////////////////////////////////////////////////////////////////////////////////			
	//draw the photos shadow effect
	this.drawShadow = function() {			
		Canvuz.canvas.drawSVG().rect(this.container, 0, 0, (this.width + (this.FRAME_PADDING_WIDTH * 2)), (this.height + (this.FRAME_PADDING_HEIGHT * 2)), 0, 0, {
			fill:'black', 
			fillOpacity:'0.4'
		});	
	};

	//draw the photos white polaroid style frame
	this.drawFrame = function() {								
		Canvuz.canvas.drawSVG().rect(this.container, (0 - this.FRAME_PADDING_WIDTH), (0 - this.FRAME_PADDING_WIDTH), this.width + (this.FRAME_PADDING_WIDTH * 2) , this.height + (this.FRAME_PADDING_HEIGHT * 2), 0, 0, {
			fill:Canvuz.canvas.POLAROID_COLOUR,
			stroke:'black',
			strokeWidth: '5px'
		})
	};
	
	//draw the photo on the canvas
	this.drawImage = function() {	
		var imagepath = this.createImagePath();
		this.image = Canvuz.canvas.drawSVG().image(this.container, 0, (this.FRAME_PADDING_WIDTH), this.width, this.height, imagepath);
	};	
	
	//create the image path which will change based on the screen factor
	this.createImagePath = function() {
		var imagepath = Canvuz.canvas.IMGRESIZE_PATH;
		imagepath = imagepath + '?width=' + (this.width);
		imagepath = imagepath + '&height=' + (this.height);
		imagepath = imagepath + '&quality=' + '50';
		imagepath = imagepath + '&image=' + this.IMGRESIZE_IMAGE_PATH;
		
		return imagepath;
	};			
			
	//CONSTRUCTOR	
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.rotation = _rotation;
	this.filename = _filename;	
	this.image = null;		

	this.IMGRESIZE_IMAGE_PATH = Canvuz.canvas.IMAGE_DIRECTORY+this.filename;	
	
	//add the shell and container for this photo so we can transform it easilys
	this.shell = Canvuz.canvas.svg.group(_container, {transform:'translate('+this.x+', '+this.y+')'});
	this.container = Canvuz.canvas.svg.group(this.shell, {transform:'rotate('+this.rotation+', '+(this.width/2)+', '+(this.height/2)+')'});
	
	this.FRAME_PADDING_WIDTH = this.width/30;
	this.FRAME_PADDING_HEIGHT = this.height/12;
	
	this.drawShadow();
	this.drawFrame();
	if(this.filename!='') {
		this.drawImage();
	}
};

