"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

define("states/main-menu", ["exports", "phaser-game-state", "phaser-game"], function (exports, PhaserGameState, PhaserGame) {

  "use strict";

  var MainMenu = (function (_PhaserGameState$default) {
    function MainMenu(game) {
      _classCallCheck(this, MainMenu);

      this.music = null;
      this.playButton = null;
    }

    _inherits(MainMenu, _PhaserGameState$default);

    _createClass(MainMenu, {
      create: {
        value: function create() {
          //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
          //  Here all we're doing is playing some music and adding a picture and button
          //  Naturally I expect you to do something significantly better :)
          this.add.sprite(0, 0, "bg");

          //Aligning HUD to view edges
          //Align to left top edge
          var q = this.add.sprite(PhaserGame["default"].viewX, PhaserGame["default"].viewY, "playBtn");

          //Align to bottom right edge
          q.position.x = PhaserGame["default"].viewWidth - q.width;
          q.position.y = PhaserGame["default"].viewHeight - q.height;
          q.inputEnabled = true;
          q.events.onInputDown.add(this.onClick, this);
        }
      },
      update: {
        value: function update() {}
      },
      startGame: {
        value: function startGame(pointer) {

          //  And start the actual game
          this.state.start("Game");
        }
      }
    });

    return MainMenu;
  })(PhaserGameState["default"]);

  ;

  exports["default"] = MainMenu;
});

//  Do some nice funky main menu effect here