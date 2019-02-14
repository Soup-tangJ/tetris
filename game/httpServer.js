var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/fight', function (req, res) {
    res.sendFile(__dirname + '/real.html');
}).get('/pc', function(req, res){
    res.sendFile(__dirname + '/index.html');
}).get('/h5', function(req, res){
    res.sendFile(__dirname + '/h5.html');
})

app.listen(8080);