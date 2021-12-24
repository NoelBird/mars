// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron')

window.onload = () => {
  const btnEl = document.getElementById('btn')

  btnEl.addEventListener('click', (evt) => {
    const inputValue = document.getElementById('text-input').value

    // onInputValue 이벤트 송신
    ipcRenderer.send('onInputValue', inputValue)
  })

  // replyInputValue에 대한 응답 수신
  ipcRenderer.on('replyInputValue', (evt, payload) => {
    document.getElementById('text-box').textContent = payload
  })

  // onWebcontentsValue에 대한 이벤트 수신
  ipcRenderer.on('onWebcontentsValue', (evt, payload) => {
    document.getElementById('text-box').textContent = payload
  })
}