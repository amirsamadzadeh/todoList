const filterDropdown = document.querySelectorAll(".dropdown")[0];
const filterToggle = filterDropdown.querySelector(".dropdown__toggle");
const filterMenu = filterDropdown.querySelector(".dropdown__menu");

filterToggle.addEventListener("click", () => {
  filterMenu.style.display =
    filterMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!filterDropdown.contains(e.target)) {
    filterMenu.style.display = "none";
  }
});
