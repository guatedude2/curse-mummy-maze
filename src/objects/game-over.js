
class GameOver{
  constructor(game){
    this.game = game;
    this.mummy = this.game.add.sprite(this.game.width/2, this.game.height*1.5, 'menu_mummy');
    this.mummy.alpha = 0;
    this.mummy.anchor.set(0.5, 1.0);

    this.gameoverText = this.game.add.sprite(this.game.width/2, 50, 'gameover');
    this.gameoverText.anchor.set(0.5, 0);
    this.gameoverText.alpha = 0;
    this.gameoverText.scale.set(0.5, 0.5);

    this.game.add.tween(this.mummy).to({
      y: this.game.height,
      alpha: 1
    }, 1000, "Cubic", true);

    this.game.add.tween(this.gameoverText).to({
      alpha: 1
    }, 1250, "Cubic", true);
    this.game.add.tween(this.gameoverText.scale).to({
      x: 1,
      y: 1,
    }, 1000, "Cubic", true);

  }

}

export default GameOver;