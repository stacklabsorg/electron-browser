const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

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
}

app.whenReady().then(() => {
  createWindow();

  // 🔥 IMPORTANT: wait a bit before shortcut register
  setTimeout(() => {
    const success = globalShortcut.register("CommandOrControl+Space", () => {
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
