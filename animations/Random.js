var tinycolor = require('tinycolor2');

var PIXELS = 50;

function Random() {
	'use strict';

	this.name = 'Random';

	this._brightnessRoot = {
		value: 0.2,
		direction: 1,
		min: 0,
		max: 0.45,
		step: 0.04
	};

	this._pixelsBrightness = [];

	this.config = {
		color: {
			type: 'color',
			value: {
				r: 0,
				g: 0,
				b: 255
			}
		},
		speed: {
			type: 'range',
			name: 'Speed',
			value: 1,
			min: 1,
			max: 100,
			step: 5
		},
		colorSelector: {
			type: 'select',
			name: 'Select color',
			choices: [
				'Random',
				'Single'
			]
		}
	};
}

Random.prototype.requestFrame = function (frame, pixelBuffer) {
	var pixels = pixelBuffer.buffer.length / 3;

	if (frame % this.config.speed.value === 0) {
		this.setRandomPixel();

		for (var i = 0; i < pixels; i++) {
			if (this._pixelsBrightness[i]) {
				if (this._pixelsBrightness[i].value >= this._brightnessRoot.max) {
					this._pixelsBrightness[i].direction = -1;
				}

				this._pixelsBrightness[i].value = this._pixelsBrightness[i].value
				+ this._brightnessRoot.step * this._pixelsBrightness[i].direction;

				pixelBuffer.setHSL(i, this._pixelsBrightness[i].hue, 1, this._pixelsBrightness[i].value);

				if (this._pixelsBrightness[i].value <= this._brightnessRoot.min) {
					this._pixelsBrightness[i] = undefined;
				}
			}
		}
	}

	return pixelBuffer;
};

Random.prototype.setRandomPixel = function () {
	var randomPixel,
		tries = 0;
	do {
		randomPixel = getRandom(0, PIXELS);
	}
	while (this._pixelsBrightness[randomPixel] && ++tries < PIXELS);

	var hue = this.config.colorSelector.value === 'Single'
		? tinycolor(this.config.color.value).toHsl().h
		: getRandom(0, 360);

	this._pixelsBrightness[randomPixel] = {
		value: this._brightnessRoot.min + this._brightnessRoot.step,
		direction: 1,
		hue: hue
	};
};

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Random;