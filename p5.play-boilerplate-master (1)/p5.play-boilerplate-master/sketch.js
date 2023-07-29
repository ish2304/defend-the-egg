// Global variables
let egg;
let birds = [];
let score = 0;
let highScore = 0;

function setup() {
  createCanvas(800, 600);
  egg = new Egg(width / 2, height / 2);

  // Spawn birds at random intervals
  setInterval(spawnBird, 1000);
}

function draw() {
  background(220);

  egg.display();

  // Display and update each bird
  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].display();
    birds[i].update();

    // Check if a bird has reached the egg
    if (birds[i].reachedEgg()) {
      birds.splice(i, 1); // Remove the bird
      score--; // Decrement score
    }
  }

  // Display the score
  textSize(24);
  text("Score: " + score, 20, 30);

  // Update high score
  if (score > highScore) {
    highScore = score;
  }

  // Display the high score
  text("High Score: " + highScore, 20, 60);

  // Check if the game should be reset
  if (score < -5) {
    resetGame();
  }
}

function resetGame() {
  // Clear the birds and reset the score
  birds = [];
  score = 0;
}

function spawnBird() {
  let side = floor(random(4)); // Randomly select a side from where the bird will come

  let x, y;
  if (side === 0) { // Top side
    x = random(width);
    y = -50;
  } else if (side === 1) { // Right side
    x = width + 50;
    y = random(height);
  } else if (side === 2) { // Bottom side
    x = random(width);
    y = height + 50;
  } else { // Left side
    x = -50;
    y = random(height);
  }

  let bird = new Bird(x, y);
  birds.push(bird);
}

function mouseClicked() {
  // Check if the mouse click hits any bird
  for (let i = birds.length - 1; i >= 0; i--) {
    if (birds[i].contains(mouseX, mouseY)) {
      birds.splice(i, 1); // Remove the bird
      score++; // Increment score
      break; // Exit the loop since we don't need to check other birds
    }
  }
}

class Egg {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speed = 2;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  update() {
    let angle = atan2(egg.y - this.y, egg.x - this.x);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }

  contains(x, y) {
    // Check if the given (x, y) coordinates are inside the bird's circle
    let d = dist(x, y, this.x, this.y);
    return d < this.radius;
  }

  reachedEgg() {
    // Check if the bird reached the egg
    let d = dist(egg.x, egg.y, this.x, this.y);
    return d < (egg.radius + this.radius) / 2;
  }
}
