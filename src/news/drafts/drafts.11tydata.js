// Drafts render with `npm run dev` but are left out of production builds
const isServe = process.env.ELEVENTY_RUN_MODE === 'serve';

module.exports = {
	eleventyExcludeFromCollections: !isServe,
	eleventyComputed: {
		permalink: (data) => (isServe ? data.permalink : false),
	},
};
