const watchNowButton = document.getElementById("watch-now");
const secondHomeSection = document.getElementById("home-section-2");

watchNowButton.addEventListener("click", () => {
  secondHomeSection.scrollIntoView();
});

// scroll transition script
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));