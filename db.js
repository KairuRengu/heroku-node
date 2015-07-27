var Bookshelf = require('bookshelf');

var config = {
		host	: 'hopper.wlu.ca',
	user	: 'cram7290',
	password : 'bigtop6',
	database : 'cram7290'
};

var DB = Bookshelf.intialize({
	client: 'mysql',
	connection : config
});

module.exports.DB = DB;