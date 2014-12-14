var tinycolor = require('tinycolor2');

function Fade() {
	this.name = 'Fade';

	this._brightness = {
		value: 0.2,
		direction: 1,
		min: 0,
		max: 0.45,
		step: 0.04
	};

	this._colors = [
		// red
		 {
			r: 0xff,
			g: 0x00,
			b: 0x00
		},

		// green
		 {
			r: 0x00,
			g: 0xff,
			b: 0x00
		},

		// yellow
		 {
			r: 0xff,
			g: 0xff,
			b: 0x00
		},

		// blue
		{
			r: 0x00,
			g: 0x00,
			b: 0xff
		}
	];

	this.config = {
		speed: {
			type: 'range',
			name: 'Speed',
			value: 1,
			min: 1,
			max: 10,
			step: 1
		}
	};
}

Fade.prototype.requestFrame = function (frame, pixelBuffer) {
	var pixels = pixelBuffer.buffer.length / 3;

	if(frame % this.config.speed.value === 0) {
		this._brightness.value = this._brightness.value
		+ this._brightness.step * this._brightness.direction;

		if(this._brightness.value <= this._brightness.min) {
			this._brightness.direction = 1;
		}
		else if(this._brightness.value >= this._brightness.max){
			this._brightness.direction = -1;
		}

		console.log('this._brightness', this._brightness.value);

		for(var i = 0; i < pixels; i++) {
			var color = this._colors[i % this._colors.length],
				brightness = i % this._colors.length > 1
					? this._brightness.value
					: this._brightness.max - this._brightness.value;
			var hue = tinycolor(color).toHsl().h;
			pixelBuffer.setHSL(i, hue, 1, brightness);
		}
	}

	return pixelBuffer
};

module.exports = Fade;