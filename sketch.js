let hearts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 30);
    let heartColor = color(random(255), random(100, 200), random(200, 255));
    let heart = new Heart(x, y, size, heartColor);
    hearts.push(heart);
  }
}

function draw() {
  background(255);
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].display();
    hearts[i].move();
  }
}

class Heart {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  display() {
    fill(this.color);
    noStroke();
    beginShape(); // Begin the custom shape
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let r = 1;
      let hx = this.x + 16 * pow(sin(a), 3) * this.size; // Scale according to heart size
      let hy = this.y - (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) * this.size; // Scale according to heart size
      vertex(hx, hy);
    }
    endShape(CLOSE); // End the custom shape
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }
}
