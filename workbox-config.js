module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{js,css,html,png,svg,json}'],
    swDest: 'build/sw.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
        {
          urlPattern: /^https?:\/\/broker\.hivemq\.com\/.*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'mqtt-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60, // 5 minutes
            },
          },
        },
      ],
  };
  