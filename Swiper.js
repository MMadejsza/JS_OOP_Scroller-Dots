class Swiper {
	constructor() {
		this.initialY = null;
		this.initialX = null;
		document.addEventListener('touchmove', this.moveTouch.bind(this));
		document.addEventListener('touchstart', this.startTouch.bind(this));
		this.events = {
			swipeUp: new Event('swipeUp'),
			swipeDown: new Event('swipeDown'),
			swipeLeft: new Event('swipeLeft'),
			swipeRight: new Event('swipeRight'),
		};
	}

	startTouch(event) {
		event.preventDefault();
		this.initialX = event.touches[0].clientX;
		this.initialY = event.touches[0].clientY;
	}
	moveTouch(event) {
		if (!this.initialX || !this.initialY) {
			return;
		}
		const currentX = event.touches[0].clientX;
		const currentY = event.touches[0].clientY;

		const diffX = this.initialX - currentX;
		const diffY = this.initialY - currentY;
		if (Math.abs(diffX) > Math.abs(diffY)) {
			// we are in X axis
			if (diffX > 0) {
				//- left swipe
				document.dispatchEvent(this.events.swipeLeft);
			} else {
				//- right swipe
				document.dispatchEvent(this.events.swipeRight);
			}
		} else {
			// we are in Y axis
			if (diffY > 0) {
				// up
				document.dispatchEvent(this.events.swipeUp);
			} else {
				// down
				document.dispatchEvent(this.events.swipeDown);
			}
		}
		this.initialY = null;
		this.initialX = null;
	}
}

new Swiper();
