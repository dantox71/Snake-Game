//Get canvas and context
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
//Restart button
const restart = document.querySelector(".restart");

//Create the unit
const box = 32;

//Load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio files

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//Create Snake
let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

//create food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

//create the score var
let score = 0;

//Control Snake
let d;
document.addEventListener("keydown", direction);

function direction(e) {
  let key = e.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
  }
}

//check collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == "LEFT") {
    snakeX -= box;
    left.play();
  }
  if (d == "UP") {
    snakeY -= box;
    up.play();
  }
  if (d == "RIGHT") {
    snakeX += box;
    right.play();
  }
  if (d == "DOWN") {
    snakeY += box;
    down.play();
  }

  //if the snake eats the foot
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  }
  // we don't remove the tail
  else {
    //remove the tail
    snake.pop();
  }

  //add new head
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  //game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    dead.play();
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

//Restart the game
restart.addEventListener("click", function() {
  restartGame();
});

//setTimeout(function() { location.reload(); }, 3000);

function restartGame() {
  location.reload();
}

let game = setInterval(draw, 85);

game();
