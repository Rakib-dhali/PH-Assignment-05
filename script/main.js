const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const btn = document.querySelectorAll(".btn");

function removeActive() {
  btn.forEach((b) => b.classList.remove("active"));
}
allBtn.addEventListener("click", () => {
  removeActive();
  allBtn.classList.add("active");
});
openBtn.addEventListener("click", () => {
  removeActive();
  openBtn.classList.add("active");
});
closedBtn.addEventListener("click", () => {
  removeActive();
  closedBtn.classList.add("active");
});
