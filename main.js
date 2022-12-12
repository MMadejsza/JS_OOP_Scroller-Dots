document.addEventListener('DOMContentLoaded', function () {
	//- getting DOM elements
	const rootElement = document.querySelector('#root');
	const sections = document.querySelectorAll('section'); //- nodeList!
	let currentSectionIndex = 0; //- variable to hold section position - index 0 in nodeList
	let isThrottled = false; //- to prevent to much scrolling with scrollIntoView
	document.addEventListener('mousewheel', function (event) {
		if (isThrottled) return;
		isThrottled = true;
		setTimeout(() => {
			//- is asynchronic so we don't have to wait till the code is fully read
			isThrottled = false;
		}, 750);

		//- on scroll
		const direction = event.wheelDelta < 0 ? 1 : -1; //- catching direction and conditional assignment
		scroll(direction);
	});

	function scroll(direction) {
		if (direction === 1) {
			//- forward / down the page
			const isLastSection = currentSectionIndex === sections.length - 1; //- because length is counted from 1 and index from 0.
			//- Assigned boolean value
			if (isLastSection) return; //@ if first or last section - we stop the function
		} else if (direction === -1) {
			const firstSection = currentSectionIndex === 0;
			if (firstSection) return;
		}
		//# on wheel:
		currentSectionIndex += direction; //- because we used at line 7 conditional assignment -> direction is -1/1 so we can just add it without extra "IFs".
		scrollToCurrentSection();
	}
	function scrollToCurrentSection() {
		sections[currentSectionIndex].scrollIntoView({behavior: 'smooth', block: 'start'});
	}
});
