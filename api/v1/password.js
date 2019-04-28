var assert = require('assert');
var sprintf = require('sprintf-js').sprintf;
const cassandra = require('cassandra-driver');
var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'user', authProvider: authProvider });

exports.find = function(req, res){
    const query = 'SELECT count FROM password WHERE shaone = ?';
    var shaone = req.query.shaone;	
    client.execute(query, [ shaone ], function(err, result) {
        assert.ifError(err);
	if(result.rows.length == 1) {
            res.end(sprintf('{ "count" : %s}', result.rows[0].count));
	}else{
            res.end(sprintf('{ "count" : 0}'));
	}
    });
}
