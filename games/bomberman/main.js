const config = {
  type: Phaser.AUTO,
  width: 884,
  height: 572,
  backgroundColor: 0x388700,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      enableBody: true
    }
  },
  scene: [titleScene, gameScene]
};

const game = new Phaser.Game(config);