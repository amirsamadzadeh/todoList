export const showLoader = () => {
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = `
    <div class="loader">
    <div class="spinner"></div>
    </div>
  `;
  document.body.appendChild(loader);
};

export const hideLoader = () => {
  const loader = document.querySelector(".loader-overlay");
  if (loader) loader.remove();
};
