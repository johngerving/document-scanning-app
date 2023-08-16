const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const unhandled = require("electron-unhandled");

unhandled({
  logger: () => {
    console.error();
  },
  showDialog: true,
});

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  console.log(filePaths);
  if (!canceled) return filePaths[0];
}

const createWindow = () => {
  const { screen } = require("electron");

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on("submit-form", function (event, data) {
    console.log(data);
  });
  ipcMain.handle("dialog:openFile", handleFileOpen);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
