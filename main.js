// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require("fs")
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // 웹 페이지 로드 완료
  mainWindow.webContents.on('did-finish-load', (evt) => {
    // onWebcontentsValue 이벤트 송신
    mainWindow.webContents.send('onWebcontentsValue', 'on load...')
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // onInputValue 이벤트 수신
  ipcMain.on('onInputValue', (evt, payload) => {
    fs.writeFile("message.md", payload, 'utf-8', () => {
      console.log('on ipcMain event:: ', payload)

      const computedPayload = payload + '(computed)'

      // replyInputValue 송신 또는 응답
      evt.reply('replyInputValue', computedPayload)
    })
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
