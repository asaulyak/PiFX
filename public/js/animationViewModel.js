function AnimationViewModel() {
	"use strict";

	var socket = io.connect('http://' + window.location.hostname);

	socket.on('initialize', function (data) {
		//ACTIVE_ANIMATIONS = data.activeAnimations;
		//ANIMATIONS = data.animations;
		//
		//renderInterface();
	});

	this.availableAnimations = {

		// Properties
		animations: ko.observableArray([]),

		// Methods
		addAnimation: function (animation) {
			this.animations.push({
				name: ko.observable(animation.name)
			});
		},

		// Event Handlers
		onAddAnimationClick: function (e) {
			console.log(e);
		}
	};

	this.currentAnimation = {

		// Properties
		name: '',
		controls: ko.observableArray([]),

		// Methods
		addControl: function (control) {
			this.controls.push({
				name: ko.observable(control.name),
				type: ko.observable(control.type),
				min: ko.observable(control.min),
				max: ko.observable(control.max),
				step: ko.observable(control.step),
				value: ko.observable(control.value),
				choices: ko.observableArray(control.choices || [])
			});
		},

		// Event Handlers
		onCloseAnimationClick: function (e) {

		}
	};
}

var viewModel = new AnimationViewModel();