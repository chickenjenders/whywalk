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

  // Draw sprites
  drawSprites();

  // Handle user input
  handleInput();

  // Game logic
  checkCollision();
}

function handleInput() {
  // Player movement
  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    player.position.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.position.y += 5;
  }
}

function checkCollision() {
  // Check for collision between player and NPC
  if (player.collide(npc)) {
    // Perform actions when the player collides with the NPC
    console.log("Collided with NPC!");
  }
}
