module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('img');
	eleventyConfig.addPassthroughCopy('app');
	eleventyConfig.addPassthroughCopy('robots.txt');

	eleventyConfig.addCollection('projects', function (collectionApi) {
		return collectionApi
			.getFilteredByGlob('src/projects/*.html')
			.sort((a, b) => {
				// First priority: Check for important: yes
				const isFeaturedA = a.data.featured === 'yes';
				const isFeaturedB = b.data.featured === 'yes';

				if (isFeaturedA !== isFeaturedB) {
					return isFeaturedA ? -1 : 1;
				}

				// Second priority: Check order
				const orderA =
					a.data.order !== undefined ? a.data.order : Infinity;
				const orderB =
					b.data.order !== undefined ? b.data.order : Infinity;

				if (orderA !== orderB) {
					return orderA - orderB;
				}

				// Third priority: Sort by date
				return new Date(b.data.date) - new Date(a.data.date);
			});
	});

	eleventyConfig.addCollection(
		'nonFeaturedProjects',
		function (collectionApi) {
			return collectionApi
				.getFilteredByGlob('src/projects/*.html')
				.filter((item) => item.data.featured !== 'yes')
				.sort((a, b) => {
					// First priority: Check order
					const orderA =
						a.data.order !== undefined
							? a.data.order
							: Infinity;
					const orderB =
						b.data.order !== undefined
							? b.data.order
							: Infinity;
					if (orderA !== orderB) {
						return orderA - orderB;
					}
					// Second priority: Sort by date
					return new Date(b.data.date) - new Date(a.data.date);
				});
		}
	);

	return {
		dir: {
			input: 'src',
			output: '_site',
			includes: '_templates',
		},
		data: {
			siteUrl: 'https://tinypond.studio',
		},
	};
};
