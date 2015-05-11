"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define("states/maze", ["exports", "phaser-game-state", "phaser-game", "phaser", "objects/map"], function (exports, PhaserGameState, PhaserGame, Phaser, Map) {

  "use strict";

  var cursors, space;

  var Preload = (function (_PhaserGameState$default) {
    function Preload(game) {
      _classCallCheck(this, Preload);
    }

    _inherits(Preload, _PhaserGameState$default);

    _createClass(Preload, {
      create: {
        value: function create() {
          this.map = new Map["default"](this);

          this.map.load(0);

          cursors = this.input.keyboard.createCursorKeys();
          space = this.input.keyboard.addKey(Phaser["default"].Keyboard.SPACEBAR);
        }
      },
      update: {
        value: function update() {
          if (cursors.up.isDown) {
            this.map.player.move("up");
          } else if (cursors.down.isDown) {
            this.map.player.move("down");
          } else if (cursors.right.isDown) {
            this.map.player.move("right");
          } else if (cursors.left.isDown) {
            this.map.player.move("left");
          } else if (space.isDown) {
            this.map.player.move("skip");
          }
        }
      }
    });

    return Preload;
  })(PhaserGameState["default"]);

  ;

  exports["default"] = Preload;
});