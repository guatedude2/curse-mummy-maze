define('game', ['exports', 'phaser', 'phaser-game', 'states/preloader', 'states/main-menu', 'states/maze'], function (exports, Phaser, PhaserGame, Preloader, MainMenu, Maze) {

	'use strict';

	var game = new Phaser['default'].Game(PhaserGame['default'].gameWidth,PhaserGame['default'].gameHeight, Phaser['default'].AUTO, 'game');

	game.antialias = false;

	game.state.add('Boot', PhaserGame['default'].Boot);
	game.state.add('Preloader', Preloader['default']);
	game.state.add('MainMenu', MainMenu['default']);
	game.state.add('Maze', Maze['default']);
	//  Now start the Boot state.
	game.state.start('Boot');

	exports['default'] = game;

});