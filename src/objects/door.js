var OFFSET = { x: 26, y: 18 };

class Hero{
  constructor(game, x, y, angle, opened){
    this.sprite = game.add.sprite(x + OFFSET.x, y + OFFSET.y, 'door', opened ? 'door4.png' : 'door1.png');
    this.sprite.animations.add('open', [
      'door1.png',
      'door2.png',
      'door3.png',
      'door4.png'
    ], 15, false, false);
    this.sprite.animations.add('close', [
      'door4.png',
      'door3.png',
      'door2.png',
      'door1.png'
    ], 15, false, false);

    this.sprite.angle = angle;
    this.sprite.anchor.set(0.5, 0.5);
    //this.sprite.animations.play('closed');
  }

}

export default Hero;