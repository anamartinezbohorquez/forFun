let hearts = [];
let target;
let popmax;
let mutationRate;
let population;

function setup() {
  createCanvas(windowWidth, windowHeight);
  target = "will you be my valentine";
  popmax = 200;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, popmax);

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 3);
    let heartColor = color(255, 192, 203); 
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


  population.naturalSelection();
  population.generate();
  population.calcFitness();
  population.evaluate();

  if (population.isFinished()) {
    noLoop();
  }

  population.display();
}

class Population {
  constructor(target, mutationRate, popmax) {
    this.target = target;
    this.mutationRate = mutationRate;
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;
    this.targetReached = false;

    for (let i = 0; i < popmax; i++) {
      this.population[i] = new DNA(this.target.length);
    }
  }

  naturalSelection() {
    this.matingPool = [];

    for (let i = 0; i < this.population.length; i++) {
      let fitness = this.population[i].calcFitness(this.target);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  evaluate() {
    let worldrecord = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    if (worldrecord === 1) {
      this.finished = true;
      this.targetReached = true;
      // Update all phrases to match the target
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].genes = this.target.split('');
      }
    }

    if (this.finished === false) {
      this.display();
    }
  }

  isFinished() {
    return this.finished;
  }

  display() {
    let numRows = 20;
    let numCols = 1;
    let phraseWidth = width / numCols;
    let phraseHeight = height / numRows;

    let x = 0;
    let y = 0;

    textSize(20);

    for (let i = 0; i < this.population.length; i++) {
      let phrase = this.population[i].getPhrase();
      fill(0);
      text(phrase, x, y, phraseWidth, phraseHeight);
      x += phraseWidth;
      if (x >= width) {
        x = 0;
        y += phraseHeight;
      }
    }
  }
}

class DNA {
  constructor(num) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = this.newChar();
    }
  }

  newChar() {
    let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
    return this.fitness;
  }

  crossover(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = this.newChar();
      }
    }
  }

  getPhrase() {
    return this.genes.join("");
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
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let r = 1;
      let hx = this.x + 16 * pow(sin(a), 3) * this.size;
      let hy = this.y - (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) * this.size;
      vertex(hx, hy);
    }
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
