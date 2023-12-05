let player;
let cityImg;
let textArea;
let bus;
let sideWalk;
let score = 0;
let screen = 0;

function preload() {
  playerImg = loadAnimation("assets/Walk.png", {
    frameSize: [48, 48],
    frames: 6,
  });
  cityImg = loadImage("assets/city.png", {
    frameSize: [630, 500],
  });
  busImg = loadImage("assets/bus.png", {
    frameSize: [256, 256],
  });
}

function setup() {
  createCanvas(630, 580);
}

function draw() {
  if (screen == 0) {
    menuScreen();
  } else if (screen == 1) {
    gameScreen();
  } else if (screen == 2) {
    endScreen();
  }
}

function gameScreen() {
  // Create the player and NPC only when the game starts (screen == 1)
  if (!player) {
    player = new Sprite();
    player.addAni("walk", playerImg, 6);
    player.diameter = 50;
    player.rotationLock = true;
    player.text = "Player";
    camera.x = player.x;

    textArea = new Sprite();
    textArea.w = 630;
    textArea.h = 100;
    textArea.y = 530;
    textArea.color = "#D0D3D4";
    textArea.collider = "static";
    textArea.textSize = 17;
    textArea.text = "How can cities become more walkable?";

    bus = createSprite(270, 231, 96, 17);
    bus.collider = "static";
    bus.image = busImg;

    sideWalk = createSprite(200, 470, 17, 16);
    sideWalk.color = "#BAC0D0";
    sideWalk.collider = "static";
  }

  // Check if the player is outside the canvas boundaries
  if (player.position.x < 0) {
    // Player went to the left side of the screen
    screenTwo();
    bus.remove();
    sideWalk.remove();
    player.position.x = 625;
  } else if (player.position.x > width) {
    // Player went to the right side of the screen
    screenThree();
    bus.remove();
    sideWalk.remove();
    player.position.x = 0;
  }

  if (player.position.y < 0) {
    // Player went to the upper side of the screen
    screenFour();
    bus.remove();
    sideWalk.remove();
    player.position.y = 525;
  } else if (player.position.y > height) {
    // Player went to the lower side of the screen
    gameScreen();
    player.position.y = 105;
  }
  // Player ran off the canvas, transition to a new screen (screen 2, for example)

  // Draw game elements here
  image(cityImg, 0, 0, 630, 500);
  if (kb.pressing("left")) {
    player.vel.x = -1.5;
  } else if (kb.pressing("right")) {
    player.vel.x = 1.5;
  } else if (kb.pressing("up")) {
    player.vel.y = -1.5;
  } else if (kb.pressing("down")) {
    player.vel.y = 1.5;
  } else {
    player.vel.y = 0;
    player.vel.x = 0;
  }

  if (player.colliding(bus)) {
    textArea.textSize = 14;
    textArea.text =
      "Public transportation allows travel for all people in a more eco-friendly and convenient way.";
  }

  if (player.colliding(sideWalk)) {
    textArea.textSize = 14;
    textArea.text =
      "Well designed and consistent sidewalks help people walk to their destinations safely and efficiently";
  }
}

function menuScreen() {
  background("black");
  textAlign(CENTER);
  text("CLICK ANYWHERE TO START", 300, 265);
  fill("white");
}

function mousePressed() {
  if (screen == 0) {
    startGame();
  }
}

function startGame() {
  screen = 1;
}

function screenTwo() {
  textArea = new Sprite();
  textArea.w = 630;
  textArea.h = 100;
  textArea.y = 530;
  textArea.color = "#D0D3D4";
  textArea.collider = "static";
  textArea.textSize = 17;
  textArea.text = "Where to next?";
}

function screenThree() {
  textArea = new Sprite();
  textArea.w = 630;
  textArea.h = 100;
  textArea.y = 530;
  textArea.color = "#D0D3D4";
  textArea.collider = "static";
  textArea.textSize = 17;
  textArea.text = "Where to next?";
}
function screenFour() {
  textArea = new Sprite();
  textArea.w = 630;
  textArea.h = 100;
  textArea.y = 530;
  textArea.color = "#D0D3D4";
  textArea.collider = "static";
  textArea.textSize = 17;
  textArea.text = "Where to next?";
}

function endScreen() {
  background("black");
  textAlign(CENTER);
  text("YOU FIXED THE CITY", 300, 265);
  fill("white");
}
