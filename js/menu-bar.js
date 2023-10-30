// const toggleButton = document.getElementsByClassName("toggle-button")[0];
// const navbarLinks = document.getElementsByClassName("menu__li");

// toggleButton.addEventListener("click", () => {
//   navbarLinks.classList.toggle("active");
// });
// const toggleButton = document.querySelector(".toggle-button");
// const navbarLinks = document.querySelectorAll(".menu__li");

// toggleButton.addEventListener("click", () => {
//   navbarLinks.forEach((link) => {
//     link.classList.toggle("active");
//   });
// });

const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelectorAll(".menu__li");

toggleButton.addEventListener("click", () => {
  navbarLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.toggle("active");
    }, index * 40); // Delay each menu item's appearance by 100ms * index
  });
});
