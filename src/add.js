const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')
const ipc = electron.ipcRenderer


closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow(); // Closing the second popup window
    window.close();
})

// IPC Renderer process from line 14 to 22
const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
  ipc.send('update-notify-value', document.getElementById('notifyVal').value) // Once the "Update" button is clicked, ipc.send() is used to 1st set a name of the message, and then the value of the input.

  // Close this window
  var window = remote.getCurrentWindow();
  window.close();
})