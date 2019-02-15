var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/fight', function (req, res) {
    res.sendFile(__dirname + '/fight.html');
}).get('/pc', function(req, res){
    res.sendFile(__dirname + '/pc.html');
}).get('/h5', function(req, res){
    res.sendFile(__dirname + '/h5.html');
})
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(8080);