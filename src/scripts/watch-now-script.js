const watchNowButton = document.getElementById("watch-now");
const secondHomeSection = document.getElementById("home-section-2");

watchNowButton.addEventListener("click", () => {
  secondHomeSection.scrollIntoView();
});