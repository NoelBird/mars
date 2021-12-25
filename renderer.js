// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron')



window.onload = () => {
  const divInput = document.getElementById('input')
  divInput.addEventListener('keydown', (evt) => {
    // console.log("\n" + evt.key)
    const inputValue = divInput.textContent + evt.key
    console.log(inputValue)

    // onInputValue 이벤트 송신
    ipcRenderer.send('onInputValue', inputValue)
  })

  // replyInputValue에 대한 응답 수신
  ipcRenderer.on('replyInputValue', (evt, payload) => {
    //document.getElementById('text-box').textContent = payload
    document.getElementById('rendered').innerHTML = marked(payload);
  })

  // onWebcontentsValue에 대한 이벤트 수신
  ipcRenderer.on('onWebcontentsValue', (evt, payload) => {
    document.getElementById('text-box').textContent = payload
  })

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu')
  })
  
  ipcRenderer.on('context-menu-command', (e, command) => {
    // ...
  })
}