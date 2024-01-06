let hearts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  text('te quiero mucho <3');
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
    beginShape();
    vertex(this.x, this.y - this.size / 2);
    bezierVertex(
      this.x + this.size / 2,
      this.y - this.size / 2,
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.x,
      this.y + this.size
    );
    bezierVertex(
      this.x - this.size / 2,
      this.y + this.size / 2,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.x,
      this.y - this.size / 2
    );
    endShape(CLOSE);
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
