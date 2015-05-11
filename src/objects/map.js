import Phaser from 'phaser';
import Player from './player';
import Door from './door';
import Tile from './tile';

/**
 * class for map parseing and resource loading
 * @class map
 */
class map{
  constructor(game, startLevel){
    this.game = game;
    this.bg = game.add.image(0, 0, 'stage_bg');
    this.fg = game.add.image(0, 0, 'stage_fg');
    this.maps = game.cache.getJSON('maps').maps;
    this.mapAssetGroup = this.game.add.group();
    this.enemyMoving = false;
    this.currentLevel = startLevel || 0;
    this.loadLevel(0);
  }

  /**
   * parse and load a map resources
   * @param  {int} level level id of the map to load
   */
  loadLevel(level){
    var data = this.maps[level];

    //reset the map variables
    this.tile = [];
    this.enemies = [];
    this.enemyMoves = 0;

    // loop through map data
    for (var y = 0; y < data.length; y++) {
      for (var x = 0; x < data[y].length; x++) {
        var skip = false;
        var tile = data[y][x],
            tileHex = 0x0,
            tileSprite = null,
            hasTop = false,
            hasLeft = false

        tileHex = parseInt(tile, 16) || 0x0;

        // check tile type
        switch (tile) {
          // add exit and entrance
          case "S": // start
            skip = true;
          case "X": // exit
            var direction = 'D';
            if (x == 0) {
              direction = "R";
            } else if (x == 7) {
              direction = "L";
            } else if (y == 7) {
              direction = "U";
            }
            var door = new Door(this.game, x, y, direction, (tile === 'X'));
            if (!skip) {
              this.door = door
              this.mapAssetGroup.add(door.sprite);
            }
            door.sprite.depth = y * 100;
            break;
          case "M": // mummy
            var enemy = new Player(this, 'mummy', x, y);
            this.enemies.unshift(enemy);
            enemy.onMovingComplete.add(this.aiMoveComplete, this);
            this.mapAssetGroup.add(enemy.sprite);
            enemy.sprite.depth = y * 100 + 12;
            break;
          case "P": // player
            this.player = new Player(this, 'hero', x, y, 'D');
            this.player.onMovingComplete.add(this.playerMoveComplete, this);
            this.mapAssetGroup.add(this.player.sprite);
            this.player.sprite.depth = y * 100 + 10;
            break;
        }
        // generate board
        this.tile[x] = this.tile[x] || [];

        if (x > 0 && (this.tile[x-1][y].hex & 4) === 4) {
          tileHex = tileHex | 1;
        }
        if (y > 0 && (this.tile[x][y-1].hex & 2) === 2) {
          tileHex = tileHex | 8;
        }
        switch (tileHex & 9) {
          case 1: tileSprite = 'L'; break;
          case 8: tileSprite = 'T'; break;
          case 9: tileSprite = 'C'; break;
        }

        this.tile[x][y] = new Tile(this.game, x, y, tile, tileHex, tileSprite);
        if (this.tile[x][y].sprite) {
          this.mapAssetGroup.add(this.tile[x][y].sprite);
          this.tile[x][y].sprite.depth = y * 100 + x;
        }
      }
    }
    this.updateZIndexes();
    this.fg.bringToTop();
  }

  nextLevel(){
    this.mapAssetGroup.removeAll(true);
    this.loadLevel(++this.currentLevel);
  }

  showLevelCompleteDialog() {
    setTimeout(() => {
      this.nextLevel();
    }, 1000);
  }

  updateZIndexes(){
    this.mapAssetGroup.sort('depth', Phaser.Group.SORT_ASCENDING);
  }

  /**
   * trigger the movement of enemies
   */
  playerMoveComplete() {
    if (this.player.mapPos.x == this.door.mapPos.x && this.player.mapPos.y == this.door.mapPos.y){
      this.door.close();
      this.door.onAnimationComplete.addOnce(this.showLevelCompleteDialog, this);
      return;
    }
    if (this.enemies.length > 0) {
      this.enemyMoves = 2;
      this.enemies.forEach((enemy) => {
        this.aiFollowPlayer(enemy);
      });
    } else {
      this.allFinished = true;
    }
  }

  aiFollowPlayer(enemy) {
    var playerPos = this.player.mapPos;
    var enemyPos = enemy.mapPos;
    var moveX, stepsX = 0;
    var moveY, stepsY = 0;

    stepsX = Math.abs(enemyPos.x - playerPos.x);
    stepsY = Math.abs(enemyPos.x - playerPos.x);
    if (enemyPos.x > playerPos.x) {
      moveX = 'left';
    } else if (enemyPos.x < playerPos.x) {
      moveX = 'right';
    }
    if (enemyPos.y > playerPos.y) {
      moveY = 'up';
    } else if (enemyPos.y < playerPos.y) {
      moveY = 'down';
    }
    var canMoveX = this.isWalkable(enemyPos.x, enemyPos.y, moveX);
    var canMoveY = this.isWalkable(enemyPos.x, enemyPos.y, moveY);
    if (moveX && canMoveX && moveY && canMoveY) {
      if (stepsX < stepsY){
        enemy.move(moveY);
      }else{
        enemy.move(moveX);
      }
    } else if (moveX && canMoveX){
      enemy.move(moveX);
    } else if (moveY && canMoveY){
      enemy.move(moveY);
    } else {
      enemy.lookAt(moveX || moveY);
      this.aiMoveComplete();
    }
  }

  aiMoveComplete() {
    var allFinished = true;
    this.enemies.forEach((enemy) => {
      if (enemy.isMoving) allFinished = false;
    });
    if (allFinished && --this.enemyMoves > 0) {
      this.enemies.forEach((enemy) => {
        this.aiFollowPlayer(enemy);
      });
    }
  }

  /**
   * tests if a tile is walkable given an X, Y and direction
   * @param  {int}  x   x coordinate of the tile to test
   * @param  {int}  y   y coordinate of the tile to test
   * @param  {hex}  dir inbound direction to test tile
   * @return {Boolean}     returns true if the tile is walkable
   */
  isWalkable(x, y, dir) {
    var dirHex = 0x0;
    var checkPos = { x: x, y: y };
    var nextTilePos = { x: x, y: y };
    switch (dir) {
      case 'up':
        dirHex = 0x8;
        nextTilePos.y--;
        break;
      case 'right':
        dirHex = 0x1;
        checkPos.x++;
        nextTilePos.x++;
        break;
      case 'down':
        dirHex = 0x8;
        checkPos.y++;
        nextTilePos.y++;
        break;
      case 'left':
        dirHex = 0x1;
        nextTilePos.x--;
        break;
    }
    try{
      if (this.tile[nextTilePos.x][nextTilePos.y].name === '#' ||
          this.tile[nextTilePos.x][nextTilePos.y].name === 'S' ||
          (this.tile[checkPos.x][checkPos.y].hex & dirHex) > 0x0) {
        return false;
      }
      return true;
    }catch(err) {}
    return false;
  }
}

export default map;