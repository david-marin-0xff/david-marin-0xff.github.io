// THEME TOGGLE

const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector(".icon");
const label = toggle.querySelector(".label");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  icon.textContent = "☀️";
  label.textContent = "Light";
}

toggle.onclick = () => {
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
};


// TERMINAL TYPING EFFECT (LOOPING + SMOOTH RESET)

document.addEventListener("DOMContentLoaded", () => {

  const text = 'echo "Welcome to my blog!"';
  const cmdEl = document.getElementById("cmd");
  const cursor = document.getElementById("typingCursor");
  const output = document.getElementById("out");
  const finalLine = document.getElementById("final");

  function startTyping() {

    let i = 0;

    // Reset state cleanly
    cmdEl.textContent = "";
    cursor.style.display = "inline-block";
    output.classList.remove("show");
    finalLine.classList.remove("show");

    function typeChar() {
      if (i < text.length) {
        cmdEl.textContent += text[i];
        i++;

        const delay = Math.random() * 80 + 40;
        setTimeout(typeChar, delay);

      } else {

        // Stop typing cursor
        cursor.style.display = "none";

        // Show output
        setTimeout(() => {
          output.classList.add("show");
        }, 150);

        // Show final prompt
        setTimeout(() => {
          finalLine.classList.add("show");
        }, 350);

        // 🔁 Restart loop smoothly
        setTimeout(() => {
          cmdEl.textContent = "";
          startTyping();
        }, 3000);
      }
    }

    typeChar();
  }

  startTyping();

});