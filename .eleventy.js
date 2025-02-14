module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/watch-now-script.js");
  eleventyConfig.addPassthroughCopy("./src/mobile-menu-script.js");
  eleventyConfig.addPassthroughCopy("./src/transition-script.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/register.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/login.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/perks.js");
  eleventyConfig.addPassthroughCopy("./src/search.js");
  // eleventyConfig.addFilter('stringify', (data) => {
  //   return data;
  // });
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
  eleventyConfig.addFilter("filtername", function(categorynumber) {
    const mapper = {
      1: "Finance & Budgeting",
      2: "Pre-Construction",
      3: "During Construction",
      4: "Post-Construction",
      5: "Legal & Contracts",
      6: "First Home Buyer",
      7: "Investor",
      8: "Upsizing & Downsizing",
      9: "Design & Trends",
      10: "Sustainability & Energy Efficiency",
      11: "Smart Home & Tech",
      12: "News & Industry Insights"
    };
    return mapper[categorynumber];
  });
  // eleventyConfig.addCollection("posts");
  return {
    dir: {
      input: "src",
    }
  };
};