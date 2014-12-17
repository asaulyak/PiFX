function Chaser() {
	this.name = 'Chaser';

	this._gap = 5;
	this._offset = 0;

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
			max: 10,
			step: 1
		}
	};
}

Chaser.prototype.requestFrame = function (frame, pixelBuffer) {
	if(frame % this.config.speed.value === 0) {
		var pixelsCount = pixelBuffer.buffer.length / 3,
			pixelsMap = [];

		if(this._offset++ >= this._gap) {
			this._offset = 0;
		}

		pixelBuffer.blank();

		for (var i = this._offset; i < pixelsCount; i += this._gap) {
			pixelsMap[i] = {
				r: this.config.color.value.r,
				g: this.config.color.value.g,
				b: this.config.color.value.b
			};
		}

		pixelBuffer.fillMapRGB(pixelsMap);
	}

	return pixelBuffer
};

module.exports = Chaser;