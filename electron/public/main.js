const { app, BrowserWindow } = require('electron')
const path = require('path');

function createWindow () {
  // ブラウザウィンドウオブジェクトを生成
  const win = new BrowserWindow({
    width: 656,
    height: 496,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
    }
  })

  // htmlファイルを読込
  const indexHtmlPath = path.resolve(__dirname, 'index.html');
  win.loadFile(indexHtmlPath)

  // DevToolsを開く
  //win.webContents.openDevTools()
}

// appの準備が出来たら、ウィンドウを生成する
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
