function AnimationViewModel() {
	"use strict";

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

		}
	};

	this.currentAnimation = {

		// Properties
		config: {
			name: '',

		},

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
				choices: ko.observableArray(control.choices || []),

			});
		},

		// Event Handlers
		onCloseAnimationClick: function (e) {

		}
	};
}

var viewModel = new AnimationViewModel();