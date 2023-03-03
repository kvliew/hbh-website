module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles.css");
  eleventyConfig.addPassthroughCopy("./src/assets/logo.svg");
  eleventyConfig.addPassthroughCopy("./src/script.js");
  eleventyConfig.addPassthroughCopy("./src/assets/colin-bischof.jpg");
  eleventyConfig.addPassthroughCopy("./src/assets/darren-brennan.jpg");
  eleventyConfig.addPassthroughCopy("./src/host-page.css");
  return {
    dir: {
      input: "src",
    }
  };
};