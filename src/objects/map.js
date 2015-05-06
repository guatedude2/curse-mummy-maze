import Mummy from './mummy';
import Hero from './hero';
import Door from './door';
import Tile from './tile';

var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

/**
 * class for map parseing and resource loading
 * @class map
 */
class map{
  constructor(game){
    this.game = game;
    this.bg = game.add.image(0, 0, 'stage');
    this.maps = game.cache.getJSON('maps').maps;
    this.tile = [];
  }

  /**
   * loads a map resources
   * @param  {int} level level id of the map to load
   */
  load(level){
    var data = this.maps[level];
    // loop through map data
    for (var y = data.length - 1; y >= 0; --y) {
      for (var x = 0; x < data[y].length; x++) {
        var tile = data[y][x];
        //set the stage position
        var pos = {
          x: x * TILE_WIDTH,
          y: y * TILE_HEIGHT
        }
        // check tile type
        switch (tile) {
          case "X":
            var angle = 0;
            if (x == 0) {
              angle = -90;
            } else if (x == 7) {
              angle = 90;
            } else if (y == 0) {
              angle = 180;
            }
            this.exit = new Door(this.game, pos.x, pos.y, angle, true);
            break;
          case "M":
            break;
          case "E":
            break;
          case "P":
            break;
          case " ":
          case "#":
            break;
          default:
            this.tile[x] = this.tile[x] || [];
            this.tile[x][y] = new Tile(this.game, pos.x, pos.y, tile);
        }
      }
    }
  }
}

export default map;