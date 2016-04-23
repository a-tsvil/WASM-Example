var express = require('express'),
    app = express();

app.use('/src/wasm', function(req, res, next) {
    res.send(readBinary(req.path));
});

app.use('/src', express.static(__dirname + '/src'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/wasm-test.html');
});

app.listen(8080, function() {
    console.log('wasm testing app started at port: 8080');
});

function readBinary(filename) {
    var nodeFS = require("fs"),
        nodePath = require("path"),
        ret = {};

    filename = nodePath.join(__dirname, 'src/wasm', filename);
    ret = nodeFS.readFileSync(filename);

    return new Uint8Array(ret);
}
