let cityImg;
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
let interactedWithSW = false;
let busTwo;
let speedBumpTwo;
let interactedWithB = false;
let interactedWithL = false;
let interactedWithSB = false;
let interactedWithCW = false;
let interactedWithAir = false;
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
  //textArea.textWrap(WORD);
  //textArea.textAlign(LEFT, TOP);
  //textArea.textLeading(20);
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
  player.collider = "kinematic";
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
    bus.remove();
    busTwo.remove();
    speedBumpTwo.remove();
    sideWalk.remove();
    drawAir();
    drawCrossWalk();
    textArea.text = "Where to next?";
  } else if (player.position.x > width) {
    // Player went to the right side of the screen
    screen = 3;
    player.position.x = 0;
    bus.remove();
    busTwo.remove();
    sideWalk.remove();
    drawSpeedBump();
    drawLamp();
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
    busTwo = createSprite(110, 240, 96, 25);
    busTwo.collider = "static";
    busTwo.image = newBusImg;
    state.bus = 2;
  } else if (distanceB < 50 && interactedWithB == false) {
    textArea.text =
      "Public transportation allows travel for all people in a more eco-friendly and convenient way. Click to fix!";
    interactedWithB = true;
    state.bus = 1;
  } else if (mouse.presses() && distanceSW < 80) {
    textArea.text = "Much better!";
    sideWalk.remove();
    state.sideWalk = 2;
  } else if (distanceSW < 80 && state.sideWalk == 0) {
    textArea.text =
      "Well designed and consistent sidewalks help people walk to their destinations safely and efficiently. Click to fix!";
    state.sideWalk = 1;
  }
  if (state.sideWalk == 2 && state.bus == 2) {
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
  const distanceAir = calcPoints(
    player.position.x - air.position.x,
    player.position.y - air.position.y
  );
  const distanceCW = calcPoints(
    player.position.x - crossWalk.position.x,
    player.position.y - crossWalk.position.y
  );
  if (mouse.presses() && distanceCW < 50) {
    textArea.text = "Much better!";
    crossWalk.remove();
    state.crossWalk = 2;
  } else if (distanceCW < 50 && interactedWithCW == false) {
    textArea.text =
      "Cross walks allow easier and safer areas for people to walk around streets and towns. Click to fix!";
    interactedWithCW = true;
    state.crossWalk = 1;
  } else if (mouse.presses() && distanceAir < 60) {
    textArea.text = "Much better!";
    air.remove();
    state.air = 2;
  } else if (distanceAir < 60 && state.air == 0) {
    textArea.text =
      "Decreasing pollution improves air quality and provides a safer and cleaner environment to walk around.  Click to fix!";
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
  } else if (distanceL < 50 && interactedWithL == false) {
    textArea.text =
      "Well-lit sidewalks help pedestrians navigate and reduce the risk of accidents. Click to fix!";
    interactedWithL = true;
    state.lamp = 1;
  } else if (mouse.presses() && distanceSB < 50) {
    textArea.text = "Much better!";
    speedTwo = createSprite(450, 245, 96, 25);
    speedTwo.collider = "static";
    speedTwo.image = newBumpImg;
    state.speedBump = 2;
  } else if (distanceSB < 50 && state.speedBump == 0) {
    textArea.text =
      "Implementing traffic-calming measures such as speed bumps ensure pedestrian safety. Click to fix!";
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
