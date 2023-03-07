module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/");
  eleventyConfig.addPassthroughCopy("./src/assets/logo.svg");
  eleventyConfig.addPassthroughCopy("./src/script.js");
  eleventyConfig.addPassthroughCopy("./src/mobile-menu-script.js");
  eleventyConfig.addPassthroughCopy("./src/assets/colin-bischof.jpg");
  eleventyConfig.addPassthroughCopy("./src/assets/darren-brennan.jpg");
  eleventyConfig.addCollection("posts");
  return {
    dir: {
      input: "src",
    }
  };
};