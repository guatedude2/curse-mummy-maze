import Phaser from 'phaser';

var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = {
  "U": { x: 19, y: 12, angle: 180 },
  "R": { x: 25, y: 19, angle: -90 },
  "D": { x: 18, y: 25, angle: 0 },
  "L": { x: 12, y: 18, angle: 90 }
};

class Door{
  constructor(game, x, y, direction, closed){
    var config = OFFSET[direction];
    this.mapPos = { x: x, y: y };
    this.game = game;
    this.sprite = game.add.sprite(
      x * TILE_WIDTH + config.x,
      y * TILE_HEIGHT+ config.y,
      'door', 'door_back.png'
    );
    this.door = game.add.sprite(
      x * TILE_WIDTH + config.x,
      y * TILE_HEIGHT+ config.y,
      'door', closed ? 'door1.png' : 'door4.png'
    );

    var openAnim = this.door.animations.add('open', [
      'door1.png',
      'door2.png',
      'door3.png',
      'door4.png'
    ], 3, false, false);
    var closeAnim = this.door.animations.add('close', [
      'door4.png',
      'door1.png'
    ], 30, false, false);
    openAnim.onComplete.add(this._animationCompleted, this);
    closeAnim.onComplete.add(this._animationCompleted, this);

    this.sprite.angle = config.angle;
    this.sprite.anchor.set(0.5, 0.5);
    this.door.angle = config.angle;
    this.door.anchor.set(0.5, 0.5);
    this.onAnimationComplete = new Phaser.Signal();
  }

  _animationCompleted(){
    this.onAnimationComplete.dispatch(this);
  }

  setClosed(val){
    this.door.frameName = (val ? 'door1.png' : 'door4.png');
  }

  open(){
    this.game.sound.play('door_open', 1);
    this.door.animations.play('open');
  }

  close(){
    this.game.sound.play('door_close', 1);
    this.door.animations.play('close');
  }

  destroy(){
    this.door.destroy();
    this.sprite.destroy();
  }

}

export default Door;