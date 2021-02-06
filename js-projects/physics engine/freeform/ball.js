class Ball {
  constructor(x, y, mass) {
    this.pos = newVector(x, y);
    this.d = mass / world.properties.density;
    this.acl = newVector(0, 0);
    this.vel = newVector(0, 0);

    //formula variables
    this.m = mass;
    // this.weight = findProd(world.forces.gravity, mass);
    // this.normalForce = findOps(this.weight);
    // this.frictionForce = findProd(this.normalForce, world.properties.slipCo);
  }

  show() {
    circ(this.pos.a, this.pos.b, this.d, '#d119');
  }

  move() {
    // balls.forEach((ball, i) => {
    //   if(this != balls[i]) {
    //     let colliding = circ2circ(this.pos.a, this.pos.b, balls[i].pos.a, balls[i].pos.b, this.d/2, balls[i].d/2);
    //
    //     if(colliding) {
    //       balls[i].vel.b *= -0.9;
    //     }
    //   }
    // });

    if(this.pos.a + this.d/2 >= width) {
      // this.vel.a = 0;
      this.vel.a *= world.properties.bounceAmnt;

      this.pos.a = width - 0.1 - this.d/2;
    } else if(this.pos.a - this.d/2 <= 0) {
      // this.vel.a = 0;
      this.vel.a *= world.properties.bounceAmnt;

      this.pos.a = 0.1 + this.d/2;
    }

    if(this.pos.b + this.d/2 >= height) {
      // zeroOut(this.vel);
      this.vel.b *= world.properties.bounceAmnt;

      this.pos.b = height - 0.1 - this.d/2;
    } else if(this.pos.b - this.d/2 <= 0) {
      // zeroOut(this.vel);
      this.vel.b *= world.properties.bounceAmnt;

      this.pos.b = 0.1 + this.d/2;
    }

    add(this.vel, this.acl);
    add(this.pos, this.vel);
  }
}
