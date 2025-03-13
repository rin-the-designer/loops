// movement and animation constants
const MOVE_INTERVAL = 1000;
const STEP_SIZE = 40;
const NUM_BOXES = 10;
const SMOOTH_SPEED = 0.1;
const MAX_MOVES = 20;
const FINAL_MOVEMENT = 1600;
const FINAL_DURATION = 5000;
const FADE_DURATION = 1000;

// scene state variables
let currentOffset = { y: 0, z: 0 };
let targetOffset = { y: 0, z: 0 };
let lastMoveTime = 0;
let moveCount = 0;
let finalMovementStarted = false;
let finalMovementStartTime = 0;
let isWhiteScene = false;
let opacity = 255;
let fadeStartTime = 0;
let isSketchStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
}

function draw() {
  if (!isSketchStarted) return;

  //orbitControl(1, 0, 1);

  let progress = map(
    currentOffset.z,
    FINAL_MOVEMENT,
    FINAL_MOVEMENT + 400,
    0,
    1
  );
  progress = constrain(progress, 0, 1);

  // color based on scene
  let bgColor = isWhiteScene
    ? map(progress, 0, 1, 255, 0)
    : map(progress, 0, 1, 0, 255);
  background(bgColor);
  lights();
  noStroke();

  // fade-in effect for scene transition
  if (fadeStartTime > 0) {
    let fadeProgress = (millis() - fadeStartTime) / FADE_DURATION;
    opacity = map(fadeProgress, 0, 1, 0, 255);
    if (fadeProgress >= 1) {
      opacity = 255;
      fadeStartTime = 0;
    }
  }

  // regular movement complete and final movement ready
  if (moveCount >= MAX_MOVES && !finalMovementStarted) {
    finalMovementStarted = true;
    finalMovementStartTime = millis();
    targetOffset.z += FINAL_MOVEMENT;
  }

  // movement
  if (moveCount < MAX_MOVES) {
    if (millis() - lastMoveTime >= MOVE_INTERVAL) {
      if (targetOffset.y === targetOffset.z) {
        targetOffset.y += STEP_SIZE;
      } else {
        targetOffset.z += STEP_SIZE;
      }
      lastMoveTime = millis();
      moveCount++;
    }
    currentOffset.y = lerp(currentOffset.y, targetOffset.y, SMOOTH_SPEED);
    currentOffset.z = lerp(currentOffset.z, targetOffset.z, SMOOTH_SPEED);
  } else if (finalMovementStarted) {
    let progress = min((millis() - finalMovementStartTime) / FINAL_DURATION, 1);
    currentOffset.z = lerp(
      targetOffset.z - FINAL_MOVEMENT,
      targetOffset.z,
      progress
    );

    if (currentOffset.z >= FINAL_MOVEMENT + 400) {
      resetScene();
    }
  }

  let stairColor = isWhiteScene ? 255 : 30;

  // create stairs
  for (let i = 0; i < NUM_BOXES; i++) {
    push();
    fill(stairColor, opacity);
    translate(
      0,
      i * STEP_SIZE + currentOffset.y,
      i * STEP_SIZE + currentOffset.z
    );
    box(windowWidth / 2, STEP_SIZE, STEP_SIZE * 2);
    pop();
  }

  // wall transition
  let wallXOffset = map(
    currentOffset.z,
    FINAL_MOVEMENT,
    FINAL_MOVEMENT + 600,
    windowWidth / 8 + 2,
    windowWidth / 2
  );
  wallXOffset = constrain(wallXOffset, windowWidth / 8 + 1, windowWidth / 2);

  drawWalls(currentOffset, wallXOffset, stairColor);
}

// function to draw walls and floor
function drawWalls(offset, wallXOffset, wallColor) {
  // floor
  push();
  fill(wallColor, opacity);
  translate(0, -STEP_SIZE + offset.y, -600 + offset.z);
  box(windowWidth / 2, STEP_SIZE, 1200);
  pop();

  // walls
  const wallWidth = windowWidth / 4;
  const wallHeight = windowWidth;
  const wallZ = -1180;
  const wallY = -60 - wallHeight / 2;

  for (let x of [-wallXOffset, wallXOffset]) {
    push();
    fill(wallColor, opacity);
    translate(x, wallY + offset.y, wallZ + offset.z);
    box(wallWidth - 2, wallHeight, STEP_SIZE);
    pop();
  }
}

function resetScene() {
  currentOffset = { y: 0, z: 0 };
  targetOffset = { y: 0, z: 0 };
  moveCount = 0;
  finalMovementStarted = false;
  isWhiteScene = !isWhiteScene;
  opacity = 0;
  fadeStartTime = millis();
}

// trial for adding lights - Pranav told me to get rid of it
// let lightColor = isWhiteScene ? 30 : 255;
// push();
// fill(lightColor, 200);
// translate(0, -60 - windowWidth / 2 + currentYOffset, -1200 + currentZOffset - 1);
// plane(windowWidth / 2, windowWidth);
// filter(BLUR, 32);
// pop();
