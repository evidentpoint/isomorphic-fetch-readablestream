const fetch = require("node-fetch");
const fetchStream = require("fetch-readablestream");
const {toWebReadableStream} = require("web-streams-node");

fetchStream.transportFactory = function () {
    return function (url, options) {
        return fetch(url, options).then(res => {
            if (res.body) {
                return Object.assign({}, res, { body: toWebReadableStream(res.body) });
            }
            return res;
        })
    }
}

exports.default = fetchStream;
