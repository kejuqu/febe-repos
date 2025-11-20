/** @type {import('next').NextConfig} */
const nextConfig = {
	// Allow importing files from outside the Next.js app directory (monorepo packages)
	experimental: {
		externalDir: true,
	},
	// Transpile the shared package so Next processes its code/CSS
	transpilePackages: ['@repo/shared'],
};

export default nextConfig;
