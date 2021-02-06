class Shape {
  constructor(rootPoint, pointMods, fill) {
    this.rootPoint = rootPoint;
    this.points = this.calculatePoints(rootPoint, pointMods);
    this.length = this.points.length;
    this.fill = fill;
    this.vel = {a: (Math.random() >= 0.5? -1:1) * 0.5, b: (Math.random() >= 0.5? -1:1) * 0.5};
  }

  calculatePoints(rootPoint, pointMods) {
    let points = [rootPoint];

    pointMods.forEach((mod, i) => {
      let lastPoint = points[i];

      points.push({x: lastPoint.x + mod.xMod, y: lastPoint.y + mod.yMod});
    });

    return points;
  }

  show() {
    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point, i) => {
      let nextPoint = this.points[(i + 1) % this.length];
      let averageY = (point.y + nextPoint.y) / 2;
      let averageX = (point.x + nextPoint.x) / 2;

      ctx.quadraticCurveTo(averageX, averageY, nextPoint.x, nextPoint.y);
    });
    ctx.fill();
    ctx.closePath();
  }

  modifyVelocity(x, y) {
    let futureX = x + this.vel.a;
    let futureY = y + this.vel.b;

    if(futureX >= width || futureX <= 0) this.vel.a *= -1;
    if(futureY >= height || futureY <= 0) this.vel.b *= -1;
  }

  move() {
    this.points.forEach(point => {
      this.modifyVelocity(point.x, point.y);

      point.x += this.vel.a;
      point.y += this.vel.b;
    })
  }
}
