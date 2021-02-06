//define world properties
let world = {
  forces: {
    gravity: newVector(0, 0.5),
    wind: newVector(0.3, 0)
  },

  properties: {
    density: 0.1,
    bounceAmnt: -0.75
  }
}



let balls = [];
for(let i = 0; i < 10; i++) {balls.push(new Ball(random(0, width, 0), random(0, height, 0), random(1, 4, 0)))}

function loop() {
  clear();

  balls.forEach(ball => {
    zeroOut(ball.acl);

    Object.keys(world.forces).forEach(force => {
      if(force == 'gravity') {
        add(ball.acl, world.forces[force]);
      } else {
        let newForceA = world.forces[force].a / ball.m;
        let newForceB = world.forces[force].b / ball.m;
        add(ball.acl, newVector(newForceA, newForceB));
      }
    });


    ball.move();
    ball.show();
  });

  window.requestAnimationFrame(loop);
}

loop();
