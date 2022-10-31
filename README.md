This library use for Whatsapp functions in node-red. This node implement and depend on [whatsapp-web.js](https://wwebjs.dev/).

## Install
Run the following command in the root directory of your Node-RED
```
npm install node-red-contrib-waservice
```
You will also need whatsapp-web.js to install insinde the node-red-contrib-waservice node_modules
```
npm i whatsapp-web.js
```
or

1. Go to "Manage palette" menu on your node-red
2. Search "waservice" or "Whatsapp Service" on Node-RED Library
3. Click "Install"

## Issue
When test on macos there is a problem mention https://github.com/pedroslopez/whatsapp-web.js/issues/1758, this fix by installing
```
npm install github:ReforwardDev/whatsapp-web.js#patch-1
```
Everytime deploy new nodes, node-red must restart to re init the whatsapp.

## Example
This package can use to authenticate your whatsapp, send and receive the message with node-red. Import the example from this https://raw.githubusercontent.com/imboost/node-red-contrib-waservice/main/examples/whatsapp.json