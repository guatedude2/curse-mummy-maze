import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';

class MainMenu extends PhaserGameState{
  constructor(game) {
    this.game = game;
  }

  create() {
    this.add.sprite(0,0,'menu_bg');
    this.mummy = this.add.sprite(0,0,'menu_mummy');
    this.mummy.anchor.set(0.5, 1.0);
    this.mummy.position.set(this.game.width*0.25, this.game.height);
    this.mummy.alpha = 0;

    this.hero = this.add.sprite(0,0,'menu_hero');
    this.hero.anchor.set(0.5, 1.0);
    this.hero.position.set(this.game.width*0.6, this.game.height);
    this.hero.alpha = 0;

    this.text = this.add.sprite(0,0,'menu_text');
    this.text.anchor.set(0.5, 0);
    this.text.scale.set(0.5, 0.5);
    this.text.position.set(this.game.width/2, 20);
    this.text.alpha = 0;

    this.startButton = this.add.button(0, 0, 'button_start', this.startGame, this, 2, 1, 0);
    this.startButton.anchor.set(0.5, 0.5);
    this.startButton.position.set(this.game.width*0.5, this.game.height*0.75);
    this.startButton.alpha = 0;

    setTimeout(() => {
      this.game.add.tween(this.mummy).to({
        x: this.game.width*0.3,
        alpha: 1
      }, 1000, "Cubic", true);
    }, 250);

    setTimeout(() => {
      this.game.add.tween(this.hero).to({
        x: this.game.width*0.65,
        alpha: 1
      }, 1000, "Cubic", true);
    }, 750);

    setTimeout(() => {
      this.game.add.tween(this.text).to({
        alpha: 1
      }, 1000, "Cubic", true);
      this.game.add.tween(this.text.scale).to({
        x: 1,
        y: 1,
      }, 1000, "Cubic", true);
    }, 1300);

    setTimeout(() => {
      this.game.add.tween(this.startButton).to({
        alpha: 1
      }, 1000, "Cubic", true);
    }, 2500);
  }

  startGame() {
    this.state.start('Maze');

  }
};

export default MainMenu;