module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('fonts');
	eleventyConfig.addPassthroughCopy('img');
	eleventyConfig.addPassthroughCopy('app');
	eleventyConfig.addPassthroughCopy('src/robots.txt');

	eleventyConfig.addCollection('projects', function (collectionApi) {
		return collectionApi
			.getFilteredByGlob('src/projects/*.html')
			.sort((a, b) => {
				const orderA =
					a.data.order !== undefined ? a.data.order : Infinity;
				const orderB =
					b.data.order !== undefined ? b.data.order : Infinity;

				// If `order` exists in both, sort by `order`
				if (orderA !== orderB) {
					return orderA - orderB;
				}

				// If `order` is the same or missing, sort by `date`
				return new Date(b.data.date) - new Date(a.data.date);
			});
	});

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
