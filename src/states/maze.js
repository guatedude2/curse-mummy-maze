import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';
import Map from '../objects/map';

var cursors;

class Preload extends PhaserGameState{
  constructor(game) {
  }

  create() {
    this.map = new Map(this);

    this.map.load(0);
    //this.hero = new Mummy(this);
    //this.door = new Door(this);
    //this.hero = new Hero(this);
    cursors = this.input.keyboard.createCursorKeys();
    this.input.onDown.add(this.onClick,this);
  }

  onClick(){
    // if (tempIndex === 1){
    //   //this.door.sprite.animations.play('open');
    //   this.door.sprite.animations.frameName = 'door1.png';
    //   tempIndex = 0;
    // } else {
    //   //this.door.sprite.animations.play('close');
    //   this.door.sprite.animations.frameName = 'door4.png';
    //   tempIndex = 1;
    // }
  }

  update() {
    // if (cursors.up.isDown) {
    //   this.hero.sprite.y--;
    //   this.hero.sprite.animations.play('walk_up');
    // } else if (cursors.down.isDown) {
    //   this.hero.sprite.y++;
    //   this.hero.sprite.animations.play('walk_down');
    // } else if (cursors.right.isDown) {
    //   this.hero.sprite.x++;
    //   this.hero.sprite.animations.play('walk_right');
    // } else if (cursors.left.isDown) {
    //   this.hero.sprite.x--;
    //   this.hero.sprite.animations.play('walk_left');
    // }
  }
};

export default Preload;