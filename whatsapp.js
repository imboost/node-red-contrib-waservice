const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = function (RED) {
    function whatsapp(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var node_id = node.id;
        node_id = node_id.replace(/\./g, "_");

        const client = new Client({
            restartOnAuthFail: true,
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    // '--disable-setuid-sandbox',
                    // '--disable-dev-shm-usage',
                    // '--disable-accelerated-2d-canvas',
                    // '--no-first-run',
                    // '--no-zygote',
                    // '--single-process', // <- this one doesn't works in Windows
                    // '--disable-gpu'
                ],
            },

            // authStrategy: new LocalAuth({ clientId: node.id })
            authStrategy: new LocalAuth({ clientId: node_id })
        });

        client.initialize();

        client.on('loading_screen', (percent, message) => {
            var msg = {
                "status": "loading",
                "payload": message,
                "percent": percent
            }

            node.send([msg, null]);
        });

        client.on('qr', qr => {
            qrcode.toDataURL(qr, function (err, url) {
                var msg = {
                    "status": "Success",
                    "payload": url
                }

                node.send([msg, null]);

                if (err) {
                    var msg = {
                        "status": "Error",
                        "payload": err
                    }

                    node.send([msg, null]);
                }
            });
        });

        client.on('authenticated', () => {
            var msg = {
                "status": "authenticated",
                "payload": "Authenticated"
            }

            node.send([null, msg]);
        });

        client.on('auth_failure', msg => {
            var msg = {
                "status": "auth_fail",
                "payload": msg
            }

            node.send([null, msg]);
        });

        client.on('ready', () => {
            var msg = {
                "status": "ready",
                "payload": "Whatsapp ready!"
            }

            node.send([null, msg]);
        });

        client.on('message', async message => {
            var from = message.from;
            from = from.replace(/\@c.us/g, '');

            if (message.hasMedia) {
                const media = await message.downloadMedia();

                var msg = {
                    "status": "incoming",
                    "from": from,
                    "payload": message,
                    "media": media
                }
            } else {
                var msg = {
                    "status": "incoming",
                    "from": from,
                    "payload": message
                }
            }

            node.send([null, msg]);
        });

        node.on('input', async function (msg) {
            if (msg.topic === "get_chats") {
                const response = await client.getChats();

                msg.status = "get_chats";
                msg.payload = response;

                node.send([null, msg]);
            }

            if (msg.topic === "get_chat_byid") {
                const response = await client.getChatById(msg.id);

                msg.status = "get_chat_byid";
                msg.payload = response;

                node.send([null, msg]);
            }

            if (msg.topic === "fetch_messages") {
                const response = await client.getChatById(msg.id);
                var messages = await response.fetchMessages({ limit: 99999 });

                msg.status = "fetch_messages";
                msg.payload = messages;

                node.send([null, msg]);
            }

            if (msg.topic === "get_contacts") {
                const response = await client.getContacts();

                msg.status = "get_contacts";
                msg.payload = response;

                node.send([null, msg]);
            }

            if (msg.topic === "send_text") {
                var number = msg.to;
                var message = msg.message;

                client.sendMessage(number + "@c.us", message, { linkPreview: true }).then(response => {
                    msg.status = "send_text";
                    msg.payload = response;

                    node.send([null, msg]);
                }).catch(err => {
                    msg.status = "error_send_text";
                    msg.payload = err;

                    node.send([null, msg]);
                });
            }

            if (msg.topic === "send_media_base64") {
                var number = msg.to;
                var message = msg.message;
                const media = new MessageMedia('image/png', msg.message);

                if (msg.caption === undefined) {
                    client.sendMessage(number + "@c.us", media).then(response => {
                        msg.status = "send_media_base64";
                        msg.payload = response;

                        node.send([null, msg]);
                    }).catch(err => {
                        msg.status = "error_send_media_base64";
                        msg.payload = err;

                        node.send([null, msg]);
                    });
                } else {
                    client.sendMessage(number + "@c.us", media, { "caption": msg.caption }).then(response => {
                        msg.status = "send_media_base64";
                        msg.payload = response;

                        node.send([null, msg]);
                    }).catch(err => {
                        msg.status = "error_send_media_base64";
                        msg.payload = err;

                        node.send([null, msg]);
                    });
                }
            }

            if (msg.topic === "send_media_url") {
                var number = msg.to;
                var message = msg.message;
                const media = await MessageMedia.fromUrl(msg.message);

                if (msg.caption === undefined) {
                    client.sendMessage(number + "@c.us", media).then(response => {
                        msg.status = "send_media_url";
                        msg.payload = response;

                        node.send([null, msg]);
                    }).catch(err => {
                        msg.status = "error_send_media_url";
                        msg.payload = err;

                        node.send([null, msg]);
                    });
                } else {
                    client.sendMessage(number + "@c.us", media, { "caption": msg.caption }).then(response => {
                        msg.status = "send_media_url";
                        msg.payload = response;

                        node.send([null, msg]);
                    }).catch(err => {
                        msg.status = "error_send_media_url";
                        msg.payload = err;

                        node.send([null, msg]);
                    });
                }
            }
        });
    }

    RED.nodes.registerType("whatsapp", whatsapp);
}