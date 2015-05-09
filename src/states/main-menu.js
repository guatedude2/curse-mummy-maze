import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';

class MainMenu extends PhaserGameState{
  constructor(game) {
    this.music = null;
    this.playButton = null;
  }

  create() {
    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)
    this.add.sprite(0,0,'bg');

    //Aligning HUD to view edges
    //Align to left top edge
    var q = this.add.sprite(PhaserGame.viewX,PhaserGame.viewY,'playBtn');

    //Align to bottom right edge
    q.position.x = PhaserGame.viewWidth - q.width;
    q.position.y = PhaserGame.viewHeight - q.height;
    q.inputEnabled = true;
    q.events.onInputDown.add(this.onClick,this);
  }

  update () {

    //  Do some nice funky main menu effect here
  }

  startGame (pointer) {



    //  And start the actual game
    this.state.start('Game');

  }
};

export default MainMenu;