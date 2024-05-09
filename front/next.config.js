/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		externalDir: true,
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	webpack: (config) => {
		config.resolve.extensionAlias = {
			'.js': ['.ts', '.tsx', '.js'],
		}

		return config
	},
}

module.exports = nextConfig
