import Phaser from 'phaser';
var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = { x: -7, y: -11 };

class Player{
  constructor(map, spriteName, x, y, direction, isAI){
    this.game = map.game;
    this.map = map;
    this.isMoving = false;
    this.canMove = true;
    this.isAI = isAI;
    this.mapPos = {x: x, y: y};
    this.onMovingComplete = new Phaser.Signal();
    this.sprite = this.game.add.sprite(
      x * TILE_WIDTH + OFFSET.x,
      y * TILE_HEIGHT + OFFSET.y,
      spriteName,
      'down_stand.png'
    );

    //TODO: add animations to player

    this.stepSound = this.game.sound.add(this.isAI ? 'step_enemy' : 'step', 1, true);
  }

  move(direction) {
    //TODO: add move logic and tween moves
  }

  lookAt(direction) {
    if (direction) {
      this.sprite.animations.frameName = direction + '_stand.png';
    }
  }

  setIsDead() {
    this.sprite.animations.frameName = 'dead.png';
  }

  movingComplete() {
    if (this.tween){
      this.sprite.animations.stop();
      this.lookAt(this.moveDirection);
      this.tween = null;
      this.stepSound.stop();
    }
    this.isMoving = false;
    this.onMovingComplete.dispatch(this);
  }

  destroy(){
    this.sprite.destroy();
  }

}

export default Player;