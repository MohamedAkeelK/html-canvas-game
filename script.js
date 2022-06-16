const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log("x: " + x + " y: " + y);
}

canvas.addEventListener("mousedown", function (e) {
  getCursorPosition(canvas, e);
});
// game object
const game = {
  startGame: false,
  score: 0,
};

// player class
class Player {
  constructor(xpos, ypos) {
    this.width = 20;
    this.height = 120;
    this.position = {
      x: xpos,
      y: ypos,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    // c.clearRect();
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.stroke();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// ball class
class Ball {
  constructor(xvel, yvel) {
    this.width = 10;
    this.height = 10;
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.velocity = {
      x: xvel,
      y: yvel,
    };
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// create a new ball and player
const player = new Player(0, 0);
const player2 = new Player(canvas.width - 20, 0);
const ball = new Ball(1, 0);

// set key controls
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  // console.log(ball.position.x, ball.position.x - ball.width / 2);

  //fill background and players
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();

  // ball to wall collision for top and bottom wall
  if (ball.position.y + ball.height / 2 >= canvas.height) {
    ball.velocity.y = -0.5;
    ball.update();
  } else if (ball.position.y <= 0) {
    ball.velocity.y = 0.5;
    ball.update();
  } else {
    ball.update();
  }

  // ball to player collision player 2
  if (
    ball.position.x + ball.width >= player2.position.x &&
    ball.position.x <= player2.position.x + ball.width &&
    ball.position.y + ball.height >= player2.position.y &&
    ball.position.y <= player2.position.y + player2.height
  ) {
    ball.velocity.x = -5;

    // check where ball collides with player and adjust ball angle accordingly player 2
    if (ball.position.y <= player2.position.y + 40) {
      ball.velocity.y = -0.5;
    } else if (
      ball.position.y > player2.position.y + 40 &&
      ball.position.y <= player2.position.y + 80
    ) {
      ball.velocity.y = 0;
    } else {
      ball.velocity.y = 0.5;
    }
    ball.update();
    // ball to player collision player 1
  } else if (
    ball.position.x <= player.position.x + player.width &&
    ball.position.x >= player.position.x + ball.width &&
    ball.position.y + ball.height >= player.position.y &&
    ball.position.y <= player.position.y + player.height
  ) {
    ball.velocity.x = 5;
    // check where ball collides with player and adjust ball angle accordingly player 1
    if (ball.position.y <= player.position.y + 50) {
      ball.velocity.y = -0.5;
    } else if (
      ball.position.y > player.position.y + 50 &&
      ball.position.y <= player.position.y + 70
    ) {
      ball.velocity.y = 0;
    } else {
      ball.velocity.y = 0.5;
    }
    ball.update();
  } else {
    // if no ball collsion with top or bottom wall or players just update the ball
    ball.update();
  }

  // moves players and restrict movement from outside of canvas
  if (keys.a.pressed && player.position.y >= 0) {
    player.velocity.y = -7;
  } else if (
    keys.d.pressed &&
    player.position.y + player.height <= canvas.height
  ) {
    player.velocity.y = 7;
  } else if (keys.j.pressed && player2.position.y >= 0) {
    player2.velocity.y = -7;
  } else if (
    keys.l.pressed &&
    player2.position.y + player2.height <= canvas.height
  ) {
    player2.velocity.y = 7;
  } else {
    player.velocity.y = 0;
    player2.velocity.y = 0;
  }
}

// start animation
animate();

// event listeners
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "j":
      keys.j.pressed = true;
      break;
    case "l":
      keys.l.pressed = true;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "j":
      keys.j.pressed = false;
      break;
    case "l":
      keys.l.pressed = false;
      break;
  }
});
