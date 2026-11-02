var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].setAttribute('aria-expanded', 'false');
	coll[i].addEventListener('click', function () {
		this.classList.toggle('active');
		var content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
			this.setAttribute('aria-expanded', 'false');
		} else {
			content.style.maxHeight = content.scrollHeight + 'px';
			this.setAttribute('aria-expanded', 'true');
		}
	});
}
