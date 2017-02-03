//declare global canvuz namespace
var Canvuz = {};

// Global variables populated when canvuz is loaded, these should be 
// under the canvuz namespace ...
Canvuz.canvas = null;
Canvuz.domain = null;

//load svg onto canvas and initialise
Canvuz.load = function(_elem, _domain) {			
	Canvuz.domain = _domain;
	
	//get element
	var $elem = $('#'+_elem);
	$elem.svg({});	

	//create canvas
	Canvuz.canvas = new Canvuz.Canvas(24000, 16000, 0, 0, 24000, 16000, $elem);		
	
	//add controls
	Canvuz.canvas.addControl(new Canvuz.Control());
	
	//add comments capability
	Canvuz.canvas.addComments(new Canvuz.Comments());
	
	//draw the title
	Canvuz.canvas.drawTitle(1645, 12000, -90, new Array("One man and","his round the world ticket..."), new Array(0, 2545), new Array(0, 2200), new Array("Yanone Kaffeesatz, Impact", "Yanone Kaffeesatz, Impact"), new Array(2400, 1600), new Array("000000","000000"), new Array("bold", "bold"));
		
	//album loader
	Canvuz.canvas.addAlbum("Urban Landscapes", "1");				
	
	//photo loader
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/001.jpg", "EITP crowd going nuts!", "1");
	Canvuz.canvas.albums["1"].photos["1"].addComment("This photo is amazing, it makes me wet. What a nice castle. hsdfuidshfiudsf dsfhudsif dsuf hiuds faui", "John Collinson", "Wednesday 25th of August 2010 at 21:20");	
	Canvuz.canvas.albums["1"].photos["1"].addComment("This photo is great, its just bloody great.", "Peter Taylor", "Wednesday 25th of August 2010 at 21:40");	
	Canvuz.canvas.albums["1"].photos["1"].addComment("Yes oh yes, i like this. I really do.", "Helen Collinson", "Wednesday 25th of August 2010 at 13:40");	
	Canvuz.canvas.albums["1"].photos["1"].addComment("Christ, this photo is fucking great.", "George Mclelland", "Wednesday 25th of August 2010 at 16:33");			
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/002.jpg", "Bionic tent going off!", "2", true);
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/003.jpg", "Party time...", "3");
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/004.jpg", "MC Shocker working the crowd... Grr!", "4");
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/005.jpg", "George and his smug grin.", "5");
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/006.jpg", "Jules rocking the hairstyle.", "6");				
	Canvuz.canvas.albums["1"].addPhoto(300, 325, "demo/city/007.jpg", "Warming up.", "7");				
			
	//album loader
	Canvuz.canvas.addAlbum("Coastal Landscapes", "2");				
	
	//photo loader
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/001.jpg", "EITP crowd going nuts!", "1");
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/002.jpg", "Bionic tent going off!", "2");
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/003.jpg", "Party time...", "3");
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/004.jpg", "MC Shocker working the crowd... Grr!", "4");
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/005.jpg", "George and his smug grin.", "5", true);
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/006.jpg", "Jules rocking the hairstyle.", "6");				
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/007.jpg", "Warming up.", "7");
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/008.jpg", "Jules rocking the hairstyle.", "8");				
	Canvuz.canvas.albums["2"].addPhoto(300, 325, "demo/coast/009.jpg", "Warming up.", "9");
	
	//album loader
	Canvuz.canvas.addAlbum("Forest Landscapes", "3");				
	
	//photo loader
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/001.jpg", "EITP crowd going nuts!", "1");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/002.jpg", "Bionic tent going off!", "2");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/003.jpg", "Party time...", "3");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/004.jpg", "MC Shocker working the crowd... Grr!", "4");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/005.jpg", "George and his smug grin.", "5");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/006.jpg", "Jules rocking the hairstyle.", "6", true);				
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/007.jpg", "Warming up.", "7");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/008.jpg", "Jules rocking the hairstyle.", "8");				
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/009.jpg", "Warming up.", "9");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/010.jpg", "Warming up.", "10");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/011.jpg", "Warming up.", "11");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/012.jpg", "Warming up.", "12");
	Canvuz.canvas.albums["3"].addPhoto(300, 325, "demo/forest/013.jpg", "Warming up.", "13");
	
	//album loader
	Canvuz.canvas.addAlbum("Lake Landscapes", "4");				
	
	//photo loader
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/001.jpg", "EITP crowd going nuts!", "1");
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/002.jpg", "Bionic tent going off!", "2", true);
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/003.jpg", "Party time...", "3");
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/004.jpg", "MC Shocker working the crowd... Grr!", "4");
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/005.jpg", "George and his smug grin.", "5");
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/006.jpg", "Jules rocking the hairstyle.", "6");				
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/007.jpg", "Warming up.", "7");
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/008.jpg", "Jules rocking the hairstyle.", "8");				
	Canvuz.canvas.albums["4"].addPhoto(300, 325, "demo/lakes/009.jpg", "Warming up.", "9");
	
	//album loader
	Canvuz.canvas.addAlbum("Mountain Landscapes", "5");				
	
	//photo loader
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/001.jpg", "EITP crowd going nuts!", "1");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/002.jpg", "Bionic tent going off!", "2");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/003.jpg", "Party time...", "3");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/004.jpg", "MC Shocker working the crowd... Grr!", "4");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/005.jpg", "George and his smug grin.", "5");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/006.jpg", "Jules rocking the hairstyle.", "6");				
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/007.jpg", "Warming up.", "7");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/008.jpg", "Jules rocking the hairstyle.", "8", true);				
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/009.jpg", "Warming up.", "9");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/010.jpg", "Warming up.", "10");
	Canvuz.canvas.albums["5"].addPhoto(300, 325, "demo/mountain/011.jpg", "Warming up.", "11");						
	
	//add menu	
	Canvuz.canvas.addMenu();	
	
	//animation loader
	// ...
	
	//this array sets the order to animate the albums				
	albums = new Array();
	albums[0] = "1";					
	albums[1] = "2";		
	albums[2] = "3";	
	albums[3] = "4";	
	albums[4] = "5";	
	
	//this array sets the order to animate the photos
	photos = new Array();
	
	photos["1"] = new Array();
	photos["1"][0] = "1";
	photos["1"][1] = "2";	
	photos["1"][2] = "3";
	photos["1"][3] = "4";
	photos["1"][4] = "5";
	photos["1"][5] = "6";
	photos["1"][6] = "7";
	
	photos["2"] = new Array();
	photos["2"][0] = "1";
	photos["2"][1] = "2";	
	photos["2"][2] = "3";
	photos["2"][3] = "4";
	photos["2"][4] = "5";
	photos["2"][5] = "6";
	photos["2"][6] = "7";
	photos["2"][7] = "8";
	photos["2"][8] = "9";
	
	photos["3"] = new Array();
	photos["3"][0] = "1";
	photos["3"][1] = "2";	
	photos["3"][2] = "3";
	photos["3"][3] = "4";
	photos["3"][4] = "5";
	photos["3"][5] = "6";
	photos["3"][6] = "7";
	photos["3"][7] = "8";
	photos["3"][8] = "9";
	photos["3"][9] = "10";
	photos["3"][10] = "11";
	photos["3"][11] = "12";
	photos["3"][12] = "13";
	
	photos["4"] = new Array();
	photos["4"][0] = "1";
	photos["4"][1] = "2";	
	photos["4"][2] = "3";
	photos["4"][3] = "4";
	photos["4"][4] = "5";
	photos["4"][5] = "6";
	photos["4"][6] = "7";
	photos["4"][7] = "8";
	photos["4"][8] = "9";
	
	photos["5"] = new Array();
	photos["5"][0] = "1";
	photos["5"][1] = "2";	
	photos["5"][2] = "3";
	photos["5"][3] = "4";
	photos["5"][4] = "5";
	photos["5"][5] = "6";
	photos["5"][6] = "7";
	photos["5"][7] = "8";
	photos["5"][8] = "9";
	photos["5"][9] = "10";
	photos["5"][10] = "11";
	
	Canvuz.canvas.addAnimation(new Canvuz.Animation(albums, photos));	
};

Canvuz.getArrayLength = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};