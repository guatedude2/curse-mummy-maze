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

    this.sprite.animations.add('walk_down', [
      'down_walk1.png',
      'down_stand.png',
      'down_walk2.png',
      'down_stand.png'
    ], 7, true, false);
    this.sprite.animations.add('walk_up', [
      'up_walk1.png',
      'up_stand.png',
      'up_walk2.png',
      'up_stand.png'
    ], 7, true, false);
    this.sprite.animations.add('walk_left', [
      'left_walk1.png',
      'left_stand.png',
      'left_walk2.png',
      'left_stand.png'
    ], 7, true, false);
    this.sprite.animations.add('walk_right', [
      'right_walk1.png',
      'right_stand.png',
      'right_walk2.png',
      'right_stand.png'
    ], 7, true, false);

    this.stepSound = this.game.sound.add(this.isAI ? 'step_enemy' : 'step', 1, true);
  }

  move(direction) {
    if (!this.isMoving && this.canMove) {
      var tweenTo = null;
      var isWalkable = this.map.isWalkable(this.mapPos.x, this.mapPos.y, direction);
      this.moveDirection = direction;
      switch (direction) {
        case 'up':
          if (isWalkable) {
            this.mapPos.y--;
            this.sprite.animations.play('walk_up');
            tweenTo = {y: this.mapPos.y * TILE_WIDTH + OFFSET.y };
          }
          break;
        case 'down':
          if (isWalkable) {
            this.mapPos.y++;
            this.sprite.animations.play('walk_down');
            tweenTo = {y: this.mapPos.y * TILE_WIDTH + OFFSET.y };
          }
          break;
        case 'right':
          if (isWalkable) {
            this.mapPos.x++;
            this.sprite.animations.play('walk_right');
            tweenTo = {x: this.mapPos.x * TILE_WIDTH + OFFSET.x };
          }
          break;
        case 'left':
          if (isWalkable) {
            this.mapPos.x--;
            this.sprite.animations.play('walk_left');
            tweenTo = {x: this.mapPos.x * TILE_WIDTH + OFFSET.x };
          }
          break;
        case 'skip':
          this.isMoving = true;
          this.movingComplete();
          break;
      }
      if (tweenTo){
        this.sprite.depth = this.mapPos.y * 100 + 10;
        this.map.updateZIndexes();
        this.tween = this.game.add.tween(this.sprite);
        this.tween.to(tweenTo, 400, "Linear", true);
        this.tween.onComplete.add(this.movingComplete, this);
        this.isMoving = true;
        this.stepSound.play();
      }
    }
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