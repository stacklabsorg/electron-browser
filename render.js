const fb = document.getElementById("fbView");
const appUI = document.getElementById("app");

let isFB = false;

// preload থেকে event আসবে
window.electronAPI.toggle(() => {
  isFB = !isFB;

  if (isFB) {
    fb.style.display = "block";
    appUI.style.display = "none";
  } else {
    fb.style.display = "none";
    appUI.style.display = "flex";
  }
});