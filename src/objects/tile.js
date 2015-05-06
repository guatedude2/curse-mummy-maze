var OFFSET = { x: -7, y: -16 };

var VALID_TILES = [ "0", "1", "2", "3", "4", "5", "6", "7", "A", "B", "H", "L", "R", "T", "Z" ];

class Tile{
  constructor(game, x, y, tile){
    this.tileId = tile;
    if (VALID_TILES.indexOf(tile) >= 0) {
      this.sprite = game.add.sprite(x + OFFSET.x, y + OFFSET.y, 'walls', tile + '.png');
    }
  }

  testPassable(direction){
    // switch (this.tileId){
    //   case "T":
    //     if (direction == 'L' || direction == 'R' || direction == 'B')
    //   case "R":
    //   case "B":
    //   case "L":
    // }
    return true;
  }

}

export default Tile;