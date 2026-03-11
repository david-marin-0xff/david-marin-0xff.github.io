const toggle = document.getElementById("themeToggle")

toggle.onclick = () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
toggle.textContent="🌙"
}else{
toggle.textContent="☀️"
}

}