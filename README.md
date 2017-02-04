# Introduction

Canvuz is an interactive photo viewer, with photos laid out out a zoomable and draggable SVG canvas. Photos are arranged into albums, with an interactive menu and main title. 

The canvas animates as you zoom into the albums/photos. There is also an animation timeline and play/stop controls, which automatically moves the canvas view between photos. Comments can also be added to the photos (but they don't persist).

A live demo can be accessed here: http://johncollinson.info/canvuz/.

# Technical stuff

Canvuz is a JavaScript framework, written in 2010 - so before the days of many modern JavaScript frameworks and shortly following the advent of JQuery. It relies on JQuery and JQuery SVG to interact with the SVG dom.

Canvuz is organised as a set of JavaScript objects, which are all instantiated in the Canvuz.load() method (within Canvuz.js). From load() you can get a handle to Canvuz.Canvas.... 

e.g. `var canvas = Canvuz.load();`

....which provides access to all the component parts of Canvuz such as the albums, photos and comments.

The canvas is loaded with static demo data in Canvuz.load(). Modify this method to load Canvuz with your own data.

# Disclaimer

This project is entirely for demo purposes. It isn't production ready, however feel free to make it so! :)