/** @type {import('next').NextConfig} */
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// module.exports = {
// 	reactStrictMode: true,
// 	future: {
// 		webpack5: true,
// 	},
// 	resolver: {
// 		sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
// 		assetExts: ['glb', 'png', 'jpg'],
// 	},
// }

// const withTM = require('next-transpile-modules')(['three'])
// module.exports = withTM()

module.exports = {
  // plugins: [new NodePolyfillPlugin()],
  images: {
    domains: ["ipfs.io"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  env: {
    // NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
  },
};
