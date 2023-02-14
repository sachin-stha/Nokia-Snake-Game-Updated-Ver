export default class Snake {
  constructor() {
    this.inputDir = { x: 1, y: 0 };
    this.snakeArr = [
      [5, 7],
      [4, 7],
      [3, 7],
      [2, 7],
      [1, 7],
    ];
    this.cellSize = 30;
    this.snakeBorderColor = "#a1a1a1";
    this.gridLineSize = 1;
    this.snakeHead = this.snakeArr[0];
  }

  draw(ctx) {
    this.colorElem = 255;
    this.colorElemState = false;

    this.snakeArr.forEach((e, i) => {
      this.color = `rgb(${this.colorElem}, ${this.colorElem}, ${this.colorElem})`;
      if (i === 0) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgb(200, 200, 200)";
      }
      ctx.fillStyle = this.color;
      ctx.fillRect(
        e[0] * this.cellSize + this.gridLineSize,
        e[1] * this.cellSize + this.gridLineSize,
        this.cellSize,
        this.cellSize
      );
      ctx.shadowBlur = 0;

      if (this.colorElem < 150) this.colorElemState = true;
      else if (this.colorElem > 245) this.colorElemState = false;
      this.colorElemState ? (this.colorElem += 20) : (this.colorElem -= 20);
    });
  }
}
