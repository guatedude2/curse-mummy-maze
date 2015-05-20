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

    this.load.json('maps', 'assets/maps.json');
    this.load.atlasJSONHash('mummy', 'assets/mummy.png', 'assets/mummy.json');
    this.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    this.load.atlasJSONHash('fight', 'assets/fight.png', 'assets/fight.json');
    this.load.atlasJSONHash('door', 'assets/door.png', 'assets/door.json');
    this.load.atlasJSONHash('walls', 'assets/walls.png', 'assets/walls.json');
    this.load.atlasJSONHash('coin', 'assets/coin.png', 'assets/coin.json');

    this.load.audio('step', 'assets/sounds/step.mp3');
    this.load.audio('coin', 'assets/sounds/coin.mp3');
    this.load.audio('start', 'assets/sounds/start.mp3');
    this.load.audio('fight', 'assets/sounds/fight.mp3');
    this.load.audio('step_enemy', 'assets/sounds/step_enemy.mp3');
    this.load.audio('door_open', 'assets/sounds/door_open.mp3');
    this.load.audio('door_close', 'assets/sounds/door_close.mp3');
    this.load.audio('music', 'assets/sounds/music_ingame.mp3');
  }

  create() {
    this.ready = true;
    this.state.start('Maze');
  }

  update() {

  }
};

export default Preload;