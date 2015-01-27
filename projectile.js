/**
 * [intitializeStage description]
 * @return {[type]}
 */
function intitializeStage() {

	var stage = document.getElementById('stage');
	var context = stage.getContext('2d');

	// Set the canvas size
	context.canvas.height = window.innerHeight;
	context.canvas.width = window.innerWidth;

	// Event handlers
	$(window).on('click', function (event) {
		projectil(event.clientX, event.clientY);
	});
}

/**
 * [Projectil description]
 * @param {[type]}
 * @param {[type]}
 */
function projectil(x, y) {

	var stage = document.getElementById('stage');
	var gravity = 0.3;
	var bounce = 0.7;
	var radius = 30;

	if (stage.getContext) {

	    var context = stage.getContext('2d');

		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	  }

	  setInterval(update, 1000/60);
}

function update() {
	console.log('a')
	// initialise position and velocity of ball
	var g = 0.1;
	var x = 50;
	var y = 50;
	var vx = 2;
	var vy = 0;
	var canvas = document.getElementById('stage');
	var radius = 30;
  // update velocity
  vy += g; // gravity

  // update position
  x += vx;
  y += vy;

  // handle bouncing
  if (y > canvas.height - radius){
    y = canvas.height - radius;
    vy *= -fac;
  }

  // wrap around
  if (x > canvas.width + radius){
    x = -radius;
  }

  // update the ball
  projectil();
};

/**
 * [initialize description]
 * @return {[type]}
 */
function initialize() {
	intitializeStage();
}


(function () {
	initialize();
}())