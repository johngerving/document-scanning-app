const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  submitForm: (data) => ipcRenderer.send("submit-form", data),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
});
