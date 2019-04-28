var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://nodejs:G8bYFxjx5d6iB7Y@ds121665.mlab.com:21665/users'
var geolib = require('geolib');

var ok = { "status" : "ok" };
var error = { "status" : "error" };

var findKiosks = function(db, callback) {
	var cursor = db.collection('kiosk').find({"isAvailable": true}).toArray(function(err, doc) {
		try{
			assert.equal(err, null);
		}catch(err){
			//console.log(err);
			callback(error);
		}
		callback(doc);
	});
};

exports.list = function(req, res){
	var latitude = req.query.latitude;
    var longitude =  req.query.longitude;
	if(isNaN(latitude) || isNaN(longitude)){
		res.send([{}]);
	}else{
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
			try{
				assert.equal(null, err);
			}catch(err){
				//console.log(err);
				callback(error);
			}
			var db = client.db('users');
			findKiosks(db, function(kiosks) {
				var doc = [];
				for(var kiosk in kiosks){
					if (kiosks.hasOwnProperty(kiosk)) {
						var distance = geolib.getDistance({"latitude": latitude, "longitude": longitude}, {"latitude": kiosks[kiosk].latitude, "longitude": kiosks[kiosk].longitude});
						if(distance < 1000){
							doc.push(kiosks[kiosk]);
						}
					}
				}
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(doc));
				client.close();
			});
		});
    }
};

var addKiosk = function(req, db, callback) {
    //req.body.id = Number(req.body.id);
    //delete req.body.__proto__;
    db.collection('kiosk').insertOne(req.body, function(err, doc) {
		try{
    		assert.equal(err, null);
        	callback(ok);
		}catch(err){
			//console.log(err);
			callback(error);
		}
    });
};

exports.add = function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		try{
        	assert.equal(null, err);
		}catch(err){
			//console.log(err);
			callback(error);
		}
		var db = client.db('users');
        addKiosk(req, db, function(kiosk) {
			res.setHeader('Content-Type', 'application/json');
            res.send(kiosk);
            client.close();
        });
    });
};
