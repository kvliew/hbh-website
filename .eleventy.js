module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/watch-now-script.js");
  eleventyConfig.addPassthroughCopy("./src/mobile-menu-script.js");
  eleventyConfig.addPassthroughCopy("./src/transition-script.js");
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./src/posts/*.md")
      .sort((a, b) => a.data.number - b.data.number);
  });
  // eleventyConfig.addCollection("posts");
  return {
    dir: {
      input: "src",
    }
  };
};