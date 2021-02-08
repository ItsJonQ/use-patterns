module.exports = {
	async redirects() {
		return [
			{
				source: '/patterns',
				destination: '/',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/patterns',
				destination: '/',
			},
		];
	},
};
