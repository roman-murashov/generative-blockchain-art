var express = require('express');
var app = express();
var path = require('path');
var loki = require('lokijs');

app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = new loki('dividend.json', {autoload: true});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/currentVideo', function(req, res) {
	res.send(db.getCollection('videos').findOne({})[0]);
});

app.post('/api/currentVideo', function(req, res) {
	var Videos = db.getCollection('videos');
	var videoUrl = req.body.url;
	Videos.removeWhere({});
	Videos.insert({url: videoUrl});
	db.saveDatabase();
	console.log(Videos.data);
	res.send(Videos.get(1));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});