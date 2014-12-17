var http = require('http'),

	handler = require('./static'),

	app = http.createServer(handler),
	io = require('socket.io').listen(app),

	spi = require('spi'),

	RPixel = require('./lib/raspberrypixels'),

	AvailableAnimations = require('./animationloader').load()
Animations = [];

var PIXELS = parseInt(process.env.PIXELS, 10) || 50;
var DEVICE = process.env.DEVICE || '/dev/spidev0.0';
var PORT = process.env.PORT || 8777;

var FPS = 30;
var RUNNING = true;

app.listen(parseInt(PORT, 10));

console.log("HTTP server listening on port " + PORT)

var Device = new spi.Spi(DEVICE, function () {
});
var Pixels = new RPixel.PixelBuffer(PIXELS)
var ActiveAnimations = []
var Frame = 0
var ReadBuffer = new Buffer(PIXELS * 3)

for (var i = 0; i < AvailableAnimations.length; i++) {
	Animations.push(new AvailableAnimations[i](PIXELS))
}

RenderStrip(); // Begin the strip animation

io.sockets.on('connection', function (socket) {
	socket.emit('initialize', {
		animations: Strip(Animations),
		activeAnimations: Strip(ActiveAnimations)
	});

	socket.on('animations', function (activeAnimations) {
		ActiveAnimations = [];
		for (var i = 0; i < activeAnimations.length; i++) {
			for (var a = 0; a < Animations.length; a++) {
				if (activeAnimations[i].name == Animations[a].name) {
					var anim = new AvailableAnimations[a](PIXELS);
					anim.config = activeAnimations[i].config;
					anim.id = activeAnimations[i].id;

					ActiveAnimations.push(anim);
				}
			}
		}

		socket.broadcast.emit('animations', activeAnimations);
	});

	socket.on('toggle', function () {
		RUNNING = !RUNNING

		socket.broadcast.emit('status', RUNNING)
	});

	socket.on('updateAnimation', function (animation) {
		for (var i = 0; i < ActiveAnimations.length; i++) {
			if (animation.id === ActiveAnimations[i].id) {
				ActiveAnimations[i].config = animation.config;
			}
		}
	});
});


function Strip(arr) {
	var animations = JSON.stringify(arr.slice())
	animations = JSON.parse(animations)

	delete animations.frame;

	return animations
}

function RenderStrip() {
	for (var i = 0; i < ActiveAnimations.length; i++) {
		Pixels = ActiveAnimations[i].requestFrame(Frame, Pixels)
	}

	Device.transfer(Pixels.buffer, Pixels.readBuffer);

	if (RUNNING) {
		Frame++;
		setTimeout(RenderStrip, 1000 / FPS);
	}
}
