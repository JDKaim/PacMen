let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let direction = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  position = {x: Math.random() * (window.innerWidth - newimg.width), y: Math.random() * (window.innerHeight - newimg.height)};

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    if(item.direction == 0) {
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;
    } else if(item.direction == 1) {
      item.position.x += item.velocity.x;
      item.position.y -= item.velocity.y;
    } else if(item.direction == 2) {
      item.position.x -= item.velocity.x;
      item.position.y += item.velocity.y;
    } else {
      item.position.x -= item.velocity.x;
      item.position.y -= item.velocity.y;
    }
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if(item.position.x + item.newimg.width + 10 >= windowWidth) {
    if(item.direction == 0) {
      item.newimg.src = './images/PacMan3.png';
      item.direction = 2;
    } else {
      item.newimg.src = './images/PacMan3.png';
      item.direction = 3;
    }
  }
  if(item.position.y + item.newimg.height + 10>= windowHeight) {
    if(item.direction == 0) {
      item.direction = 1;
    } else {
      item.direction = 3;
    }
  }
  if(item.position.x <= 0) {
    if(item.direction == 3) {
      item.newimg.src = './images/PacMan1.png';
      item.direction = 1;
    } else {
      item.newimg.src = './images/PacMan1.png';
      item.direction = 0;
    }
  }
  if(item.position.y <= 0) {
    if(item.direction == 3) {
      item.direction = 2;
    } else {
      item.direction = 0;
    }
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}