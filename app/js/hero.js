const textObject = document.getElementById('hero__title');
const words = [
	'Visuals.',
	'Branding.',
	'Animation.',
	'Websites',
	'Experiences.',
]; // array of words
let currentWordIndex = 1;
let opacity = 1;

let animationDirection = -1; // -1 for fade out, 1 for fade in

function animate() {
	opacity += animationDirection * 0.01;

	textObject.style.opacity = opacity;

	if (opacity <= 0 && animationDirection === -1) {
		// fade out complete, update text and start fade in

		textObject.textContent = words[currentWordIndex];

		currentWordIndex = (currentWordIndex + 1) % words.length;

		animationDirection = 1;
	} else if (opacity >= 1 && animationDirection === 1) {
		// fade in complete, start fade out

		animationDirection = -1;
	}

	requestAnimationFrame(animate);
}

setTimeout(animate, 1000); // delay the animation by 500ms
