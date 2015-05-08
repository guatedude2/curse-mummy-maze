import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';
import Phaser from 'phaser';
import Map from '../objects/map';

var cursors, space;

class Preload extends PhaserGameState{
  constructor(game) {
  }

  create() {
    this.map = new Map(this);

    this.map.load(0);

    cursors = this.input.keyboard.createCursorKeys();
    space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    if (cursors.up.isDown) {
      this.map.player.move('up');
    } else if (cursors.down.isDown) {
      this.map.player.move('down');
    } else if (cursors.right.isDown) {
      this.map.player.move('right');
    } else if (cursors.left.isDown) {
      this.map.player.move('left');
    } else if (space.isDown) {
      this.map.player.move('skip');
    }
  }
};

export default Preload;