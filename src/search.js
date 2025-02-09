document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search");
  const itemsList = document.getElementById("blog-container");

  searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const items = itemsList.getElementsByClassName("blog-card");

    Array.from(items).forEach(item => {
      const title = item.getAttribute("data-name").toLowerCase();
      const tags = item.getAttribute("data-tags").split(",").map(tag => tag.trim().toLowerCase());

      if (title.includes(query) || tags.some(tag => tag.includes(query))) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

let activeFilters = new Set();

document.querySelectorAll("button[data-filter]").forEach(button => {
  button.addEventListener("click", function() {
      let filter = this.getAttribute("data-filter");

      if (filter === "all") {
          activeFilters.clear(); // Reset filters
      } else {
          if (activeFilters.has(filter)) {
              activeFilters.delete(filter); // Toggle off
          } else {
              activeFilters.add(filter); // Toggle on
          }
      }
      console.log(filter);
      filterPosts();
  });
});

function filterPosts() {
  document.querySelectorAll(".blog-card").forEach(item => {
      const categories = item.getAttribute("data-categories");
      // .replace(/ /g, "-").replace(/&/g, "and")
      console.log(categories);

      const matches = [...activeFilters].every(filter => categories.includes(filter));

      item.style.display = activeFilters.size === 0 || matches ? "block" : "none";
  });
}