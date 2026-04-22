const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  toggle: (callback) => ipcRenderer.on("toggle-view", callback)
});