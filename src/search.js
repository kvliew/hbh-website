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