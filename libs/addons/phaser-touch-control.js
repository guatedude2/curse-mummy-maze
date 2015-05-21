/* global Phaser */
/**
  * Phaser Touch Control Plugin
  * It adds a movement control for mobile and tablets devices

  The MIT License (MIT)

  Copyright (c) 2014 Eugenio Fage

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  Contact: https://github.com/eugenioclrc, @eugenioclrc

  */

import Phaser from 'phaser';

var TouchControl = function (game, parent) {
  /* Extend the plugin */
  Phaser.Plugin.call(this, game, parent);
  this.input = this.game.input;

  this.image = this.game.add.sprite(0, 0, 'dpad');
  this.image.anchor.set(0.5);
  this.image.visible=false;
  this.image.fixedToCamera=true;
};

//Extends the Phaser.Plugin template, setting up values we need
TouchControl.prototype = Object.create(Phaser.Plugin.prototype);
TouchControl.prototype.constructor = TouchControl;

TouchControl.prototype.settings = {
  // max distance from itial touch
  maxDistanceInPixels: 200,
  singleDirection: false
};


TouchControl.prototype.cursors = {
  up: false, down: false, left: false, right: false
};

TouchControl.prototype.speed = {
  x:0, y:0
};

TouchControl.prototype.inputEnable = function(pos) {
  if (pos) {
    this.staticPosition = new Phaser.Point(pos.x, pos.y);
    this.input.onDown.add(staticCompassStart, this);
    this.input.onUp.add(staticCompassEnd, this);
    this.image.visible=true;
    this.image.bringToTop();

    this.image.cameraOffset.x=pos.x;
    this.image.cameraOffset.y=pos.y;

  } else {
    this.input.onDown.add(createCompass, this);
    this.input.onUp.add(removeCompass, this);
  }
};

TouchControl.prototype.inputDisable = function() {
  this.input.onDown.remove(createCompass, this);
  this.input.onUp.remove(removeCompass, this);
};

var initialPoint;
var createCompass = function(){
  this.image.visible=true;
  this.image.bringToTop();

  this.image.cameraOffset.x=this.input.worldX;
  this.image.cameraOffset.y=this.input.worldY;

  this.preUpdate=setDirection.bind(this);
  initialPoint=this.input.activePointer.position.clone();

};
var removeCompass = function () {
  this.image.visible = false;

  this.cursors.up = false;
  this.cursors.down = false;
  this.cursors.left = false;
  this.cursors.right = false;

  this.speed.x = 0;
  this.speed.y = 0;

  this.preUpdate=empty;
};

var staticCompassStart = function (){
  var d=this.staticPosition.distance(this.input.activePointer.position);
  var maxDistanceInPixels = this.settings.maxDistanceInPixels;

  if (d < maxDistanceInPixels) {
    this.preUpdate=setDirection.bind(this);
    initialPoint=this.staticPosition.clone();
  }
};

var staticCompassEnd = function (){

  this.image.bringToTop();
  this.image.cameraOffset.x=this.staticPosition.x;
  this.image.cameraOffset.y=this.staticPosition.y;

  this.cursors.up = false;
  this.cursors.down = false;
  this.cursors.left = false;
  this.cursors.right = false;

  this.speed.x = 0;
  this.speed.y = 0;

  this.preUpdate=empty;
  this.image.loadTexture('dpad');
};

var empty = function(){
};

var setDirection = function() {
  var d=initialPoint.distance(this.input.activePointer.position);
  var maxDistanceInPixels = this.settings.maxDistanceInPixels;

  var deltaX=this.input.activePointer.position.x-initialPoint.x;
  var deltaY=this.input.activePointer.position.y-initialPoint.y;

  if(this.settings.singleDirection){
    if(Math.abs(deltaX) > Math.abs(deltaY)){
      deltaY = 0;
      this.input.activePointer.position.y=initialPoint.y;
    }else{
      deltaX = 0;
      this.input.activePointer.position.x=initialPoint.x;
    }
  }
  var angle = initialPoint.angle(this.input.activePointer.position);


  if(d>maxDistanceInPixels){
    deltaX = Math.cos(angle) * maxDistanceInPixels;
    deltaY = Math.sin(angle) * maxDistanceInPixels;
  }

  this.speed.x = parseInt((deltaX/maxDistanceInPixels) * 100 * -1, 10);
  this.speed.y = parseInt((deltaY/maxDistanceInPixels)*100 * -1, 10);


  this.cursors.up = (deltaY < -1);
  this.cursors.down = (deltaY > 1);
  this.cursors.left = (deltaX < -1);
  this.cursors.right = (deltaX > 1);

  if (this.cursors.up) {
    this.image.angle = -90;
  } else if (this.cursors.down){
    this.image.angle = 90;
  } else if (this.cursors.left){
    this.image.angle = 180;
  } else if (this.cursors.right){
    this.image.angle = 0;

  }
  this.image.loadTexture('dpad_down');

};
TouchControl.prototype.preUpdate = empty;

export default TouchControl;