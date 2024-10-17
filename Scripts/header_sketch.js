let font1, font2;
const fontSize = 300;
let yael, renous;
let balls = [];
let speed;
let aboutBox;
function preload() {
    // Remove the loadFont call as we're using a system font now
}

function setup() {
    // Get the parent element of the canvas
    let parentElement = document.getElementById('sketch-container');

    // Create the canvas with the parent element's dimensions
    let canvas = createCanvas(parentElement.offsetWidth, parentElement.offsetHeight);
    console.log(parentElement.offsetWidth, parentElement.offsetHeight);
    console.log(window.innerWidth, window.innerHeight);
    // Move the canvas inside the parent element
    canvas.parent('sketch-container');

    textAlign(CENTER, CENTER);

    font1 = 'Georgia';
    font2 = 'Georgia';

    yael = createLetters("Yael", 100);
    renous = createLetters("Renous", height - 100);

    // Create the about box
    createAboutBox();

    // Add event listener for window resize
    window.addEventListener('resize', windowResized);

    // Create speed slider
    speed = createSlider(0, 2, 0.5, 0.01);
    speed.position(10, 10);

    // Create initial balls
    for (let i = 0; i < 5; i++) {
        balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
    }
}

function draw() {
    background('white');

    // Draw and update balls
    for (let ball of balls) {
        ball.draw();
        ball.tick(speed.value());
    }
    fill('black');
    drawLetters(yael);
    drawAboutBox();
    drawLetters(renous);
}

function createLetters(word, baseY) {
    return word.split('').map((char, i) => ({
        char: char,
        x: (i + 0.5) * width / word.length,
        y: baseY + random(-20, 20),
        rotation: random(-PI / 6, PI / 6),
        font: random() > 0.5 ? font1 : font2,
        isBlurry: random() > 0.7,
        size: fontSize
    }));
}

function drawLetters(letters) {
    letters.forEach(letter => {
        push();
        translate(letter.x, letter.y);

        // Check if mouse is hovering over this letter
        let d = dist(mouseX, mouseY, letter.x, letter.y);
        if (d < fontSize / 2) {
            // Hover effect
            rotate(0);
            textSize(letter.size * 1.5);
        } else {
            // Normal state
            rotate(letter.rotation);
            textSize(letter.size);
            if (letter.isBlurry) {
                drawingContext.filter = 'blur(2px)';
            }
        }

        textFont(letter.font);
        text(letter.char, 0, 0);

        drawingContext.filter = 'none';
        pop();
    });
}

class Ball {
    constructor(ballX = 0, ballY = 0, speedX = 0, speedY = 0, drag = 0.5, bounciness = 6, gravity = 0.5) {
        this.ballX = ballX;
        this.ballY = ballY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.drag = drag;
        this.bounciness = bounciness;
        this.gravity = gravity;
    }

    draw() {
        fill('red');
        textSize(80);
        text('*', this.ballX, this.ballY);
    }

    tick(time = 1) {
        // Move Ball
        this.ballX += this.speedX * time;
        this.ballY += this.speedY * time;

        // Air Drag Ball
        this.speedX *= (1 - this.drag * time);
        this.speedY *= (1 - this.drag * time);

        // Gravity Ball
        this.speedY += this.gravity * time;

        // Bounce Ball
        if (this.ballX < 0 || this.ballX > width) {
            this.speedX = -this.speedX * this.bounciness;
            this.ballX = constrain(this.ballX, 0, width);
        }
        if (this.ballY < 0 || this.ballY > height) {
            this.speedY = -this.speedY * this.bounciness;
            this.ballY = constrain(this.ballY, 0, height);
        }
    }
}

function windowResized() {
    let parentElement = document.getElementById('sketch-container');
    resizeCanvas(parentElement.offsetWidth, parentElement.offsetHeight);

    // Recalculate positions of letters and about box
    yael = createLetters("Yael", 100);
    renous = createLetters("Renous", height - 100);
    createAboutBox();
}

var originalX = -1;
var originalY = -1;

function mousePressed() {
    originalX = mouseX;
    originalY = mouseY;
    describe("A new ball is being created.");
}

function mouseReleased() {
    balls.push(new Ball(originalX, originalY, mouseX - originalX, mouseY - originalY, 0.05, 0.8, 1));
    originalX = -1;
    originalY = -1;
    describe("A new ball was created at (${mouseX},${mouseY})");
}

// Add this new function
function createAboutBox() {
    console.log("Creating about box");
    let boxWidth = width * 0.4;
    let boxHeight = height * 0.3;
    let boxX = (width - boxWidth) / 2;
    let boxY = (height - boxHeight) / 2;

    aboutBox = {
        x: boxX,
        y: boxY,
        width: boxWidth,
        height: boxHeight,
        text: "Creative technologist, creates interactive installations and experiences. Make artsy things using techy things."
    };
}

// Add this new function
function drawAboutBox() {
    if (!aboutBox) return;
 //   console.log(aboutBox.width, aboutBox.height);
    push();
    fill(255, 255, 255, 200);  // Semi-transparent white
    stroke(0);
    rect(aboutBox.x, aboutBox.y, aboutBox.width, aboutBox.height,200,200,200,200);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textFont('Arial');
//    text(aboutBox.text, aboutBox.x + 20, aboutBox.y + 20, aboutBox.width - 40, aboutBox.height - 40);
    pop();
}
