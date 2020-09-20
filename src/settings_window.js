const { ipcRenderer } = require("electron");
var data = require("../settings.json");
const fs = require("fs");
var settingText = document.getElementsByClassName("settingText");

for (let i = 0; i < data.length; i++) {
  settingText[i].value = data[i];
}
console.log("ff");
for (let i = 0; i < settingText.length; i++) {
  settingText[i].addEventListener("change", () => {
    changeText(i);
  });
}

function changeText(x) {
  console.log(x);
  data[x] = settingText[x].value;
  fs.writeFile("settings.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log("write file error");
    }
  });
  ipcRenderer.send("changeText", x, data[x]);
}
