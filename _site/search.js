// Search Articles
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search");
  const itemsList = document.getElementById("blog-container");

  searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const items = itemsList.getElementsByClassName("blog-card");

    Array.from(items).forEach(item => {
      const title = item.getAttribute("data-name").toLowerCase();
      // const tags = item.getAttribute("data-categories").split(",").map(tag => tag.trim().toLowerCase());

      if (title.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// filter buttons logic
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
      console.log(categories);
      const matches = [...activeFilters].every(filter => categories.includes(filter));
      item.style.display = activeFilters.size === 0 || matches ? "flex" : "none";
  });
}

// Filter Buttons for CSS
document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute("data-filter") === 'all') {
      // Reset all buttons
      document.querySelectorAll(".filter-button").forEach(btn => {
        btn.classList.remove("active");
        btn.classList.remove("reset");
      });
    } else {
      // Toggle active class for clicked filter
      button.classList.toggle("active");
    }
  });
});