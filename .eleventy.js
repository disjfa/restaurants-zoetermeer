module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("build");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("icons");

  eleventyConfig.addCollection("nav", function (collection) {
    return collection.getFilteredByTag("menu").sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("restaurant", function (collection) {
    return collection.getFilteredByTag("restaurant").filter(r => !r.data.closed);
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getFilteredByTag("restaurant").forEach(function (item) {
      if (item.data.closed) {
        return;
      }
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
            case "page":
            case "restaurant":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag.toLowerCase());
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet].sort();
  });

  return {
    pathPrefix: "/restaurants-zoetermeer",

    dir: {
      input: "_site",
      output: "dist"
    }
  };
};
