import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';

class Preload extends PhaserGameState{
  constructor(game) {
    this.ready = false;
  }

  preload (){
    this.load.image('menu_bg', 'assets/menu_bg.png');
    this.load.image('menu_mummy', 'assets/menu_mummy.png');
    this.load.image('menu_hero', 'assets/menu_hero.png');
    this.load.image('menu_text', 'assets/menu_text.png');
    this.load.image('button_start', 'assets/button_start.png');
    this.load.image('gameover', 'assets/gameover.png');

    this.load.bitmapFont('adventure_font', 'assets/font.png', 'assets/font.fnt');

    this.load.image('life', 'assets/hero_life.png');
    this.load.image('level_dot', 'assets/level_dot.png');
    this.load.image('dpad', 'assets/dpad.png');
    this.load.image('dpad_down', 'assets/dpad_down.png');

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
    this.load.audio('music_ingame', 'assets/sounds/music_ingame.mp3');
    this.load.audio('music_menu', 'assets/sounds/music_menu.mp3');
    this.load.audio('music_end', 'assets/sounds/music_end.mp3');
  }

  create() {
    this.ready = true;
    this.state.start('MainMenu');
    //this.state.start('Maze');
  }

  update() {

  }
};

export default Preload;