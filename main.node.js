const fetch = require("node-fetch");
const fetchStream = require("fetch-readablestream");
const { toWebReadableStream } = require("web-streams-node");

fetchStream.transportFactory = function (url, options) {
    return fetch(url, options).then(res => {
        if (res.body) {
            res.body = toWebReadableStream(res.body);
        }
    });
}

module.exports = fetchStream