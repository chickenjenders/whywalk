let player;
let cityImg;
let textArea;
let bus;
let sideWalk;
function preload() {
  playerImg = loadAnimation("assets/Walk.png", {
    frameSize: [48, 48],
    frames: 6,
  });
  cityImg = loadImage("assets/city.png", {
    frameSize: [630, 500],
  });
  //img1 = loadAnimation("./idle2.png", { frameSize: [48, 48], frames: 3 });
  //img2 = loadAnimation("./Walk.png", { frameSize: [32, 32], frames: 6 });
}

function setup() {
  createCanvas(630, 600);

  // Create the player and NPC
  player = new Sprite();
  player.addAni("walk", playerImg, 6);
  player.diameter = 50;
  player.rotationLock = true;
  player.text = "Player";

  textArea = new Sprite();
  textArea.w = 630;
  textArea.h = 100;
  textArea.y = 530;
  textArea.color = "gray";
  textArea.collider = "static";
  textArea.textSize = 17;
  textArea.text =
    "I'm always late to work! How can I make it easier to get there on time?";

  bus = createSprite(258, 231, 96, 17);
  bus.collider = "static";
  bus.color = "white";

  sideWalk = createSprite(200, 470, 17, 16);
  sideWalk.color = "#BAC0D0";
  sideWalk.collider = "static";
}

function draw() {
  image(cityImg, 0, 0, 630, 500);
  player.changeAni("walk");
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
}
