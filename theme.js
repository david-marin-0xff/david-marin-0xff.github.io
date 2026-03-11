const toggle = document.getElementById("themeToggle");

const icon = toggle.querySelector(".icon");
const label = toggle.querySelector(".label");


/* Load saved theme */

if (localStorage.getItem("theme") === "light") {

  document.body.classList.add("light");

  icon.textContent = "☀️";
  label.textContent = "Light";

}


/* Toggle theme */

toggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {

    icon.textContent = "☀️";
    label.textContent = "Light";

    localStorage.setItem("theme", "light");

  } else {

    icon.textContent = "🌙";
    label.textContent = "Dark";

    localStorage.setItem("theme", "dark");

  }

});