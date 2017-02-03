Canvuz.Comments = function() {													
	//OTHER METHODS
	//////////////////////////////////////////////////////////////////////////////////////////////	
	this.load = function(_x, _y, _width, _height, _comments) {			
		$(this.div).css('left', _x);
		$(this.div).css('top', _y);
		$(this.div).css('width', _width);
		$(this.div).css('height', _height);
		$(this.divFrame).css('left', _x);
		$(this.divFrame).css('top', _y);
		$(this.divFrame).css('width', _width);
		$(this.divFrame).css('height', _height);
		
		for(i=0;i<_comments.length;i++) {
			var author = $('<span />').attr('class', 'author').text(_comments[i].author);
			var commentstr = $('<span />').attr('class', 'commentstr').text(_comments[i].comment);
			var date = $('<span />').attr('class', 'date').text(_comments[i].date);
			var comment = $('<li />').attr('class', 'comment').append(author).append(commentstr).append(date);
			$(this.list).append(comment);
		}
		this.show();
	};
	this.unload = function() {
		this.hide();				
	}
	
	this.show = function() {			
		var comments = this;
		$(this.div).slideDown(Canvuz.canvas.FADE_SPEED, function() {
			$(comments.list).css('overflow-y', 'auto');
		});
		$(this.divFrame).slideDown(Canvuz.canvas.FADE_SPEED);		
	};
	this.hide = function() {
		$(this.list).css('overflow-y', 'hidden');		
		$(this.div).slideUp(Canvuz.canvas.FADE_SPEED, function() {			
			$('.comment').remove();			
		});
		$(this.divFrame).slideUp(Canvuz.canvas.FADE_SPEED);
	};
	this.fadeOut = function(_speed) {
		var comments = this;
		$(this.div).fadeOut(_speed, function() {
			$('.comment').remove();
			$(comments.input).val('');
		});
		$(this.divFrame).fadeOut(_speed);
	};
	
	this.submitClicked = function() {		
		if($(this.input).val()!='') {
			var author = $('<span />').attr('class', 'author').text('Internet User');
			var commentstr = $('<span />').attr('class', 'commentstr').text($(this.input).val());
			var date = $('<span />').attr('class', 'date').text(this.getDate());
			var comment = $('<li />').attr('class', 'comment').append(author).append(commentstr).append(date).css('display', 'none');
			$(this.list).append(comment);
			$(comment).fadeIn(Canvuz.canvas.FADE_SPEED);
			$(this.list).scrollTo('max', {axis:'y', duration: Canvuz.canvas.FADE_SPEED});
			Canvuz.canvas.albums[Canvuz.canvas.currAlbum].photos[Canvuz.canvas.albums[Canvuz.canvas.currAlbum].currPhoto].addComment($(this.input).val(), 'Internet User', date);
		}
	};
	
	this.getDate = function() {
		var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		var d = new Date();
		var curr_day = d.getDay();
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		var curr_hour = d.getHours();
		var curr_min = d.getMinutes();
		
		var sup;
		if (curr_date == 1 || curr_date == 21 || curr_date ==31) {
		   sup = "st";
		} else if (curr_date == 2 || curr_date == 22) {
		   sup = "nd";
		} else if (curr_date == 3 || curr_date == 23) {
		   sup = "rd";
		} else {
		   sup = "th";
		}		
		
		var minute = curr_min+'';
		if(minute.length==1)
			minute='0'+minute;
		
		return d_names[curr_day] + " " + curr_date + sup + " " + m_names[curr_month] + " " + curr_year + " at " + curr_hour + ":" + minute;
	};
	
	this.list = $('<ul />');
	this.input = $('<input />').attr('type', 'text').keypress(function(_evt){
		if(_evt.keyCode=='13')
			Canvuz.canvas.comments.submitClicked();	
	});
	this.submitImage = $('<img />').attr('src', Canvuz.canvas.IMAGE_DIRECTORY+'icons/comments.png');
	this.submit =  $('<div />').attr('id', 'submitComment').append(this.submitImage).bind('click', function() {
		Canvuz.canvas.comments.submitClicked();
	});
	this.controldiv = $('<div />').attr('id', 'commentsControl').append(this.input).append(this.submit);
	this.div = $('<div />').attr('id', 'comments').append(this.list).append(this.controldiv);
	this.divFrame = $('<div />').attr('id', 'commentsFrame');
			
	$(Canvuz.canvas.elem).parent().append(this.divFrame);
	$(Canvuz.canvas.elem).parent().append(this.div);	
};

