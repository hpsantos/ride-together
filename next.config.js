const path = require('path')

const addDirAlias = (config) => {
  config.resolve.alias["@components"] = path.resolve(__dirname, "components")
  config.resolve.alias["@scss"] = path.resolve(__dirname, "styles", "scss")
}

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles", "scss")],
  },
  webpack(config) {
    addDirAlias(config)
    return config;
  }
}
