module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles.css")
  eleventyConfig.addPassthroughCopy("./src/assets/logo.svg")
  return {
    dir: {
      input: "src",
    }
  }
}