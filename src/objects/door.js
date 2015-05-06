var OFFSET = {
  "U": { x: 19, y: 10, angle: 180 },
  "R": { x: 26, y: 19, angle: -90 },
  "D": { x: 18, y: 26, angle: 0 },
  "L": { x: 10, y: 18, angle: 90 }
};

class Hero{
  constructor(game, x, y, direction, opened){
    var config = OFFSET[direction];
    this.sprite = game.add.sprite(x + config.x, y + config.y, 'door', opened ? 'door4.png' : 'door1.png');
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

    this.sprite.angle = config.angle;
    this.sprite.anchor.set(0.5, 0.5);
  }

  open(){
    this.sprite.animations.play('open');
  }

  clse(){
    this.sprite.animations.play('close');
  }

}

export default Hero;