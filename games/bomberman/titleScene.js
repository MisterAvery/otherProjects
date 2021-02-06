class titleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  createAnimation(key, source, start, end, repeat = -1, frameRate = 6) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(source, {start: start, end: end}),
      frameRate: frameRate,
      repeat: repeat
    });
  }

  preload() {
    this.load.spritesheet('bomb-flux', 'assets/bomb-flux.png', {
      frameWidth: 49,
      frameHeight: 50
    })
    this.load.spritesheet('player-left-right', 'assets/bomberman-left-right.png', {
      frameWidth: 15.3,
      frameHeight: 18
    });
    this.load.spritesheet('player-up-down', 'assets/bomberman-up-down.png', {
      frameWidth: 15.5,
      frameHeight: 18
    });
    this.load.spritesheet('player-death-sequence', 'assets/bomberman-death.png', {
      frameWidth: 15.4,
      frameHeight: 16
    });
    this.load.image('block', 'assets/tile.png');
    this.load.image('brick', 'assets/brick.png');
    this.load.image('explosion', 'assets/explosion.png');
  }

  create() {
    this.add.text(20, 20, 'Loading ...');

    this.createAnimation('left', 'player-left-right', 0, 2);
    this.createAnimation('right', 'player-left-right', 3, 5);
    this.createAnimation('death', 'player-death-sequence', 0, 6, 1, 7);
    this.createAnimation('up', 'player-up-down', 3, 5);
    this.createAnimation('down', 'player-up-down', 0, 2);
    this.createAnimation('bomb-flux', 'bomb-flux', 0, 2, 1, 2);
    this.anims.create({
      key: 'turn',
      frames: [{key: 'player-up-down', frame: 0}],
      frameRate: 20
    });

    this.scene.start('gameScene');
  }
}
