class gameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  spawnBrick(x, y, xOff, yOff) {
    let illegalLocations = [
      {
        x: 0,
        y: 52
      },

      {
        x: 52,
        y: 0
      },

      {
        x: 52,
        y: 52
      },

      {
        x: 104,
        y: 52
      },

      {
        x: 52,
        y: 104
      },
////////////////////////////////////////////////////////////////////////////////
      {
        x: config.width - 156,
        y: config.height - 104
      },

      {
        x: config.width - 104,
        y: config.height - 154
      },

      {
        x: config.width - 104,
        y: config.height - 104
      },

      {
        x: config.width - 52,
        y: config.height - 104
      },

      {
        x: config.width - 104,
        y: config.height - 52
      }
    ];

    let brickCanSpawn = true;

    illegalLocations.forEach((position, i) => {
      if(x + xOff == position.x && y + yOff == position.y) {
        brickCanSpawn = false;
        return;
      }
    });

    if(brickCanSpawn) this.bricks.create(x + xOff, y + yOff, 'brick').setOrigin(0, 0).refreshBody();
  }

  removeBrick(group, brick) {
    if(this.reduce(brick.x, 52) == this.reduce(group.x, 52) || this.reduce(brick.y, 52) == this.reduce(group.y, 52)) brick.disableBody(true, true);
  }

  removeExplosion(explosion) {
    explosion.disableBody(true, true);
  }

  endGame(group, player) {
    if(this.reduce(player.x, 52) == this.reduce(group.x, 52) || this.reduce(player.y, 52) == this.reduce(group.y, 52)) {
      let {width, height} = config;

      this.add.text(width/2, height/2, 'Game Over!', {
        fontFamily: '"Press Start 2P"',
        fontSize: '64px',
        backgroundColor: '#13b8ff',
        padding: {x: 70, y: 50}
      }).setOrigin(0.5, 0.5);
      
      this.time.delayedCall(3000, () => {
        this.scene.restart();
      }, null, this);
    }
  }

  reduce(num, min) {
    let multiplier = Math.floor(num / min);
    return min * multiplier + 1.5;
  }

  createBomb(player) {
    if(this.bombDelay <= this.time.now) {
      let currentBomb = this.bombs.create(this.reduce(player.x, 52), this.reduce(player.y, 52), 'bomb-flux').setScale(0.8).setOrigin(0, 0).refreshBody();
      currentBomb.anims.play('bomb-flux');
      this.bombDelay = this.time.now + 500;

      currentBomb.on('animationcomplete', function() {
        this.explodeBomb(currentBomb);
      }, this);
    }
  }

  explodeBomb(bomb) {
    let currentExplosion = this.explosions.create(bomb.x + 24.5, bomb.y + 24.5, 'explosion').setScale(2.1).setDepth(-1).refreshBody();
    bomb.disableBody(true, true);

    let timer = this.time.delayedCall(1000, () => (this.removeExplosion(currentExplosion)), null, this);
  }

  create() {
    this.players = this.physics.add.group();
    this.players.create(78, 78, 'player-up-down').setScale(2.25).setCollideWorldBounds(true).refreshBody();
    this.players.create(config.width - 78, config.height - 78, 'player-up-down').setScale(2.25).setCollideWorldBounds(true).refreshBody();
    this.p2Inputs = this.input.keyboard.addKeys(
      {
        'up': Phaser.Input.Keyboard.KeyCodes.I,
        'right': Phaser.Input.Keyboard.KeyCodes.L,
        'down': Phaser.Input.Keyboard.KeyCodes.K,
        'left': Phaser.Input.Keyboard.KeyCodes.J,
        'bomb': Phaser.Input.Keyboard.KeyCodes.U
      }
    );

    this.p1Inputs = this.input.keyboard.addKeys(
      {
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'bomb': Phaser.Input.Keyboard.KeyCodes.E
      }
    );
    this.inputs = [this.p1Inputs, this.p2Inputs];

    this.bombs = this.physics.add.staticGroup();
    this.bombDelay = 0;
    this.explosions = this.physics.add.staticGroup();

    this.tiles = this.physics.add.staticGroup();
    this.bricks = this.physics.add.staticGroup();

    for(let y = 0; y < config.height; y += 104) {
      for(let x = 0; x < config.width; x += 104) {
        this.tiles.create(x, y, 'block').setOrigin(0, 0).setScale(1.05).refreshBody();

        let ran = Math.random();
        if(ran <= 0.33) this.spawnBrick(x, y, 52, 0);
        else if(ran <= 0.66) this.spawnBrick(x, y, 0, 52);
        else this.spawnBrick(x, y, 52, 52);
      }
    }

    this.physics.add.collider(this.players, this.tiles);
    this.physics.add.collider(this.players, this.bricks);
    this.physics.add.overlap(this.explosions, this.bricks, this.removeBrick, null, this);
    this.physics.add.overlap(this.bombs, this.explosions, this.explodeBomb, null, this);
    this.physics.add.overlap(this.players, this.explosions, this.endGame, null, this);
  }

  update() {
    this.inputs.forEach((inputObj, i) => {
      let player = this.players.children.entries[i];

      if(Phaser.Input.Keyboard.JustDown(inputObj['bomb'])) {
        this.createBomb(player);
      }

      if(inputObj['right'].isDown) {
        player.setVelocityY(0);
        player.setVelocityX(100);
        player.anims.play('right', true);

      } else if(inputObj['left'].isDown) {
        player.setVelocityY(0);
        player.setVelocityX(-100);
        player.anims.play('left', true);

      } else if(inputObj['up'].isDown) {
        player.setVelocityX(0);
        player.setVelocityY(-100);
        player.anims.play('up', true);

      } else if(inputObj['down'].isDown) {
        player.setVelocityX(0);
        player.setVelocityY(100);
        player.anims.play('down', true);

      } else {
        player.setVelocityX(0);
        player.setVelocityY(0);

        player.anims.play('turn', true);
      }
    });
  }
}
