const menuOverlay = document.getElementById("overlay-wrapper");

function handleMenu() {
  menuOverlay.classList.toggle("active");
}

const watchNowButton = document.getElementById("watch-now");
const secondHomeSection = document.getElementById("home-section-2");

watchNowButton.addEventListener("click", () => {
  secondHomeSection.scrollIntoView();
});