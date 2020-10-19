const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Tray,
  Menu,
} = require("electron");
const robot = require("robotjs");
robot.setKeyboardDelay(1);
var floatingWindow;
var settingsWindow;
var tray;
var floatingWindowShow = true;
function createWindow() {
  floatingWindow = new BrowserWindow({
    width: 250,
    height: 450,
    titleBarStyle: "hide",
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
    focusable: false, // no icon, cannot focus
  });
  settingsWindow = new BrowserWindow({
    width: 350,
    height: 550,
    resizable: true,
    icon: "icon/favicon.ico",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
  });
  settingsWindow.removeMenu();
  floatingWindow.loadFile("src/floating_window.html");
  floatingWindow.setAlwaysOnTop(true, "floating");
  settingsWindow.loadFile("src/settings_window.html");
  // floatingWindow.webContents.openDevTools();
  // settingsWindow.webContents.openDevTools();

  floatingWindow.show();
  floatingWindowShow = true;
  settingsWindow.show();

  // close
  settingsWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      settingsWindow.hide();
    }
  });
}

function createTray() {
  tray = new Tray("icon/favicon.ico");
  let template = [
    {
      label: "Show",
      click: () => {
        settingsWindow.show();
      },
    },
    {
      label: "Exit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ];
  const contextMenu = Menu.buildFromTemplate(template);
  tray.on("click", (event) => {
    settingsWindow.show();
  });
  tray.setToolTip("AutoTyper");
  tray.setContextMenu(contextMenu);
}

ipcMain.on("type", (event, msg) => {
  // console.log(msg);
  robot.keyTap("enter");
  robot.typeStringDelayed(msg, 50000);
  robot.keyTap("enter");
});

ipcMain.on("changeText", (event, num, msg) => {
  floatingWindow.webContents.send("changeText", num, msg);
});

app.on("ready", () => {
  createWindow();
  createTray();
  globalShortcut.register("Shift+`", () => {
    console.log("111");
    if (floatingWindowShow == true) {
      floatingWindowShow = false;
      floatingWindow.hide();
    } else {
      floatingWindowShow = true;
      floatingWindow.show();
    }
  });

  for (let i = 1; i <= 10; i++) {
    globalShortcut.register("F" + i, () => {
      floatingWindow.webContents.send("hotKeyType", i - 1);
    });
  }
  globalShortcut.register("Alt+q", () => {
    app.isQuiting = true;
    app.quit();
  });
});

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

// Fix tray destroy
app.on("before-quit", () => {
  tray.destroy();
});
