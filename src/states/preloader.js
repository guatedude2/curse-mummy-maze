import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';

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
    this.load.image('stage_bg', 'assets/stage.png');
    this.load.image('stage_fg', 'assets/stage_outer.png');
    //stage_outer.png
    this.load.json('maps', 'assets/maps.json');
    this.load.atlasJSONHash('mummy', 'assets/mummy.png', 'assets/mummy.json');
    this.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    this.load.atlasJSONHash('door', 'assets/door.png', 'assets/door.json');
    this.load.atlasJSONHash('walls', 'assets/walls.png', 'assets/walls.json');
  }

  create() {
    this.ready = true;
    this.state.start('Maze');
  }

  update() {

  }
};

export default Preload;