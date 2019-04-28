var express = require('express')
  , https = require('https')
  , path = require('path')
  , fs = require('fs')
  , routes = require('./routes')
  , kiosk = require('./api/v1/kiosk')
  , bodyParser = require('body-parser');

var router = express.Router();
module.exports = router;

var app = express();
app.use(bodyParser.json());

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/api/v1/kiosk', kiosk.list);
app.post('/api/v1/kiosk', kiosk.add);
/*app.delete('/:id', user.del);
app.put('/:id',user.update);*/

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/py.kenchlightyear.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/py.kenchlightyear.com/fullchain.pem')
};

https.createServer(options,app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
