define('objects/map', ['exports', 'objects/player', 'objects/door', 'objects/tile', 'objects/coin'], function (exports, Player, Door, Tile, Coin) {

  'use strict';

  class map{
    constructor(game){
      this.game = game;
      this.bg = game.add.image(0, 0, 'stage');
      this.maps = game.cache.getJSON('maps').maps;
      this.enemyMoving = false;
    }

    /**
     * parse and load a map resources
     * @param  {int} level level id of the map to load
     */
    load(level){
      var data = this.maps[level];

      //reset the map variables
      this.tile = [];
      this.enemies = [];
      this.mapAssetGroup = this.game.add.group();

      // loop through map data
      for (var y = 0; y < data.length; y++) {
        for (var x = 0; x < data[y].length; x++) {
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
            case "X": // exit
              var direction = 'D';
              if (x == 0) {
                direction = "R";
              } else if (x == 7) {
                direction = "L";
              } else if (y == 7) {
                direction = "U";
              }
              this.door = new Door['default'](this.game, x, y, direction, (tile === 'X'));
              //this.mapAssetGroup.add(this.door[0].sprite);
              break;
            case "T":
              this.coin = new Coin['default'](this.game, x, y);
              // this.treasures.push(this.coin);
              break;
            case "M": // mummy
              var enemy = new Player['default'](this, 'mummy', x, y);
              this.enemies.unshift(enemy);
              enemy.onMovingComplete.add(this.aiMoveComplete, this);
              this.mapAssetGroup.add(enemy.sprite);
              break;
            case "P": // player
              this.player = new Player['default'](this, 'hero', x, y, 'D');
              this.player.onMovingComplete.add(this.moveEnemies, this);
              this.mapAssetGroup.add(this.player.sprite);
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

          this.tile[x][y] = new Tile['default'](this.game, x, y, tile, tileHex, tileSprite);
          if (this.tile[x][y].sprite) {
            this.mapAssetGroup.add(this.tile[x][y].sprite);
          }
        }
      }
    }

    /**
     * trigger the movement of enemies
     */
    moveEnemies() {
      this.enemyMoves = 2;
      this.enemies.forEach((enemy) => {
        this.aiFollowPlayer(enemy);
      });
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
          enemy.move(moveX);
        }else{
          enemy.move(moveY);
        }
      } else if (moveX && canMoveX){
        enemy.move(moveX);
      } else if (moveY && canMoveY){
        enemy.move(moveY);
      } else {
        enemy.lookAt(moveX || moveY);
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
            (this.tile[checkPos.x][checkPos.y].hex & dirHex) > 0x0) {
          return false;
        }
        return true;
      }catch(err) {}
      return false;
    }
  }

  exports['default'] = map;

});