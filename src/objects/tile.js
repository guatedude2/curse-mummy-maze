var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;
var OFFSET = { x: -7, y: -16 };

class Tile{
  constructor(game, x, y, tile, hexValue, spriteName){
    this.hex = hexValue;
    this.name = tile;
    if (spriteName) {
      this.sprite = game.add.sprite(
        x * TILE_WIDTH + OFFSET.x,
        y * TILE_HEIGHT + OFFSET.y,
        'walls',
        spriteName + '.png'
      );
      this.sprite.z = y * 100 + (10 + x);
    }
  }

}

export default Tile;