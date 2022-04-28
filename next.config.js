/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const { API_REST_TIMEOUT, API_REST_URL } = require('./envConstants.js')

module.exports = () =>
  nextTranslate({
    env: {
      API_REST_TIMEOUT,
      API_REST_URL
    },
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true
    },
    images: {
      domains: ['api.quan2um.com']
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false
                  },
                  {
                    name: 'removeTitle',
                    active: false
                  },
                  {
                    name: 'convertShapeToPath',
                    active: false
                  },
                  {
                    name: 'mergePaths',
                    active: false
                  }
                ]
              }
            }
          }
        ]
      })

      return config
    }
  })
