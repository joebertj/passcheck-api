var assert = require('assert');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'user' });

exports.find = function(req, res){
    const query = 'SELECT count FROM users WHERE shaone = ?';
    client.execute(query, [ 'someone' ], function(err, result) {
        assert.ifError(err);
        console.log('Breached %s times', result.rows[0].count);
    });
}
