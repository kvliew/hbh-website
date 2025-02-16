// Search Episodes
document.addEventListener("DOMContentLoaded", function() {
  const searchEpisodesInput = document.getElementById("search-episodes");
  const itemsList = document.getElementById("episodes-container");

  searchEpisodesInput.addEventListener("input", function() {
    const query = searchEpisodesInput.value.toLowerCase();
    const items = itemsList.getElementsByClassName("episode-card");

    Array.from(items).forEach(item => {
      const title = item.getAttribute("data-name").toLowerCase();

      if (title.includes(query)) {
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }
    });
  });
});