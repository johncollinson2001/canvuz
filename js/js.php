<?php	
	include('../includes/universal.php');
	
	$js = '';
			
	//jquery
	$js .= GetIncludeContents('jquery/jquery-1.4.2.min.js');

	//jquery svg
	$js .= GetIncludeContents('jquery/jquery.svg.min.js');
	$js .= GetIncludeContents('jquery/jquery.svgdom.min.js');
	$js .= GetIncludeContents('jquery/jquery.svganim.min.js');
	
	//jquery plugins
	$js .= GetIncludeContents('jquery/jquery.mousewheel.min.js');
	$js .= GetIncludeContents('jquery/jquery.rightClick.js');
	$js .= GetIncludeContents('jquery/jquery.scrollTo-min.js');
	$js .= GetIncludeContents('jquery/jquery.slider.js');
			
	//canvuz framework
	$js .= GetIncludeContents('canvuz/Canvuz.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Canvas.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Control.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Comments.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Album.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Photo.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Animation.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Animation.Control.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Menu.js');
	$js .= GetIncludeContents('canvuz/Canvuz.Menu.Item.js');	
	$js .= GetIncludeContents('canvuz/Canvuz.Photo.Comments.js');	
	$js .= GetIncludeContents('canvuz/Canvuz.Photo.Comments.Comment.js');	
	$js .= GetIncludeContents('canvuz/Canvuz.StaticPhoto.js');	
	
	//other
	$js .= GetIncludeContents('site.js');
	
	//minify
	// TODO!
		
	header("Content-Type: text/javascript");
	echo $js; 	
?>