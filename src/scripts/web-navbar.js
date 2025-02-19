const navBar = document.getElementById("nav-bar");
const logo = document.getElementById("logo");
const dropdown = document.getElementById("resources-dropdown");
const resourcesLabel = document.getElementById("resources-text");
// const arrow = document.getElementById("dropdown-arrow");

dropdown.addEventListener('click', function() {
  dropdown.classList.toggle('show');
  resourcesLabel.classList.toggle('show');
  // arrow.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) { 
    dropdown.classList.remove('show');
    resourcesLabel.classList.remove('show');
    // arrow.classList.remove('show');
  }
});

window.addEventListener('scroll', function() {
  if (window.innerWidth > 1100) {
    if (window.scrollY > 50) {
      navBar.classList.add('scrolled');
      logo.classList.add('scrolled');
      // navBar.classList.add('sticky-nav');
    } else {
      navBar.classList.remove('scrolled');
      logo.classList.remove('scrolled');
      // document.body.classList.remove('sticky-nav');
    }
  }
});
