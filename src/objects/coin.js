var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = { x: 6, y: 6 };

class Coin{
  constructor(game, x, y){
    this.mapPos = {x: x, y: y};
    this.game = game;
    this.sprite = game.add.sprite(
      x * TILE_WIDTH + OFFSET.x,
      y * TILE_HEIGHT + OFFSET.y,
      'coin',
      'coin1.png'
    );

    this.sprite.animations.add('coin_spin', [
      'coin1.png',
      'coin2.png',
      'coin3.png',
      'coin4.png'
    ], 7, true, false);

    this.sprite.animations.play('coin_spin');

  }

  destroy() {
    this.game.sound.play('coin', 1);
    this.sprite.destroy();
  }
}

export default Coin;