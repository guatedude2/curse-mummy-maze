import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';
import Mummy from '../objects/mummy';
import Hero from '../objects/hero';
import Door from '../objects/door';

var tempArray = ['walk_down', 'walk_right', 'walk_up', 'walk_left'];
var tempIndex = 1;
var cursors;

class Preload extends PhaserGameState{
  constructor(game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;
  }

  preload (){
    this.load.image('stage', 'assets/stage.png');
    //stage_outer.png
    this.load.atlasJSONHash('mummy', 'assets/mummy.png', 'assets/mummy.json');
    this.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    this.load.atlasJSONHash('door', 'assets/door.png', 'assets/door.json');
    this.load.atlasJSONHash('walls', 'assets/walls.png', 'assets/walls.json');
  }

  create() {
    this.ready = true;
    this.bg = this.add.image(0, 0, 'stage');
    this.hero = new Mummy(this);
    this.door = new Door(this);
    //this.hero = new Hero(this);
    cursors = this.input.keyboard.createCursorKeys();
    this.input.onDown.add(this.onClick,this);
  }

  onClick(){
    if (tempIndex === 1){
      //this.door.sprite.animations.play('open');
      this.door.sprite.animations.frameName = 'door1.png';
      tempIndex = 0;
    } else {
      //this.door.sprite.animations.play('close');
      this.door.sprite.animations.frameName = 'door4.png';
      tempIndex = 1;
    }
  }

  update() {
    if (cursors.up.isDown) {
      this.hero.sprite.y--;
      this.hero.sprite.animations.play('walk_up');
    } else if (cursors.down.isDown) {
      this.hero.sprite.y++;
      this.hero.sprite.animations.play('walk_down');
    } else if (cursors.right.isDown) {
      this.hero.sprite.x++;
      this.hero.sprite.animations.play('walk_right');
    } else if (cursors.left.isDown) {
      this.hero.sprite.x--;
      this.hero.sprite.animations.play('walk_left');
    }
  }
};

export default Preload;