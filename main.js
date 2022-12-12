document.addEventListener('DOMContentLoaded', function () {
	const scroller = new Scroller('#root');

	document.addEventListener('wheel', (event) => {
		console.log(event);
		scroller.listenScroll(event);
	});
});
