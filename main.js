const { app, BrowserWindow, globalShortcut, session } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("disable-features", "WebAuthentication");

let win;
let isFB = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Workspace",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      webviewTag: true
    }
  });

  win.loadFile("index.html");

  win.on("minimize", () => {
    if (isFB) {
      isFB = false;
      win.webContents.send("toggle-view", false);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const denied = ["usb", "hid", "serial", "midi", "midiSysex", "mediaKeySystem"];
    callback(!denied.includes(permission));
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    const denied = ["usb", "hid", "serial", "midi", "midiSysex", "mediaKeySystem"];
    return !denied.includes(permission);
  });

  setTimeout(() => {
    const success = globalShortcut.register("CommandOrControl+Tab", () => {
      if (!win) return;

      isFB = !isFB;
      win.webContents.send("toggle-view", isFB);
    });

    console.log("Shortcut registered:", success);
  }, 1000);
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
