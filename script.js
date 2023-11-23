let player;
let npc;
function preload() {
  playerImg = loadAnimation("./Walk.png", { frameSize: [48, 48], frames: 6 });
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
  npc.addImage(npcImg);
}

function draw() {
  background(220);
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
  // Draw sprites
  drawSprites();

  // Handle user input
  handleInput();

  // Game logic
  checkCollision();
}
