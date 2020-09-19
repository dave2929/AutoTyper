const settingText = document.getElementById("settingText1");
settingText.addEventListener("change", (event) => {
  text.innerHTML = event.target.value;
});
