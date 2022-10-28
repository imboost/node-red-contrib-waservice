This library use for Whatsapp functions in node-red. This node implement and depend on [whatsapp-web.js](https://wwebjs.dev/).

## Install
Run the following command in the root directory of your Node-RED:
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

## Example
This package can use to authenticate your whatsapp, send and receive the message with node-red.
```
[
    {
        "id": "a16c714bbdecade9",
        "type": "tab",
        "label": "whatsapp server",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "9ac02caccdac8c5a",
        "type": "inject",
        "z": "a16c714bbdecade9",
        "name": "",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "connect",
        "payloadType": "str",
        "x": 140,
        "y": 160,
        "wires": [
            [
                "8a28b438b729fd41"
            ]
        ]
    },
    {
        "id": "4e1abf41f5c39f03",
        "type": "inject",
        "z": "a16c714bbdecade9",
        "name": "",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "to",
                "v": "62881023825462",
                "vt": "str"
            },
            {
                "p": "message",
                "v": "This is from node-red",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "send_text",
        "payloadType": "str",
        "x": 140,
        "y": 220,
        "wires": [
            [
                "8a28b438b729fd41"
            ]
        ]
    },
    {
        "id": "8a28b438b729fd41",
        "type": "whatsapp",
        "z": "a16c714bbdecade9",
        "name": "",
        "x": 300,
        "y": 160,
        "wires": [
            [
                "d85b9803c4fe9141",
                "59265973bb8bc5b0"
            ],
            [
                "6a1c545af4a93095"
            ]
        ]
    },
    {
        "id": "d85b9803c4fe9141",
        "type": "image",
        "z": "a16c714bbdecade9",
        "name": "",
        "width": "250",
        "data": "payload",
        "dataType": "msg",
        "thumbnail": false,
        "active": true,
        "pass": false,
        "outputs": 0,
        "x": 680,
        "y": 120,
        "wires": []
    },
    {
        "id": "d71527ca6897d3a0",
        "type": "inject",
        "z": "a16c714bbdecade9",
        "name": "",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "to",
                "v": "6282218363112",
                "vt": "str"
            },
            {
                "p": "message",
                "v": "This is from node-red",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "send_text",
        "x": 140,
        "y": 280,
        "wires": [
            [
                "8a28b438b729fd41"
            ]
        ]
    },
    {
        "id": "59265973bb8bc5b0",
        "type": "debug",
        "z": "a16c714bbdecade9",
        "name": "debug 4",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 480,
        "y": 120,
        "wires": []
    },
    {
        "id": "6a1c545af4a93095",
        "type": "debug",
        "z": "a16c714bbdecade9",
        "name": "debug 5",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 480,
        "y": 180,
        "wires": []
    }
]
```