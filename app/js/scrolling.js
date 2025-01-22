const scrollLinks = document.querySelectorAll('.js-scroll');
console.log(scrollLinks);

scrollLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();

		const href = link.getAttribute('href');
		document.querySelector(href).scrollIntoView({
			behavior: 'smooth',
		});
	});
});
