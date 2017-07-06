var surface;
var happy;
var angle = 0;
var isLooping = false;

function drawCanvas() {
    // Get our Canvas element
    surface = document.getElementById("circle");

    if (surface.getContext) {
        // If Canvas is supported, load the image
        happy = new Image();
        happy.onload = loadingComplete;
        happy.src = "circle500.png";
    }else{

    }
}

function loadingComplete(e) {
   //Preload and wait for click
   var surfaceContext = surface.getContext('2d');
   surfaceContext.drawImage(happy, 0, 0);

   $("#callto").fadeIn();
}

function startLoop(){
	if(!isLooping){
		isLooping = true;
		setInterval(loop, 5);
	}
}

function loop() {
    // Each loop we rotate the image
    // Grab the context
    var surfaceContext = surface.getContext('2d');

	//Clear canvas
	surfaceContext.setTransform(1, 0, 0, 1, 0, 0);
	surfaceContext.clearRect(0, 0, surface.width, surface.height);

    // Save the current context
    surfaceContext.save();
    // Translate to the center point of our image
    surfaceContext.translate(happy.width * 0.5, happy.height * 0.5);
    // Perform the rotation
    surfaceContext.rotate(DegToRad(angle));
    // Translate back to the top left of our image
    surfaceContext.translate(-happy.width * 0.5, -happy.height * 0.5);
    // Finally we draw the image
    surfaceContext.drawImage(happy, 0, 0);
    // And restore the context ready for the next loop
    surfaceContext.restore();

    // Increment our rotation angle
    angle+=1.5;
}

function DegToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}










$(document).ready(init);

function init(){
	
	$("#callto").css({"cursor":"pointer"});
	$("#callto").click(function () {
			startLoop();
	});

}