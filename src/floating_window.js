const win = require("electron").remote.getCurrentWindow();
const ipcRenderer = require("electron").ipcRenderer;
var el = document.getElementsByClassName("text");
for (let i = 0; i < el.length; i++) {
  el[i].addEventListener("click", () => {
    ipcRenderer.send("type", el[i].innerHTML);
  });
}
