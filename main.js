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
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    focusable: false, // no icon, cannot focus
    // opacity: 0.5,
  });
  settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hide",
    icon: "favicon.ico",
  });
  floatingWindow.loadFile("floating_window.html");
  floatingWindow.setAlwaysOnTop(true, "floating");
  settingsWindow.loadFile("settings_window.html");
  // floatingWindow.webContents.openDevTools();

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
  tray = new Tray("favicon.ico");
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
  robot.keyTap("enter");
  robot.typeStringDelayed(msg, 99999);
  robot.keyTap("enter");
});
app.on("ready", () => {
  createWindow();
  createTray();
  globalShortcut.register("`", () => {
    if (floatingWindowShow == true) {
      floatingWindow.hide();
      floatingWindowShow = false;
    } else {
      floatingWindow.show();
      floatingWindowShow = true;
    }
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
