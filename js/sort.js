const sortDropdown = document.querySelectorAll(".dropdown")[1];
const sortToggle = sortDropdown.querySelector(".dropdown__toggle");
const sortMenu = sortDropdown.querySelector(".dropdown__menu");

sortToggle.addEventListener("click", () => {
  sortMenu.style.display =
    sortMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!sortDropdown.contains(e.target)) {
    sortMenu.style.display = "none";
  }
});
