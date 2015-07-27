var DB = require('./db').DB;

var User = DB.Model.extend({
	tableName: 'UserAuthentication',
	idAttrivute: 'userId',
});
module.exports = {
	User: User
}