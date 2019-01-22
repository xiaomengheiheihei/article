/**
 * token验证拦截
 */ 
const jsonwebtoken = require('jsonwebtoken');
const secret = 'ningyuanyuanjwt';

module.exports = verifyToken = (ctx, next) => {
    let token = ctx.get('cookie');
    console.log(111)
    let decoded = jsonwebtoken.verify(token, secret);
    console.log(decoded)
}