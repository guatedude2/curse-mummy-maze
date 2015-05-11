define('objects/coin', ['exports'], function (exports) {

  'use strict';

  var TILE_WIDTH = 40;
  var TILE_HEIGHT = 40;


  class Coin{
    constructor(game, x, y){
      this.sprite = game.add.sprite(
        x * TILE_WIDTH,
        y * TILE_HEIGHT,
        'coin',
        'coin.png'
      );
    }
  }

  exports['default'] = Coin;

});