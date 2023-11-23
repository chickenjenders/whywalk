let player;
let npc;
let cityImg;
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
  createCanvas(800, 600);

  // Create the player and NPC
  player = new Sprite();
  player.addAni("walk", playerImg, 6);
  player.diameter = 50;
  player.rotationLock = true;
  player.text = "Player";

  npc = createSprite(200, 200, 50, 50);
  // npc.addImage(npcImg);
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
