
class Hero{
  constructor(game){
    this.sprite = game.add.sprite(0, 0, 'hero', 'down_stand.png');
    //this.sprite.scale.setTo(2, 2);
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

    this.sprite.animations.play('walk_right');
  }

}

export default Hero;