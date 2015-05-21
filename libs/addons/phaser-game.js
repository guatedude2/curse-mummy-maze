import Phaser from 'phaser';

var PhaserGame = {
  /* Your game can check PhaserGame.orientated in internal loops to know if it should pause or not */
  game: null,
  orientated: false

};


PhaserGame.Boot = function (game) {
  PhaserGame.game = game;
};


PhaserGame.Boot.prototype = {

  preload: function () {

    //  Here we load the assets required for our preloader (in this case a background and a loading bar)
    //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
    //this.load.image('preloaderBar', 'images/preloadr_bar.png');

  },

  create: function () {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scaleStage();
    this.state.start('Preloader');

  },

  scaleStage:function(){
    if (this.game.device.desktop)
    {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    else
    {
      this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
      this.scale.forceOrientation(true, false);
      this.scale.onResize = this.gameResized.bind(this);
      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      this.scale.setScreenSize(true);
    }

    this.scale.minWidth = PhaserGame.gameWidth/2;
    this.scale.minHeight = PhaserGame.gameHeight/2;
    this.scale.maxWidth = PhaserGame.gameWidth;
    this.scale.maxHeight = PhaserGame.gameHeight;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

  if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER){
    PhaserGame.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
    PhaserGame.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
    PhaserGame.viewWidth = PhaserGame.gameWidth-PhaserGame.viewX;
    PhaserGame.viewHeight = PhaserGame.gameHeight-PhaserGame.viewY;
  }else{
    PhaserGame.viewX = 0;
    PhaserGame.viewY = 0;
    PhaserGame.viewWidth = PhaserGame.gameWidth;
    PhaserGame.viewHeight = PhaserGame.gameHeight;
  }

  document.getElementById("game").style.width = window.innerWidth+"px";
  document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
  document.getElementById("game").style.overflow = "hidden";
  },

  gameResized: function (width, height) {

    //  This could be handy if you need to do any extra processing if the game resizes.
    //  A resize could happen if for example swapping orientation on a device.

  },

  enterIncorrectOrientation: function () {

    PhaserGame.orientated = false;

    //document.getElementById('orientation').style.display = 'block';

  },

  leaveIncorrectOrientation: function () {

    PhaserGame.orientated = true;

    //document.getElementById('orientation').style.display = 'none';
    this.scaleStage();
  }

};



PhaserGame.screen = "small";
PhaserGame.srx = Math.max(window.innerWidth,window.innerHeight);
PhaserGame.sry = Math.min(window.innerWidth,window.innerHeight);

PhaserGame.logicWidth = 1920;
PhaserGame.logicHeight = 1080;
var r = PhaserGame.logicWidth/PhaserGame.logicHeight;
// if(PhaserGame.srx >= 360){
//   PhaserGame.screen = "small";
//   PhaserGame.gameWidth = 360;
// }
// if(PhaserGame.srx >= 480){
//   PhaserGame.screen = "normal";
//   PhaserGame.gameWidth = 480;
// }
// if(PhaserGame.srx >= 720){
//   PhaserGame.screen = "large";
//   PhaserGame.gameWidth = 720;
// }
// if(PhaserGame.srx >= 960){
//   PhaserGame.screen = "xlarge";
//   PhaserGame.gameWidth = 960;
// }
// if(PhaserGame.srx >= 1440){
//   PhaserGame.screen = "xxlarge";
//   PhaserGame.gameWidth = 1440;
// }

//If on deskop, we may need to fix the maximum resolution instead of scaling the game to the full monitor resolution
var device = Phaser.Device;
if(device.desktop){
  PhaserGame.screen = "large";
  PhaserGame.gameWidth = 720;
}
device = null;

PhaserGame.gameHeight = PhaserGame.gameWidth/r;

//We need these methods later to convert the logical game position to display position, So convertWidth(logicWidth) will be right edge for all screens
PhaserGame.convertWidth = function(value){
  return value/PhaserGame.logicWidth * PhaserGame.gameWidth;
};
PhaserGame.convertHeight = function(value){
  return value/PhaserGame.logicHeight * PhaserGame.gameHeight;
};


export default PhaserGame;