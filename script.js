let cityImg;
let wall;
let roof;
let airImg;
let busImg;
let sideWalkImg;
let crossWalkImg;
let speedBumpImg;
let newBumpImg;
let lampImg;
let textArea;
let bus;
let sideWalk;
let screen = 0;
let air;
let crossWalk;
let speedBump;
let lamp;
let busTwo;
let speedBumpTwo;

//0 (uninteracted) 1 (interacted) 2 (fixed)
let state = {
  bus: 0,
  sideWalk: 0,
  air: 0,
  crossWalk: 0,
  lamp: 0,
  speedBump: 0,
};

function drawSideWalk() {
  sideWalk = createSprite(200, 555, 77, 26);
  sideWalk.image = sideWalkImg;
  sideWalk.collider = "static";
}

function drawBus() {
  bus = createSprite(270, 255, 95, 20);
  bus.collider = "static";
  bus.image = busImg;
}

function drawBusTwo() {
  busTwo = createSprite(110, 240, 96, 25);
  busTwo.collider = "static";
  busTwo.image = newBusImg;
}

function drawAir() {
  air = createSprite(190, 150, 85, 20);
  air.image = airImg;
  air.collider = "static";
}
function drawCrossWalk() {
  crossWalk = createSprite(450, 160, 175, 20);
  crossWalk.collider = "static";
  crossWalk.image = crossWalkImg;
}
function drawSpeedBump() {
  speedBump = createSprite(400, 325, 175, 20);
  speedBump.collider = "static";
  speedBump.image = speedBumpImg;
}
function drawLamp() {
  lamp = createSprite(255, 400, 175, 20);
  lamp.collider = "static";
  lamp.image = lampImg;
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
function drawWall(x, y) {
  wall = new Sprite();
  wall.x = x;
  wall.y = y;
  wall.w = 1;
  wall.h = 1500;
  wall.color = "black";
  wall.collider = "static";
}
function drawRoof() {
  roof = new Sprite();
  roof.x = 630;
  roof.y = 0;
  roof.w = 1500;
  roof.h = 1;
  roof.color = "black";
  roof.collider = "static";
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
  newBusImg = loadImage("assets/bus2.png", {
    frameSize: [256, 256],
  });
  airImg = loadImage("assets/air.png", {
    frameSize: [256, 256],
  });
  sideWalkImg = loadImage("assets/sidewalk.png", {
    frameSize: [256, 256],
  });
  speedBumpImg = loadImage("assets/speedbump.png", {
    frameSize: [256, 256],
  });
  newBumpImg = loadImage("assets/speedbump2.png", {
    frameSize: [256, 256],
  });
  lampImg = loadImage("assets/lamp.png", {
    frameSize: [256, 256],
  });
  crossWalkImg = loadImage("assets/crosswalk.png", {
    frameSize: [256, 256],
  });
}

function setup() {
  createCanvas(630, 580);
  player = new Sprite();
  player.addAni("walk", playerImg, 6);
  player.diameter = 50;
  player.collider = "dynamic";
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
    player.vel.y = 0;
  } else if (kb.pressing("right")) {
    player.vel.x = 1.5;
    player.vel.y = 0;
  } else if (kb.pressing("up")) {
    player.vel.y = -1.5;
    player.vel.x = 0;
  } else if (kb.pressing("down")) {
    player.vel.y = 1.5;
    player.vel.x = 0;
  } else {
    player.vel.y = 0;
    player.vel.x = 0;
  }

  if (
    state.sideWalk == 2 &&
    state.bus == 2 &&
    state.crossWalk == 2 &&
    state.air == 2 &&
    state.speedBump == 2 &&
    state.lamp == 2
  ) {
    endScreen();
    allSprites.remove();
  }
}

function drawScreenOneSprite() {
  if (state.sideWalk != 2) drawSideWalk();
  if (state.bus != 2) drawBus();
  if (state.bus == 2) drawBusTwo();
}
function drawScreenTwoSprite() {
  if (state.crossWalk != 2) drawCrossWalk();
  if (state.air != 2) drawAir();
}
function drawScreenThreeSprite() {
  if (state.speedBump != 2) drawSpeedBump();
  if (state.lamp != 2) drawLamp();
}

function screenOne() {
  // Check if the player is outside the canvas boundaries
  if (player.position.x < 0) {
    // Player went to the left side of the screen
    screen = 2;
    player.position.x = 625;
    drawScreenTwoSprite();
    drawWall();
    wall.x = 0;
    wall.y = 580;
    bus.remove();
    if (state.bus == 2) {
      busTwo.remove();
    }
    sideWalk.remove();
    textArea.text = "Where to next?";
  } else if (player.position.x > width) {
    // Player went to the right side of the screen
    screen = 3;
    player.position.x = 0;
    drawWall();
    wall.x = 630;
    wall.y = 0;
    bus.remove();
    if (state.bus == 2) {
      busTwo.remove();
    }
    sideWalk.remove();
    drawScreenThreeSprite();
    textArea.text = "Where to next?";
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
  if (mouse.presses() && distanceB < 50) {
    textArea.text = "Much better!";
    bus.remove();
    drawBusTwo();
    state.bus = 2;
  } else if (distanceB < 50 && state.bus == 0) {
    textArea.text =
      "Public transportation allows travel for citizens in a more eco-friendly and convenient way. Click to fix!";
    state.bus = 1;
  } else if (mouse.presses() && distanceSW < 150) {
    textArea.text = "Much better!";
    sideWalk.remove();
    state.sideWalk = 2;
  } else if (distanceSW < 150 && state.sideWalk == 0) {
    textArea.text =
      "Well designed sidewalks help people walk to their destinations safely and efficiently. Click to fix!";
    state.sideWalk = 1;
  }
  if (state.sideWalk == 2 && state.bus == 2 && screen != 2 && screen != 3) {
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
    drawTextArea("How can the city be more walkable?");
    textArea.textSize = 14;
    drawRoof();
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
    wall.remove();
  }
  const distanceAir = calcPoints(
    player.position.x - air.position.x,
    player.position.y - air.position.y
  );
  const distanceCW = calcPoints(
    player.position.x - crossWalk.position.x,
    player.position.y - crossWalk.position.y
  );
  if (mouse.presses() && distanceCW < 100) {
    textArea.text = "Much better!";
    crossWalk.remove();
    state.crossWalk = 2;
  } else if (distanceCW < 100 && state.crossWalk == 0) {
    textArea.text =
      "Cross walks improve visibility, speed is reduced, and pedestrians are kept safe. Click to fix!";
    state.crossWalk = 1;
  } else if (mouse.presses() && distanceAir < 60) {
    textArea.text = "Much better!";
    air.remove();
    state.air = 2;
  } else if (distanceAir < 60 && state.air == 0) {
    textArea.text =
      "Less pollution improves air quality and provides a cleaner environment to walk around.  Click to fix!";
    state.air = 1;
  }
  if (state.crossWalk == 2 && state.air == 2) {
    textArea.text = "All areas have been fixed here!";
  }
}

function screenThree() {
  image(cityImg, 0, 0, 630, 500);
  if (player.position.x < 0) {
    screen = 1;
    player.position.x = 625;
    drawScreenOneSprite();
    lamp.remove();
    speedBump.remove();
    wall.remove();
  }
  const distanceSB = calcPoints(
    player.position.x - speedBump.position.x,
    player.position.y - speedBump.position.y
  );
  const distanceL = calcPoints(
    player.position.x - lamp.position.x,
    player.position.y - lamp.position.y
  );
  if (mouse.presses() && distanceL < 50) {
    textArea.text = "Much better!";
    lamp.remove();
    state.lamp = 2;
  } else if (distanceL < 50 && state.lamp == 0) {
    textArea.text =
      "Well-lit sidewalks help pedestrians navigate and reduce the risk of accidents. Click to fix!";
    state.lamp = 1;
  } else if (mouse.presses() && distanceSB < 80) {
    textArea.text = "Much better!";
    speedTwo = createSprite(450, 245, 96, 25);
    speedTwo.collider = "static";
    speedTwo.image = newBumpImg;
    state.speedBump = 2;
  } else if (distanceSB < 80 && state.speedBump == 0) {
    textArea.text =
      "Implementing speed bumps calms traffic and ensures pedestrian safety. Click to fix!";
    state.speedBump = 1;
  }
  if (state.speedBump == 2 && state.lamp == 2) {
    textArea.text = "All areas have been fixed here!";
  }
}

function endScreen() {
  screen = 4;
  background("black");
  textAlign(CENTER);
  text("YAY! THE CITY HAS IMPROVED ITS WALKABILITY", 300, 265);
  fill("white");
}
