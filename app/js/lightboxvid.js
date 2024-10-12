document.addEventListener('DOMContentLoaded', function () {
	const lightboxLinks = document.querySelectorAll('.lightbox-video');

	lightboxLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault(); // Prevent the default anchor click behavior

			// Get the video URL from the href attribute
			const videoUrl = this.getAttribute('href');

			// Create the video element for the lightbox
			const videoElement = `
                <video controls autoplay loop preload="auto" style="max-width: 100%;">
                    <source src="${videoUrl}" type="video/webm">
                    Your browser does not support the video tag.
                    <p>Error loading video. Please try again later.</p>
                </video>`;

			// Open the lightbox with the video
			openLightbox(videoElement);
		});
	});

	function openLightbox(content) {
		// Create a lightbox overlay
		const overlay = document.createElement('div');
		overlay.className = 'lightbox-overlay';
		overlay.innerHTML =
			content + '<button class="lightbox-close">Close</button>';

		// Append overlay to the body
		document.body.appendChild(overlay);

		// Close the lightbox when clicking outside or on the close button
		overlay.addEventListener('click', function (e) {
			if (
				e.target.className === 'lightbox-overlay' ||
				e.target.className === 'lightbox-close'
			) {
				document.body.removeChild(overlay);
			}
		});
	}
});
