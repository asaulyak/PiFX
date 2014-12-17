function Chaser() {
	this.name = 'Chaser';

	this._gap = 8;
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
		var pixels = pixelBuffer.buffer.length / 3;
		if(this._offset++ >= this._gap) {
			this._offset = 0;
		}

		pixelBuffer.blank();

		for(var i = 0; i < pixels - this._offset; i++) {
			if(i % this._gap === 0) {
				var position = i + this._offset;
				pixelBuffer.fillRangeRGB(position, position + 1,
					this.config.color.value.r,
					this.config.color.value.g,
					this.config.color.value.b);
			}
		}
	}

	return pixelBuffer
};

module.exports = Chaser;