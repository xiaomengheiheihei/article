const user = require('./user/user');
const list = require('./list/index');

module.exports = function(app){
    app.use(user.routes()).use(user.allowedMethods());
    app.use(list.routes()).use(list.allowedMethods());
}