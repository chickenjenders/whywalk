let cityImg;
let textArea;
let bus;
let sideWalk;
let score = 0;
let screen = 0;
let air;
let crossWalk;
let interactedWithSW = false;
let busTwo;
let interactedWithB = false;
//0 (uninteracted) 1 (interacted) 2 (fixed)
let state = {
  bus: 0,
  sideWalk: 0,
};

function drawSideWalk() {
  sideWalk = createSprite(200, 470, 17, 16);
  sideWalk.color = "#BAC0D0";
  sideWalk.collider = "static";
}

function drawBus() {
  bus = createSprite(258, 229, 95, 20);
  bus.collider = "static";
  bus.color = "white";
}

function drawAir() {
  air = createSprite(200, 180, 85, 20);
  air.image = airImg;
  air.collider = "static";
}
function drawCrossWalk() {
  crossWalk = createSprite(458, 229, 175, 20);
  crossWalk.collider = "static";
  crossWalk.color = "gray";
}

function drawTextArea(text) {
  textArea = new Sprite();
  textArea.w = 630;
  textArea.h = 100;
  textArea.y = 530;
  textArea.color = "#D0D3D4";
  textArea.collider = "static";
  textArea.textSize = 17;
  textArea.text = text;
}

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
  airImg = loadImage("assets/air.png", {
    frameSize: [256, 256],
  });
}

function setup() {
  createCanvas(630, 580);
  player = new Sprite();
  player.addAni("walk", playerImg, 6);
  player.diameter = 50;
  player.rotationLock = true;
  player.text = "Player";
}

function draw() {
  switch (screen) {
    case 0:
      menuScreen();
      break;
    case 1:
      screenOne();
      break;
    case 2:
      screenTwo();
      break;
    case 3:
      screenThree();
      break;
    case 4:
      endScreen();
      break;
  }

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

  if (score == 6) {
    endScreen();
  }
}

function drawScreenOneSprite() {
  if (state.sideWalk != 2) drawSideWalk();
  if (state.bus != 2) drawBus();
}

function screenOne() {
  // Check if the player is outside the canvas boundaries
  if (player.position.x < 0) {
    // Player went to the left side of the screen
    screen = 2;
    player.position.x = 625;
    bus.remove();
    sideWalk.remove();
    drawAir();
    drawCrossWalk();
    textArea.text = "Where to next?";
  } else if (player.position.x > width) {
    // Player went to the right side of the screen
    screen = 3;
    player.position.x = 0;
    bus.remove();
    sideWalk.remove();
  }
  image(cityImg, 0, 0, 630, 500);
  const distanceSW = calcPoints(
    player.position.x - sideWalk.position.x,
    player.position.y - sideWalk.position.y
  );
  const distanceB = calcPoints(
    player.position.x - bus.position.x,
    player.position.y - bus.position.y
  );
  if (bus.mouse.presses() && distanceB < 50) {
    console.log("yo");
    textArea.text = "Much better!";
    bus.remove();
    busTwo = createSprite(115, 221, 96, 25);
    busTwo.collider = "static";
    busTwo.image = busImg;
    state.bus = 2;
    console.log(score);
  } else if (distanceB < 50 && interactedWithB == false) {
    textArea.text =
      "Public transportation allows travel for all people in a more eco-friendly and convenient way. Click to fix!";
    interactedWithB = true;
    state.bus = 1;
  } else if (sideWalk.mouse.presses() && distanceSW < 50) {
    console.log("yo");
    textArea.text = "Much better!";
    sideWalk.remove();
    state.sideWalk = 2;
  } else if (distanceSW < 50 && state.sideWalk == 0) {
    console.log("yeet");
    textArea.text =
      "Well designed and consistent sidewalks help people walk to their destinations safely and efficiently. Click to fix!";
    state.sideWalk = 1;
  }
  if (state.sideWalk == 2 && state.bus == 2) {
    console.log("ajhkh");
    textArea.text = "All areas have been fixed here!";
  }
}

function calcPoints(a, b) {
  return Math.sqrt(a * a + b * b);
}

function menuScreen() {
  background("black");
  textAlign(CENTER);
  text("CLICK ANYWHERE TO START", 300, 265);
  fill("white");

  if (mouseIsPressed) {
    screen = 1;
    drawScreenOneSprite();
    drawTextArea("How can cities become more walkable?");
    textArea.textSize = 14;
  }
}

function screenTwo() {
  image(cityImg, 0, 0, 630, 500);

  if (player.position.x > width) {
    // Player went to the right side of the screen
    screen = 1;
    player.position.x = 0;
    drawScreenOneSprite();
    textArea.text = "Where to next?";
    air.remove();
    crossWalk.remove();
  }
}

function screenThree() {
  image(cityImg, 0, 0, 630, 500);
  if (player.position.x < 0) {
    screen = 1;
    player.position.x = 625;
    drawScreenOneSprite();
  }
}

function endScreen() {
  screen = 4;
  background("black");
  textAlign(CENTER);
  text("YOU FIXED THE CITY", 300, 265);
  fill("white");
}
