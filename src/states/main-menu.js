import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';

class MainMenu extends PhaserGameState{
  constructor(game) {
    this.game = game;
  }

  create() {
    this.bg = this.add.sprite(0,0,'menu_bg');

    this.mummy = this.add.sprite(0,0,'menu_mummy');
    this.mummy.anchor.set(0.5, 1.0);
    this.mummy.position.set(this.game.width*0.3, this.game.height);

    this.hero = this.add.sprite(0,0,'menu_hero');
    this.hero.anchor.set(0.5, 1.0);
    this.hero.position.set(this.game.width*0.65, this.game.height);

    this.text = this.add.sprite(0,0,'menu_text');
    this.text.anchor.set(0.5, 0);
    this.text.position.set(this.game.width/2, 20);

    this.startButton = this.add.button(0, 0, 'button_start', this.startGame, this, 2, 1, 0);
    this.startButton.anchor.set(0.5, 0.5);
    this.startButton.position.set(this.game.width*0.5, this.game.height*0.75);

    //TODO: animate intro and add music
  }

  startGame() {
    this.state.start('Maze');

  }
};

export default MainMenu;