const path = require('path');
const fs = require('fs');

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  env: {
    // smart recruitment api endpoint
    API_URL: "http://127.0.0.1:8001",
    MAP_KEY : "NWa64EX6jx0RpgDqU2eF",

    // Smart auth api endpoint
    SMART_AUTH_API : "http://127.0.0.1:8000"
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
  // , serverOptions: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
  //   }
  // }
});