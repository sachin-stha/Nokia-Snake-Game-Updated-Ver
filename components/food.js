export default class Food {
  constructor() {
    this.foodPosi = [0, 0];
    this.colorArr = [
      "rgb(255, 100, 100)",
      "rgb(100, 100, 255)",
      "rgb(100, 255, 100)",
      "rgb(100, 255, 255)",
      "rgb(255, 100, 255)",
      "rgb(255, 255, 100)",
      "rgb(200, 200, 100)",
    ];
    this.color =
      this.colorArr[Math.floor(Math.random() * this.colorArr.length)];
    this.cellSize = 30;
    this.gridLineSize = 1;
  }

  draw(ctx) {
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.foodPosi[0] * this.cellSize + this.gridLineSize,
      this.foodPosi[1] * this.cellSize + this.gridLineSize,
      this.cellSize,
      this.cellSize
    );
    ctx.shadowBlur = 0;
  }

  generateNewPosi(snakeArr) {
    this.foodPosi = [
      Math.floor(Math.random() * 14) + 3,
      Math.floor(Math.random() * 14) + 3,
    ];
    snakeArr.forEach((e) => {
      if (this.foodPosi[0] === e[0] && this.foodPosi[1] === e[1])
        this.generateNewPosi(snakeArr);
    });
    this.color =
      this.colorArr[Math.floor(Math.random() * this.colorArr.length)];
  }
}
