import Phaser from 'phaser';

var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = {
  "U": { x: 19, y: 10, angle: 180 },
  "R": { x: 25, y: 19, angle: -90 },
  "D": { x: 18, y: 26, angle: 0 },
  "L": { x: 10, y: 18, angle: 90 }
};

class Door{
  constructor(game, x, y, direction, opened){
    var config = OFFSET[direction];
    this.mapPos = { x: x, y: y };
    this.sprite = game.add.sprite(
      x * TILE_WIDTH + config.x,
      y * TILE_HEIGHT+ config.y,
      'door', opened ? 'door4.png' : 'door1.png'
    );

    var openAnim = this.sprite.animations.add('open', [
      'door1.png',
      'door2.png',
      'door3.png',
      'door4.png'
    ], 15, false, false);
    var closeAnim = this.sprite.animations.add('close', [
      'door4.png',
      'door3.png',
      'door2.png',
      'door1.png'
    ], 15, false, false);
    openAnim.onComplete.add(this._animationCompleted, this);
    closeAnim.onComplete.add(this._animationCompleted, this);

    this.sprite.angle = config.angle;
    this.sprite.anchor.set(0.5, 0.5);
    this.onAnimationComplete = new Phaser.Signal();
  }

  _animationCompleted(){
    this.onAnimationComplete.dispatch(this);
  }

  open(){
    this.sprite.animations.play('open');
  }

  close(){
    this.sprite.animations.play('close');
  }

}

export default Door;