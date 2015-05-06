import Mummy from './mummy';
import Player from './player';
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
  }

  /**
   * loads a map resources
   * @param  {int} level level id of the map to load
   */
  load(level){
    var data = this.maps[level];

    //reset the map variables
    this.tile = [];
    this.enemies = [];

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
          // add exit and entrance
          case "E":
          case "X":
            var direction = 'D';
            if (x == 0) {
              direction = "R";
            } else if (x == 7) {
              direction = "L";
            } else if (y == 7) {
              direction = "U";
            }
            this.exit = new Door(this.game, pos.x, pos.y, direction, (tile === 'X'));
            break;
          case "M":
            this.enemies.push(new Mummy(this.game, pos.x, pos.y));
            break;
          case "P":
            this.player = new Player(this.game, pos.x, pos.y, 'D');
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