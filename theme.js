// THEME TOGGLE

const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector(".icon");
const label = toggle.querySelector(".label");

if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
  icon.textContent = "☀️";
  label.textContent = "Light";
}

toggle.onclick = () => {
  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){
    icon.textContent = "☀️";
    label.textContent = "Light";
    localStorage.setItem("theme","light");
  }else{
    icon.textContent = "🌙";
    label.textContent = "Dark";
    localStorage.setItem("theme","dark");
  }
};


// TERMINAL TYPING EFFECT

document.addEventListener("DOMContentLoaded", () => {

  const text = 'echo "Welcome to my blog!"';
  const cmdEl = document.getElementById("cmd");
  const cursor = document.getElementById("typingCursor");

  let i = 0;

  function typeChar(){
    if(i < text.length){
      cmdEl.textContent += text[i];
      i++;

      const delay = Math.random() * 80 + 40; // realistic typing
      setTimeout(typeChar, delay);
    } else {
      cursor.style.display = "none";

      setTimeout(() => {
        document.getElementById("out").classList.add("show");
      }, 150);

      setTimeout(() => {
        document.getElementById("final").classList.add("show");
      }, 350);
    }
  }

  typeChar();

});