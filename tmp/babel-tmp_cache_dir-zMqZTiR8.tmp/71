"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define("states/preloader", ["exports", "phaser-game-state", "phaser-game"], function (exports, PhaserGameState, PhaserGame) {

  "use strict";

  var tempArray = ["walk_down", "walk_right", "walk_up", "walk_left"];
  var tempIndex = 1;
  var cursors;

  var Preload = (function (_PhaserGameState$default) {
    function Preload(game) {
      _classCallCheck(this, Preload);

      this.background = null;
      this.preloadBar = null;

      this.ready = false;
    }

    _inherits(Preload, _PhaserGameState$default);

    _createClass(Preload, {
      preload: {
        value: function preload() {
          this.load.image("stage", "assets/stage.png");
          this.load.image("coin", "assets/coin.png");
          //stage_outer.png
          this.load.json("maps", "assets/maps.json");
          this.load.atlasJSONHash("mummy", "assets/mummy.png", "assets/mummy.json");
          this.load.atlasJSONHash("hero", "assets/hero.png", "assets/hero.json");
          this.load.atlasJSONHash("door", "assets/door.png", "assets/door.json");
          this.load.atlasJSONHash("walls", "assets/walls.png", "assets/walls.json");
        }
      },
      create: {
        value: function create() {
          this.ready = true;
          this.state.start("Maze");
        }
      },
      update: {
        value: function update() {}
      }
    });

    return Preload;
  })(PhaserGameState["default"]);

  ;

  exports["default"] = Preload;
});