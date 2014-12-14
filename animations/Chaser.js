function Chaser() {
	this.name = 'Chaser';

	this._currentPosition = 0;
	this._direction = 1;

	this.config = {
		color: {
			type: 'color',
			value: {
				r: 255,
				g: 255,
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


		if(this._currentPosition >= pixelBuffer.buffer.length / 3 - 1) {
			this._direction = -1;
		}
		else if(this._currentPosition <= 0) {
			this._direction = 1;
		}

		this._currentPosition += this._direction;
	}
	console.log('position', this._currentPosition);
	pixelBuffer.blank();
	pixelBuffer.fillRangeRGB(this._currentPosition, this._currentPosition + 1,
		this.config.color.value.r,
		this.config.color.value.g,
		this.config.color.value.b);

	return pixelBuffer
};

module.exports = Chaser;