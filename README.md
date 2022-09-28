This library use for Whatsapp functions in node-red. This node implement and depend on [whatsapp-web.js](https://wwebjs.dev/).

## Install
Run the following command in the root directory of your Node-RED:
```
npm install node-red-contrib-waservice
```
You will also need whatsapp-web.js to install in the root directory of your Node-RED
```
npm i whatsapp-web.js
```
You will also need pupetter to install in the root directory of your Node-RED
```
npm i puppeteer
```
or

1. Go to "Manage palette" menu on your node-red
2. Search "waservice" or "Whatsapp Service" on Node-RED Library
3. Click "Install"

## Usage
This package can use to authenticate your whatsapp and send the message with node-red.

### Authentication
To authenticate you whatsapp account yo need to use inject, whatsapp and image viewer nodes. Provide msg.topic = "connect" inside the inject node, you will need to wait a view seconds until it show the QR code to scan from your whatsapp linked device. 

![Plugin in action](https://github.com/imboost/node-red-contrib-waservice/blob/main/waservice_authentication.png?raw=true)

### Send Text Message
To send text message you need to provide inject and same whatsapp node use for authentication. Provide msg.topic = "send_text" and msg.to = country_code_phone_number example (msg.to = "6019247900") 60 is the country code. Provide your mesage inside the msg.message = "Your whatsapp message".

![Plugin in action](https://github.com/imboost/node-red-contrib-waservice/blob/main/waservice_send_text.png?raw=true)