define('states/maze', ['exports', 'phaser-game-state', 'phaser-game', 'phaser', 'objects/map'], function (exports, PhaserGameState, PhaserGame, Phaser, Map) {

  'use strict';

  var cursors, space;

  class Preload extends PhaserGameState['default']{
    constructor(game) {
    }

    create() {
      this.map = new Map['default'](this);

      this.map.load(2);

      cursors = this.input.keyboard.createCursorKeys();
      space = this.input.keyboard.addKey(Phaser['default'].Keyboard.SPACEBAR);
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

  exports['default'] = Preload;

});