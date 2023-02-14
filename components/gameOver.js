export function gameOver(score, highScore, ctx, canvasSize) {
  let grd = ctx.createRadialGradient(
    75,
    50,
    canvasSize / 2,
    90,
    60,
    canvasSize
  );
  grd.addColorStop(0, "#34434a");
  grd.addColorStop(1, "#20333c");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.font = "bold 50px Bungee";
  let scoreText = "Score : " + score;
  let scoreTextWidth = ctx.measureText(scoreText).width;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(255, 255, 255, 0.37)";
  ctx.fillStyle = "rgb(220, 220, 220)";
  ctx.fillText(scoreText, canvasSize / 2 - scoreTextWidth / 2, 220);

  ctx.font = "bold 60px Bungee";
  let highScoreText = "High Score : " + highScore;
  let highScoreTextWidth = ctx.measureText(highScoreText).width;
  ctx.fillStyle = "rgb(220, 220, 220)";
  ctx.fillText(highScoreText, canvasSize / 2 - highScoreTextWidth / 2, 300);

  ctx.font = "20px poppins";
  let addInfoText = "Click space to play again...";
  let addInfoTextWidth = ctx.measureText(addInfoText).width;
  ctx.fillStyle = "rgb(220, 220, 220)";
  ctx.fillText(
    addInfoText,
    canvasSize / 2 - addInfoTextWidth / 2,
    canvasSize - 100
  );
}
