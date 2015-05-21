var levelDotPosition = [
  {x:60, y:131 },
  {x:47, y:143 },
  {x:57, y:143 },
  {x:67, y:143 },
  {x:36, y:155 },
  {x:54, y:155 },
  {x:72, y:155 },
  {x:27, y:165 },
  {x:51, y:165 },
  {x:77, y:165 }
];

class Hud{
  constructor(game){
    var i, sprite;
    this.game = game;
    this.lives = [];
    this.levels = [];
    this.time = 0;

    this.timer = game.time.create(false);
    this.timer.loop(1000, this.updateTime, this);

    for (i=0; i<3; i++) {
      sprite = this.game.add.sprite(25 + i*25, 18, 'life');
      sprite.alpha = 0;
      this.lives.push(sprite);
    }

    for (i=0; i<10; i++) {
      sprite = this.game.add.sprite(levelDotPosition[i].x, levelDotPosition[i].y, 'level_dot');
      sprite.alpha = 0;
      this.levels.push(sprite);
    }


    this.timeText = this.game.add.bitmapText(52, 45, 'adventure_font', '0:00', 20);

    this.coinsText = this.game.add.bitmapText(52, 75, 'adventure_font', '0', 20);
    this.levelText = this.game.add.bitmapText(30, 102, 'adventure_font', 'Level 1', 20);

  }

  setLives(lives) {
    for (var i=0; i<3; i++) {
      this.lives[i].alpha = (i < lives);
    }
  }

  setLevel(level) {
    for (var i=0; i<10; i++) {
      this.levels[i].alpha = (i < level);
    }
    this.levelText.setText('Level ' + level);
  }

  setCoinsLeft(coins) {
    this.coinsText.setText(coins.toString());
  }

  startTimer() {
    this.time = -1;
    this.updateTime();
    this.timer.start();
  }

  stopTimer() {
    this.timer.stop(false);
  }

  updateTime() {
    this.time++;
    var secs = this.time % 60;
    var mins = Math.floor(this.time / 60);
    this.timeText.setText(mins.toString() + ':' + (secs <= 9 ? '0' + secs.toString() : secs));
  }

}

export default Hud;