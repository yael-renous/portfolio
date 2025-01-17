
//================================= global vars

var _num;    
var _angnoise, _radiusnoise;
var _xnoise, _ynoise;
var _angle;
var _radius;
var _strokeCol;
var _strokeChange;

//================================= init

function setup() {
	createCanvas(1024, 768);
	smooth(); 
	frameRate(30);

	//clearBackground();
	background(255);
	colorMode(HSB, 360, 255, 255);
	_num = 10;    
	_angle = -PI/2;
	_radius = 100;
	_strokeCol = 254;
	_strokeChange = -1;
	_angnoise = random(10);
	_radiusnoise = random(10);
	_xnoise = random(10);
	_ynoise = random(10);
}

function clearBackground() {
	
}

//================================ frame loop

function draw() {

	_radiusnoise += 0.005;
	_radius = (noise(_radiusnoise) * 550) +1;

	_angnoise += 0.005;
	_angle += (noise(_angnoise) * 6) - 3;
	if (_angle > 360) { _angle -= 360; }
	if (_angle < 0) { _angle += 360; }

	// wobble centre
	_xnoise += 0.01;
	_ynoise += 0.01;
	var centreX = mouseX + (noise(_xnoise) * 100) - 50;
	var centreY = mouseY + (noise(_ynoise) * 100) - 50;

	var rad = radians(_angle);
	var x1 = centreX + (_radius * cos(rad));
	var y1 = centreY + (_radius * sin(rad));

	// opposite
	var opprad = rad + PI;
	var x2 = centreX + (_radius * cos(opprad));
	var y2 = centreY + (_radius * sin(opprad)); 

	noFill();
	_strokeCol += _strokeChange;
	if (_strokeCol > 254) { _strokeChange *= -1; }
	if (_strokeCol < 0) { _strokeChange *= -1; }
	//stroke(_strokeCol, 60);
	strokeWeight(1);
	stroke(_angle, _strokeCol, 255, _strokeCol/10 );
	line(x1, y1, x2, y2);
}


//================================= 

//
// function mousePressed(){
//   save('wave_clock.jpg')
// }
