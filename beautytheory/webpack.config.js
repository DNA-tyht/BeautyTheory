module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        "assets": resolve("@/assets"),
        "common": resolve("@/common"),
        "components": resolve("@/components"),
        "network": resolve("@/network"),
        "views": resolve("@/views"),
      }
    }
  }
}
