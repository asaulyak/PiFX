function Hourglass() {
	this.name = 'Hourglass';

	this._currentPosition = 0;
	this._direction = 1;
	this._bottom = 0;

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

Hourglass.prototype.requestFrame = function (frame, pixelBuffer) {
	if(frame % this.config.speed.value === 0) {
		var pixelsCount = pixelBuffer.buffer.length / 3;
		this._bottom = this._bottom || pixelsCount;

		this._currentPosition++;

		if(this._currentPosition >= this._bottom) {
			this._currentPosition = 0;
			this._bottom--;
		}
	}
	console.log('position', this._currentPosition);
	pixelBuffer.blank();
	pixelBuffer.fillRangeRGB(this._currentPosition, this._currentPosition + 1,
		this.config.color.value.r,
		this.config.color.value.g,
		this.config.color.value.b);

	pixelBuffer.fillRangeRGB(this._bottom, pixelsCount,
		this.config.color.value.r,
		this.config.color.value.g,
		this.config.color.value.b);

	return pixelBuffer
};

module.exports = Hourglass;