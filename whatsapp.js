const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = function (RED) {
    // If doesn't work put client init here 

    function whatsapp(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        const client = new Client({
            restartOnAuthFail: true,
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox'
                    // '--disable-setuid-sandbox',
                    // '--disable-dev-shm-usage',
                    // '--disable-accelerated-2d-canvas',
                    // '--no-first-run',
                    // '--no-zygote',
                    // '--single-process', // <- this one doesn't works in Windows
                    // '--disable-gpu'
                ],
            },
            authStrategy: new LocalAuth({ clientId: node.id })
        });

        client.on('ready', () => {
            node.send([null, 'Whatsapp Ready!']);
        });

        client.initialize();

        node.on('input', async function (msg) {
            if (msg.topic === "connect") {
                client.on('qr', qr => {
                    qrcode.toDataURL(qr, function (err, url) {
                        msg.payload = url;

                        node.send([msg, null]);

                        if (err) {
                            node.send([err, null]);
                        }
                    });
                });
            }

            if (msg.topic === "send_text") {
                var number = msg.to;
                var message = msg.message;

                client.sendMessage(number + "@c.us", message, { linkPreview: true }).then(response => {
                    msg.payload = response;

                    node.send([null, msg]);
                }).catch(err => {
                    msg.payload = err;

                    node.send([null, msg]);
                });
            }

            if (msg.topic === "send_media_url") {
                var number = msg.to;
                var message = msg.message;
                const media = await MessageMedia.fromUrl(msg.message);

                client.sendMessage(number + "@c.us", media).then(response => {
                    msg.payload = response;

                    node.send([null, msg]);
                }).catch(err => {
                    msg.payload = err;

                    node.send([null, msg]);
                });
            }
        });
    }

    RED.nodes.registerType("whatsapp", whatsapp);
}