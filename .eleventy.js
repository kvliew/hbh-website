module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/main-styles.css");
  eleventyConfig.addPassthroughCopy("./src/styles/host-page.css");
  eleventyConfig.addPassthroughCopy("./src/assets/logo.svg");
  eleventyConfig.addPassthroughCopy("./src/script.js");
  eleventyConfig.addPassthroughCopy("./src/assets/colin-bischof.jpg");
  eleventyConfig.addPassthroughCopy("./src/assets/darren-brennan.jpg");
  return {
    dir: {
      input: "src",
    }
  };
};