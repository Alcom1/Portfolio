// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function()
{
	console.log("sound.js module loaded");
	var pShootAudio = undefined;	//Audio for player firing
	
	//Init
	function init()
	{
		pShootAudio = document.querySelector("#pShootAudio");
		pShootAudio.volume = 0.3;
	}
	
	//Play background audio.
	function playBGAudio()
	{

	}
	
	//Stop and reset background audio.
	function stopBGAudio()
	{

	}
	
	//Pause pause background audio.
	function pauseBGAudio()
	{

	}
	
	//Play Player shooting sfx.
	function playPShootAudio()
	{
		pShootAudio.pause();
		pShootAudio.currentTime = 0;
		pShootAudio.play();
	}

	//Play Turret shooting sfx.
	function playTShootAudio()
	{

	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return{
		init : init,
		playBGAudio : playBGAudio,
		stopBGAudio : stopBGAudio,
		pauseBGAudio : pauseBGAudio,
		playPShootAudio : playPShootAudio,
		playTShootAudio : playTShootAudio,
	}
}());