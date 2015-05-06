var OFFSET = { x: -7, y: -16 };

class Tile{
  constructor(game, x, y, tile){
    this.tileId = tile;
    this.sprite = game.add.sprite(x + OFFSET.x, y + OFFSET.y, 'walls', tile+'.png');
  }

  testPassable(direction){
    // switch (this.tileId){
    //   case "T":
    //     if (direction == 'L' || direction == 'R' || direction == 'B')
    //   case "R":
    //   case "B":
    //   case "L":
    // }
    return false;
  }

}

export default Tile;