var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = { x: -2, y: -8 };

class Fight{
  constructor(game, x, y, callback){
    this.mapPos = {x: x, y: y};
    this.game = game;
    this.sprite = game.add.sprite(
      x * TILE_WIDTH + OFFSET.x,
      y * TILE_HEIGHT + OFFSET.y,
      'fight',
      'fight1.png'
    );

    this.sprite.animations.add('fight', [
      'fight1.png',
      'fight2.png',
      'fight3.png',
      'fight4.png',
      'fight5.png',
      'fight1.png',
      'fight2.png',
      'fight3.png',
      'fight4.png',
      'fight5.png',
      'fight2.png'
    ], 7, false, false);

    var anim = this.sprite.animations.play('fight');
    anim.onComplete.add(() => {
      callback.call(this);
      this.destroy();
    }, this);

    this.game.sound.play('fight', 1);
  }

  destroy() {
    this.sprite.destroy();
  }
}

export default Fight;