import Food from "./components/food.js";
import { gridBoard } from "./components/gridBoard.js";
import Snake from "./components/snake.js";
import { gameOver as gameOverFunc } from "./components/gameOver.js";

const score = document.getElementById("score");
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
let speed = 100;

const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

let scorePoint = 0;
let snake = new Snake();
let food = new Food();
let gameState = false;
let gameOver = false;

if (localStorage.getItem("high-score") === null) {
  localStorage.setItem("high-score", "0");
}

food.generateNewPosi(snake.snakeArr);

function snakeMovement() {
  snake.snakeHead = snake.snakeArr[0];
  [0, 1].forEach((e) => {
    if (snake.snakeHead[e] < 0) snake.snakeHead[e] = 19;
    else if (snake.snakeHead[e] > 19) snake.snakeHead[e] = 0;
  });

  snake.snakeArr.unshift([
    snake.snakeHead[0] + snake.inputDir.x,
    snake.snakeHead[1] + snake.inputDir.y,
  ]);
}

function snakeFoodCollide() {
  if (
    snake.snakeArr[0][0] === food.foodPosi[0] &&
    snake.snakeArr[0][1] === food.foodPosi[1]
  ) {
    food.generateNewPosi(snake.snakeArr);
    scorePoint += 1;

    let sound = new Audio("./Sound-assets/chew-21768.mp3");
    sound.volume = 1;
    sound.play();
  } else snake.snakeArr.pop();
}

function snakeBodyCollide() {
  snake.snakeArr.forEach((e, i, arr) => {
    if (i !== 0) {
      if (e[0] === arr[0][0] && e[1] === arr[0][1]) {
        gameState = false;
        snake.inputDir = { x: 0, y: 0 };
        gameOver = true;
      }
    }
  });
}

function gameReset() {
  gameOver = false;
  scorePoint = 0;
  gameState = false;
  snake = new Snake();
  food = new Food();
  food.generateNewPosi(snake.snakeArr);
}

let previousTime = 0;
function gameLoop(currentTime) {
  requestAnimationFrame(gameLoop);
  if (currentTime - previousTime < speed) return;
  previousTime = currentTime;

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  if (gameState) {
    snakeMovement();
    snakeFoodCollide();
    snakeBodyCollide();
  }

  scorePoint < 10
    ? (score.innerHTML = `0${scorePoint}`)
    : (score.innerHTML = scorePoint);

  if (!gameOver) {
    gridBoard(canvasSize, ctx);
    snake.draw(ctx);
    food.draw(ctx);
  } else {
    gameOverFunc(
      score.innerHTML,
      localStorage.getItem("high-score"),
      ctx,
      canvasSize
    );
  }

  scorePoint > localStorage.getItem("high-score")
    ? localStorage.setItem("high-score", scorePoint)
    : "";
}
gameLoop();

document.onkeydown = (e) => {
  switch (e.which) {
    case 37:
      if (snake.inputDir.x !== 1) {
        snake.inputDir.x = -1;
        snake.inputDir.y = 0;
      }
      break;
    case 38:
      if (snake.inputDir.y !== 1) {
        snake.inputDir.x = 0;
        snake.inputDir.y = -1;
      }
      break;
    case 39:
      if (snake.inputDir.x !== -1) {
        snake.inputDir.x = 1;
        snake.inputDir.y = 0;
      }
      break;
    case 40:
      if (snake.inputDir.y !== -1) {
        snake.inputDir.x = 0;
        snake.inputDir.y = 1;
      }
      break;
    case 32:
      gameOver ? gameReset() : "";
      break;
  }
  !gameOver ? (gameState = true) : "";
};

document.querySelector(".restart-btn button").onclick = () => gameReset();
