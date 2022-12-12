document.addEventListener('DOMContentLoaded', function () {
	const scroller = new Scroller('#root');

	document.addEventListener('wheel', (event) => scroller.listenScroll(event));
	// document.addEventListener('swipeLeft', () => console.log('L'));
	// document.addEventListener('swipeRight', () => console.log('R'));
	document.addEventListener('swipeUp', () => scroller.scroll(1));
	document.addEventListener('swipeDown', () => scroller.scroll(-1));
});
