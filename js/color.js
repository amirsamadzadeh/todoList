const colorBoxes = document.querySelectorAll(".color__change");
const root = document.documentElement;

colorBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    const color = getComputedStyle(box).backgroundColor;
    root.style.setProperty("--active-color", color);
    document.body.setAttribute("data-theme-color", true);
  });
});
