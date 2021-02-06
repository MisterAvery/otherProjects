let shapes = [
  new Shape(
    {x: 300, y: 100}, [
    {xMod: 100, yMod: 100},
    {xMod: -100, yMod: 100},
    {xMod: -100, yMod: -100}, ],
    '#13b8ff')
];

function beginAnimation() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    shape.show();
    shape.move();
  });

  window.requestAnimationFrame(beginAnimation);
}

beginAnimation();
