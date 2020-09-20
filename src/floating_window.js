const win = require("electron").remote.getCurrentWindow();
const { ipcRenderer } = require("electron");
var data = require("../settings.json");
var text = document.getElementsByClassName("text");

for (let i = 0; i < data.length; i++) {
  let temp;
  if (data[i].length > 15) {
    temp = data[i].substring(0, 13) + "...";
  } else {
    temp = data[i];
  }
  text[i].innerHTML = temp;
}

for (let i = 0; i < text.length; i++) {
  text[i].addEventListener("click", () => {
    ipcRenderer.send("type", text[i].innerHTML);
  });
}

ipcRenderer.on("changeText", (event, num, msg) => {
  data[num] = msg;
  let temp;
  if (msg.length > 15) {
    temp = msg.substring(0, 13) + "...";
  } else {
    temp = msg;
  }
  text[num].innerHTML = temp;
});
