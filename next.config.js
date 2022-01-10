module.exports = {
  target: 'serverless',
  images: {
    domains: ['cdn.sanity.io']
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader']
    });

    return config;
  }
};
