const path = require('path')
require('dotenv').config()
const withVideos = require('next-videos')

/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
    },

    publicRuntimeConfig: {
    },

    webpack: (config, options) => {
        config.resolve.alias['components'] = path.join(__dirname, 'components')
        config.resolve.alias['public'] = path.join(__dirname, 'public')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')
        config.resolve.alias['contexts'] = path.join(__dirname, 'contexts')
        config.resolve.alias['dictionaries'] = path.join(__dirname, 'dictionaries')
        use: [
            options.defaultLoaders.babel,
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            },
          ]
        return config
    },

    
    
};
module.exports = withVideos(nextConfig);
