import Phaser from 'phaser';
import PhaserGame from 'phaser-game';
import Preloader from './states/preloader';
import MainMenu from './states/main-menu';
import Maze from './states/maze';


var game = new Phaser.Game(317, 317 * 1330/720, Phaser.AUTO, 'game');

game.antialias = false;

game.state.add('Boot', PhaserGame.Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Maze', Maze);
//  Now start the Boot state.
game.state.start('Boot');

export default game;