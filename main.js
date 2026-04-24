const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');

// Keep window reference so it doesn't get garbage collected
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'V2V — Vendor to Vendor',
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#0e1117',
    show: false, // don't show until ready to avoid flash
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Allow localStorage to persist between sessions
      partition: 'persist:v2v'
    },
    // Frameless feel — keeps native title bar for easy drag/resize
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
  });

  // Load the app
  mainWindow.loadFile('v2v.html');

  // Show once content is loaded (no white flash)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in the real browser, not Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// Custom menu — minimal but useful
function buildMenu() {
  const template = [
    {
      label: 'V2V',
      submenu: [
        { label: 'About V2V', click: () => {
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'V2V',
            message: 'V2V — Vendor to Vendor',
            detail: 'The business tool built by a vendor for vendors.\n\nVersion 1.0',
            icon: path.join(__dirname, 'icon.png'),
          });
        }},
        { type: 'separator' },
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => mainWindow?.reload() },
        { type: 'separator' },
        { role: 'quit', label: 'Quit V2V' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom In',  accelerator: 'CmdOrCtrl+=', click: () => { const z = mainWindow?.webContents.getZoomFactor(); mainWindow?.webContents.setZoomFactor(Math.min(z+0.1, 2)); }},
        { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', click: () => { const z = mainWindow?.webContents.getZoomFactor(); mainWindow?.webContents.setZoomFactor(Math.max(z-0.1, 0.5)); }},
        { label: 'Reset Zoom', accelerator: 'CmdOrCtrl+0', click: () => mainWindow?.webContents.setZoomFactor(1) },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  // Dev tools in dev mode
  if (process.env.NODE_ENV === 'development') {
    template.push({
      label: 'Dev',
      submenu: [{ role: 'toggleDevTools' }]
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  // macOS: re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
