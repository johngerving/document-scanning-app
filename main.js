const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const unhandled = require("electron-unhandled");

// Electron error handling
unhandled({
  logger: () => {
    console.error();
  },
  showDialog: true,
});

// Open file explorer to allow user to select files
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"], // User selects multiple files
  });
  console.log(filePaths);
  if (!canceled) return filePaths[0]; // If dialog wasn't canceled then return selected path
}

// Create window object
const createWindow = () => {
  const { screen } = require("electron");

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize; // Make window size of screen

  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Load preload.js, giving renderer and main processes access to specific functions
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow(); // Instantiate window

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Listen for submit form from renderer
  ipcMain.on("submit-form", function (event, data) {
    console.log(data);
  });
  // Listen to openFile from renderer, call handleFileOpen, send result back to renderer
  ipcMain.handle("dialog:openFile", handleFileOpen);
});

// Quit app on close unless on Mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
