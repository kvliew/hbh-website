module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/watch-now-script.js");
  eleventyConfig.addPassthroughCopy("./src/mobile-menu-script.js");
  eleventyConfig.addPassthroughCopy("./src/transition-script.js");
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getFilteredByGlob("./src/articles/*.md")
      .sort((a, b) => b.data.articlenumber - a.data.articlenumber);
  });
  eleventyConfig.addCollection("guests", function(collection) {
    return collection.getFilteredByGlob("./src/guests/*.md")
      .sort((a, b) => a.data.guestepisodenumber - b.data.guestepisodenumber);
  });
  eleventyConfig.addCollection("resources", function(collection) {
    return collection.getFilteredByGlob("./src/resources/*.md")
      .sort((a, b) => a.data.episodenumber - b.data.episodenumber);
  });
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