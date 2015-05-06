var OFFSET = { x: -7, y: -12 };

class Hero{
  constructor(game, x, y, direction){
    this.sprite = game.add.sprite(x + OFFSET.x, y + OFFSET.y, 'hero', 'down_stand.png');

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

    switch (direction){
      case 'U':
        this.sprite.animations.frameName = 'up_stand.png';
        break;
      case 'R':
        this.sprite.animations.frameName = 'right_stand.png';
        break;
      case 'L':
        this.sprite.animations.frameName = 'left_stand.png';
        break;
      default:
        this.sprite.animations.frameName = 'down_stand.png';
    }


    //this.sprite.animations.play('walk_right');
  }

}

export default Hero;