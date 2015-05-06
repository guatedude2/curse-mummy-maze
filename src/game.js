import Phaser from 'phaser';
import PhaserGame from 'phaser-game';
import Preloader from './states/preloader';
import MainMenu from './states/main-menu';

var game = new Phaser.Game(PhaserGame.gameWidth,PhaserGame.gameHeight, Phaser.AUTO, 'game');

game.antialias = false;

game.state.add('Boot', PhaserGame.Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
//game.state.add('Game', Game);
//  Now start the Boot state.
game.state.start('Boot');

export default game;