//Global index
var index = 0;

//Increment index	
function incrementIndex()
{
	index = (index + 1).mod(images.length);
}

//Decrement index
function decrementIndex()
{
	index = (index - 1).mod(images.length);
}

//Script runs when window loads.
window.addEventListener('load', function ()
{
	//Set initial images
	document.getElementById("img_over").src = images[index];
	document.getElementById("img_under").src = images[index + 1];

	//Left-back button.
	document.querySelector("#left").onclick = function()
	{
		document.getElementById("img_over").classList.add("fade_effect");	//Implement fade effect.
		document.getElementById("img_over").style.opacity = 0;				//Fade out top image.
		decrementIndex();													//Decrease index.
		document.getElementById("img_under").src = images[index];			//Set bottom image to match current index.
	};
	
	//Right-back button.
	document.querySelector("#right").onclick = function()
	{
		document.getElementById("img_over").classList.add("fade_effect");	//Implement fade effect.
		document.getElementById("img_over").style.opacity = 0;				//Fade out top image.
		incrementIndex();													//Decrease index.
		document.getElementById("img_under").src = images[index];			//Set bottom image to match current index.
	};
	
	//Effect for post-transition.
	document.getElementById("img_over").addEventListener("transitionend", function()
	{
		//Reset opacity of top image to 1 without a fade effect.
		document.getElementById("img_over").classList.remove("fade_effect");
		document.getElementById("img_over").style.opacity = 1;
		
		//Swap top and bottom images.
		var tempSrc = document.getElementById("img_over").src;
		document.getElementById("img_over").src = document.getElementById("img_under").src;
		document.getElementById("img_under").src = tempSrc;
	});
});

//Alternative modulus
Number.prototype.mod = function(n)
{
    return ((this % n) + n) % n;
};