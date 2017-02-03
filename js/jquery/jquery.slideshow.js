function startTicker(delay) {
 setTimeout(ticker(1, delay), delay);
}
function ticker(i, delay) {
 	return (function() {
		//set min height of the frame so it doesnt collapse
		$('#about_blogRollFrame').css('height', $('#about_blogRollFrame').height());
		$('#about_blogRollBg').css('height', $('#about_blogRollBg').height());
		
 		$('#about_blogRollItem' + i).fadeOut(function() {
			$('#about_blogRollFrame').css('height', '100%');
			$('#about_blogRollBg').css('height', '100%');

			if(i==$('.about_blogRollItem').length) { 
				i=1; 
			} else { 
				i+=1; 
			}
			
			$('#about_blogRollItem' + i).fadeIn();
		});
 		
		setTimeout(ticker(i, delay), delay);
 	})
}