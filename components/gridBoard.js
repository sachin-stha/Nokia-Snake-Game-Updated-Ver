export function gridBoard(canvasSize, ctx) {
  let borderWidth = 1;
  for (var x = 0; x <= canvasSize; x += 30) {
    ctx.moveTo(borderWidth + x, 0);
    x !== 0 && x !== canvasSize ? ctx.lineTo(borderWidth + x, canvasSize) : "";
    ctx.moveTo(0, borderWidth + x);
    x !== 0 && x !== canvasSize ? ctx.lineTo(canvasSize, borderWidth + x) : "";
  }
  let gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
  gradient.addColorStop(0, "#1f222a");
  gradient.addColorStop(1, "#183d3d");
  ctx.strokeStyle = gradient;
  ctx.stroke();
}
