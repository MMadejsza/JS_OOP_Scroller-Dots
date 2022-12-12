class Scroller {
	constructor(rootSelector) {
		//- getting DOM elements
		const rootElement = document.querySelector(rootSelector);
		this.sections = document.querySelectorAll('section'); //- nodeList!
		// this.currentSectionIndex = 0; //- variable to hold section position - index 0 in nodeList
		const currentSectionIndex = [...this.sections].findIndex((element) =>
			this.isScrolledIntoView(element),
		); //- browser saves last scrolled paragraph so we have to localize it and assign proper one
		this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;
		this.isThrottled = false; //- to prevent to much scrolling with scrollIntoView
		this.isScrolledIntoView(this.sections[0]);
		this.drawNavigation();
	}

	isScrolledIntoView(el) {
		const rect = el.getBoundingClientRect();
		const top = rect.top;
		const bottom = rect.bottom;
		const isVisible = top >= 0 && bottom <= window.innerHeight;
		return isVisible;
	}

	listenScroll(event) {
		//- arrow function to bind this
		if (this.isThrottled) return;
		this.isThrottled = true;
		setTimeout(() => {
			//- is asynchronic so we don't have to wait till the code is fully read
			this.isThrottled = false;
		}, 1000);

		//- on scroll
		const direction = event.wheelDelta < 0 ? 1 : -1; //- catching direction and conditional assignment
		this.scroll(direction);
	}
	scroll(direction) {
		if (direction === 1) {
			//- forward / down the page
			const isLastSection = this.currentSectionIndex === this.sections.length - 1; //- because length is counted from 1 and index from 0.
			//- Assigned boolean value
			if (isLastSection) return; //- if first or last section - we stop the function
		} else if (direction === -1) {
			const firstSection = this.currentSectionIndex === 0;
			if (firstSection) return;
		}
		//# on wheel:
		this.currentSectionIndex += direction; //- because we used at line 7 conditional assignment -> direction is -1/1 so we can just add it without extra "IFs".
		this.scrollToCurrentSection();
	}
	scrollToCurrentSection() {
		this.selectActiveNavItem();
		this.sections[this.currentSectionIndex].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}

	drawNavigation() {
		this.navigationContainer = document.createElement('aside');
		this.navigationContainer.setAttribute('class', 'scroller__navigation');
		const list = document.createElement('ul');
		this.sections.forEach((section, index) => {
			const listItem = document.createElement('li');
			listItem.addEventListener('click', () => {
				this.currentSectionIndex = index;
				this.scrollToCurrentSection();
			});
			list.appendChild(listItem);
		});
		this.navigationContainer.append(list);
		document.body.appendChild(this.navigationContainer);
		this.selectActiveNavItem();
	}
	selectActiveNavItem() {
		const scrollDots = this.navigationContainer.querySelectorAll('li');
		scrollDots.forEach((dot, index) => {
			if (index === this.currentSectionIndex) {
				dot.classList.add('active');
			} else {
				dot.classList.remove('active');
			}
		});
	}
}
