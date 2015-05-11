"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define("objects/tile", ["exports"], function (exports) {

  "use strict";

  var TILE_WIDTH = 40;
  var TILE_HEIGHT = 40;
  var OFFSET = { x: -7, y: -16 };

  var Tile = function Tile(game, x, y, tile, hexValue, spriteName) {
    _classCallCheck(this, Tile);

    this.hex = hexValue;
    this.name = tile;
    if (spriteName) {
      this.sprite = game.add.sprite(x * TILE_WIDTH + OFFSET.x, y * TILE_HEIGHT + OFFSET.y, "walls", spriteName + ".png");
      this.sprite.z = y * 100 + (10 + x);
    }
  };

  exports["default"] = Tile;
});