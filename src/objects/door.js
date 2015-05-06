
class Hero{
  constructor(game){
    this.sprite = game.add.sprite(0, 0, 'door', 'door1.png');
    //this.sprite.scale.setTo(2, 2);
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

    //this.sprite.angle = -90;
    //this.sprite.anchor.set(0.5, 0.5);
    this.sprite.animations.play('closed');
  }

}

export default Hero;