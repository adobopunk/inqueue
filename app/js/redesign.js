// Redesign draft: reveal-on-scroll, stat count-up, brand video modal, copy-to-clipboard email

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Count a stat up to its target, then show the original text
function countUp(el, delay) {
	const target = Number(el.dataset.count);
	const prefix = el.dataset.prefix || '';
	const suffix = el.dataset.suffix || '';
	const final = el.textContent;
	const duration = 1200;
	el.textContent = `${prefix}0${suffix}`;
	setTimeout(() => {
		const start = performance.now();
		const tick = (now) => {
			const t = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - t, 3);
			el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
			if (t < 1) requestAnimationFrame(tick);
			else el.textContent = final;
		};
		requestAnimationFrame(tick);
	}, delay);
}

// Reveal blocks as they enter the viewport; stats count up left to right
const revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				entry.target
					.querySelectorAll('[data-count]')
					.forEach((stat, i) => countUp(stat, 200 + i * 350));
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	revealEls.forEach((el) => observer.observe(el));
} else {
	revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Brand video modal: the embed loads on open and unloads on close, which stops playback
const modal = document.querySelector('.video-modal');
if (modal && typeof modal.showModal === 'function') {
	const iframe = modal.querySelector('iframe');
	document.querySelectorAll('[data-open-video]').forEach((button) => {
		button.addEventListener('click', () => {
			iframe.src = iframe.dataset.src;
			modal.showModal();
		});
	});
	modal.querySelector('[data-close-video]').addEventListener('click', () => modal.close());
	// A click on the backdrop (outside the video) closes it
	modal.addEventListener('click', (e) => {
		if (e.target === modal) modal.close();
	});
	modal.addEventListener('close', () => iframe.removeAttribute('src'));
}

// Copy email buttons: feedback shows on the button itself
document.querySelectorAll('.copy-email').forEach((button) => {
	const status = button.querySelector('.copy-email__status');
	const idle = status.textContent;
	let timer;

	button.addEventListener('click', async () => {
		let copied = false;
		try {
			await navigator.clipboard.writeText(button.dataset.email);
			copied = true;
			window.getSelection().removeAllRanges();
		} catch {
			// Older browsers: select the address so it can be copied by hand
			const range = document.createRange();
			range.selectNodeContents(button.querySelector('.copy-email__addr'));
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
		status.textContent = copied ? 'Copied to clipboard' : 'Press Ctrl+C or ⌘C to copy';
		button.classList.toggle('is-copied', copied);
		clearTimeout(timer);
		timer = setTimeout(() => {
			status.textContent = idle;
			button.classList.remove('is-copied');
		}, 2500);
	});
});
