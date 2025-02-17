module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src//styles/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/scripts/watch-now-script.js");
  eleventyConfig.addPassthroughCopy("./src/scripts/mobile-menu-script.js");
  eleventyConfig.addPassthroughCopy("./src/scripts/transition-script.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/register.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/login.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/dashboard.js");
  eleventyConfig.addPassthroughCopy("./src/firebase/firebase-config.js");
  eleventyConfig.addPassthroughCopy("./src/scripts/search.js");
  eleventyConfig.addPassthroughCopy("./src/scripts/search-episodes.js");
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
  eleventyConfig.addFilter("filtername", function(tag) {
    const mapper = {
      "finance": "Finance & Budgeting",
      "pre": "Pre-Construction",
      "during": "During Construction",
      "post": "Post-Construction",
      "legal": "Legal & Contracts",
      "first": "First Home Buyer",
      "investor": "Investor",
      "upsizing": "Upsizing & Downsizing",
      "design": "Design & Trends",
      "sustainability": "Sustainability & Energy Efficiency",
      "smart": "Smart Home & Tech",
      "news": "News & Industry Insights"
    };
    return mapper[tag];
  });
  // eleventyConfig.addCollection("posts");
  return {
    dir: {
      input: "src",
    }
  };
};