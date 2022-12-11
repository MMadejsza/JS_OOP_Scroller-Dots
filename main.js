document.addEventListener('DOMContentLoaded', function () {
	//- getting DOM elements
	const rootElement = document.querySelector('#root');
	const sections = document.querySelectorAll('section'); //- nodeList!
	let currentSectionIndex = 0; //- variable to hold section position - index 0 in nodeList
	document.addEventListener('mousewheel', function (event) {
		//- on scroll
		const direction = event.wheelDelta < 0 ? 1 : -1; //- catching direction and conditional assignment
		if (direction === 1) {
			//- forward / down the page
			const isLastSection = currentSectionIndex === sections.length - 1; //- because length is counted from 1 and index from 0.
			//*Assigned boolean value
			if (isLastSection) return; //@ if first or last section - we stop the function
		} else if (direction === -1) {
			const firstSection = currentSectionIndex === 0;
			if (firstSection) return;
		}
		//# on wheel:
		currentSectionIndex += direction; //- because we used at line 7 conditional assignment -> direction is -1/1 so we can just add it without extra "IFs".
		console.log('🚀 ~ file: main.js:16 ~ currentSectionIndex', currentSectionIndex);
	});
});
