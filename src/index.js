'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Transitionable = require('famous/transitions/Transitionable');

FamousEngine.init();

var scene = FamousEngine.createScene();
var radioRoot = scene.addChild();

new DOMElement(radioRoot, {content: 'Radio "OSA"'})
    .setAttribute('style', 'background-color:grey;font-size:2em;text-align:center;color:white');

radioRoot
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(250, 250)
    .setAlign(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setOrigin(0.5, 0.5);

radioRoot.addUIEvent('click');

var orbitTransition = new Transitionable(0);

var spinner = radioRoot.addComponent({
    onUpdate: function () {
        radioRoot.setRotation(0, orbitTransition.get(), 0);
        radioRoot.requestUpdateOnNextTick(spinner);
    }
});

var broadCast = radioRoot.addChild();

broadCast
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(200, 200)
    .setAlign(0.5, 0.5)
    .setMountPoint(0.5, 0.5)
    .setOrigin(0.5, 0.5);

new DOMElement(broadCast, {content: 'Radio Program'})
    .setAttribute('style', 'background-color:red;font-size:2em;text-align:center;color:white');

broadCast.setOpacity(0);
broadCast.setRotation(0, Math.PI, 0);

radioRoot.onReceive = function (event) {
    radioRoot.requestUpdate(spinner);

    var finalOrbitValue = orbitTransition.get() === 0 ? Math.PI : 0;
    orbitTransition.set(finalOrbitValue, {duration: 1000}, function () {

        broadCast.setOpacity(1, {duration: 2000});
    });

};

