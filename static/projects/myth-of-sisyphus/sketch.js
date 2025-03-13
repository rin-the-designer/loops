let rock;
let gravity = 0.5;
let hill;
let direction = 1;
let isNewIteration = true;
let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose({ maxHands: 1, flipped: true });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rock = {
    x: 0,
    y: windowHeight,
    radius: windowHeight / 10,
    velocity: 0,
    color: color(255, 136, 0),
  };
  updateHillConfiguration();
  noStroke();

  video = createCapture(VIDEO, { flipped: true });
  video.size(windowWidth, windowHeight);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function updateHillConfiguration() {
  if (direction === 1) {
    hill = {
      x1: windowWidth,
      y1: 0,
      x2: windowWidth,
      y2: windowHeight,
      x3: 0,
      y3: windowHeight,
    };
  } else {
    hill = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: windowHeight,
      x3: windowWidth,
      y3: windowHeight,
    };
  }
}

function draw() {
  background(255);

  // draw hill
  fill(0);
  triangle(hill.x1, hill.y1, hill.x2, hill.y2, hill.x3, hill.y3);

  // draw rock
  fill(rock.color);
  circle(rock.x, rock.y, rock.radius * 2);

  // calculate slope position for rock
  let slope = (hill.y1 - hill.y3) / (hill.x1 - hill.x3);
  let yIntercept = hill.y3 - slope * hill.x3;
  let targetY = slope * rock.x + yIntercept;

  // switch direction if rock is at the top of the hill
  if (
    isNewIteration &&
    ((direction === 1 && rock.x >= windowWidth - 1) ||
      (direction === -1 && rock.x <= 1))
  ) {
    direction *= -1;
    isNewIteration = false;
    updateHillConfiguration();
    rock.x = direction === 1 ? windowWidth - rock.x : windowWidth - rock.x;
  } else if (rock.y >= 100) {
    isNewIteration = true;
  }

  // cursor settings
  if (dist(mouseX, mouseY, rock.x, rock.y) <= rock.radius) {
    cursor("grab");
  } else {
    cursor("default");
  }

  // mouse control
  if (mouseIsPressed && dist(mouseX, mouseY, rock.x, rock.y) < rock.radius) {
    rock.x = mouseX;
    rock.y = targetY;
    rock.velocity = 0;
    cursor("grabbing");
  } else {
    // roll down the slope
    if (
      (direction === 1 && rock.x > 0) ||
      (direction === -1 && rock.x < windowWidth)
    ) {
      rock.velocity -= gravity * direction;
      rock.x += rock.velocity;
      rock.y = targetY;
    } else {
      rock.x = direction === 1 ? 0 : windowWidth;
      rock.y = windowHeight;
      rock.velocity = 0;
    }
  }

  // hand control
  if (hands.length > 0) {
    cursor("none");
    let hand = hands[0];
    let handTop = hand.middle_finger_tip;
    let handBottom = hand.wrist;
    let handCenterX = (handTop.x + handBottom.x) / 2;
    let handCenterY = (handTop.y + handBottom.y) / 2;
    fill(51);
    circle(handCenterX, handCenterY, 20);

    if (dist(handCenterX, handCenterY, rock.x, rock.y) < rock.radius) {
      rock.x = handCenterX;
      rock.y = targetY;
      rock.velocity = 0;
    } else {
      if (
        (direction === 1 && rock.x > 0) ||
        (direction === -1 && rock.x < windowWidth)
      ) {
        rock.velocity -= gravity * direction;
        rock.x += rock.velocity;
        rock.y = targetY;
      } else {
        rock.x = direction === 1 ? 0 : windowWidth;
        rock.y = windowHeight;
        rock.velocity = 0;
      }
    }
  }
}

function gotHands(results) {
  hands = results;
}
