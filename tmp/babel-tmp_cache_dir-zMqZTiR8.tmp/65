"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define("objects/door", ["exports"], function (exports) {

  "use strict";

  var TILE_WIDTH = 40;
  var TILE_HEIGHT = 40;
  var OFFSET = {
    U: { x: 19, y: 10, angle: 180 },
    R: { x: 26, y: 19, angle: -90 },
    D: { x: 18, y: 26, angle: 0 },
    L: { x: 10, y: 18, angle: 90 }
  };

  var Door = (function () {
    function Door(game, x, y, direction, opened) {
      _classCallCheck(this, Door);

      var config = OFFSET[direction];
      this.sprite = game.add.sprite(x * TILE_WIDTH + config.x, y * TILE_HEIGHT + config.y, "door", opened ? "door4.png" : "door1.png");
      this.sprite.animations.add("open", ["door1.png", "door2.png", "door3.png", "door4.png"], 15, false, false);
      this.sprite.animations.add("close", ["door4.png", "door3.png", "door2.png", "door1.png"], 15, false, false);

      this.sprite.angle = config.angle;
      this.sprite.anchor.set(0.5, 0.5);
    }

    _createClass(Door, {
      open: {
        value: function open() {
          this.sprite.animations.play("open");
        }
      },
      clse: {
        value: function clse() {
          this.sprite.animations.play("close");
        }
      }
    });

    return Door;
  })();

  exports["default"] = Door;
});