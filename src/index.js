const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow //Allows to create the browser window
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn') //notifyBtn is in reference to the Notify button in src index.html
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal;

// Desktop notification text
const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}


function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

        // Determines if the user-specified price is less than the actual price of Bitcoin
        if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
            const myNotification = new window.Notification(notification.title, notification)
        }
        // Detecting when a Notification is Clicked
        myNotification.onclick = () => {
            console.log('clicked')
        }

    })
}
getBTC();
setInterval ( getBTC, 30000 ); //30 seconds = 30,000 milliseconds


notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})