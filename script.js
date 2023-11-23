let player;
let npc;

function preload() {
  // Load images for the player and NPC
  playerImg = loadImage("player.png");
  npcImg = loadImage("npc.png");
}

function setup() {
  createCanvas(800, 600);

  // Create the player and NPC
  player = createSprite(width / 2, height / 2, 50, 50);
  player.addImage(playerImg);

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
