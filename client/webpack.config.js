module.exports = {
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      fs: false,
      tls: false,
      net: false,
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      http: require.resolve("stream-http"),
      https: false,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
};
