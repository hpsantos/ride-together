const path = require("path")

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles", "scss")],
  },
  images: {
    domains: ["i.pravatar.cc"],
  },
  webpack(config) {
    return config
  },
}
