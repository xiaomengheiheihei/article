/**
 * token失效或无token请求错误处理
 */ 

 const commonRes = require('../utils/commonRes');

module.exports = tokenError = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 200;
            ctx.body = commonRes.error_03;
        } else {
            throw err;
        }
    });
}