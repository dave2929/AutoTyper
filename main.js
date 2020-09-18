const { app, BrowserWindow, ipcMain } = require("electron");
const robot = require("robotjs");
// robot.setKeyboardDelay(1);
let floatingWindow;
let settingsWindow;
function createWindow() {
  floatingWindow = new BrowserWindow({
    width: 250,
    height: 450,
    titleBarStyle: "hide",
    transparent: true,
    frame: false,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    focusable: false, // no icon, cannot focus
    // opacity: 0.5,
  });
  settingsWindow = new BrowserWindow({
    frame: false,
  });
  floatingWindow.loadFile("floating_window.html");
  floatingWindow.setAlwaysOnTop(true, "floating");
  // floatingWindow.setIgnoreMouseEvents(true);
  // floatingWindow.webContents.openDevTools();

  floatingWindow.show();
  settingsWindow.show();

  // close
  settingsWindow.on("closed", () => {
    floatingWindow.close();
  });
}
ipcMain.on("type", (event, msg) => {
  // console.log(msg);
  robot.typeStringDelayed(msg, 99999);
  robot.keyTap("enter");
});
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// macos
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
