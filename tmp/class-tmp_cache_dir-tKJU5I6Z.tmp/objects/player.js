define('objects/player', ['exports', 'phaser'], function (exports, Phaser) {

  'use strict';

  var TILE_WIDTH = 40;
  var TILE_HEIGHT = 40;
  var OFFSET = { x: -7, y: -12 };

  class Player{
    constructor(map, spriteName, x, y, direction){
      this.game = map.game;
      this.map = map;
      this.isMoving = false;
      this.mapPos = {x: x, y: y};
      this.onMovingComplete = new Phaser['default'].Signal();
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

    }

    move(direction) {
      if (!this.isMoving) {
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
          this.tween = this.game.add.tween(this.sprite);
          this.tween.to(tweenTo, 400, "Linear", true);
          this.tween.onComplete.add(this.movingComplete, this);
          this.isMoving = true;
        }
      }
    }

    lookAt(direction) {
      this.sprite.animations.frameName = direction + '_stand.png';
    }

    movingComplete() {
      if (this.tween){
        this.sprite.animations.stop();
        var tileSprite = this.map.tile[this.mapPos.x, this.mapPos.y].sprite;
        if (tileSprite) {
          tileSprite.sendToBack();
        }
        this.lookAt(this.moveDirection);
        this.tween = null;
      }
      this.isMoving = false;
      this.onMovingComplete.dispatch(this);
    }

  }

  exports['default'] = Player;

});