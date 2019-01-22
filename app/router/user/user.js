const router = require('koa-router')();
const db = require('../../db');
const commonRes = require('../../utils/commonRes');
const jsonwebtoken = require('jsonwebtoken');
const secret = 'ningyuanyuanjwt';
const getOneByUserNameAndPassword = require('../../utils/util').getOneByUserNameAndPassword;

/**
 * 注册
 */ 
router.post('/user/register', async (ctx, next) => {
    
})

/**
 * 登录
 */ 
router.post('/user/login', async(ctx, next) => {
    try {
        let result = await getOneByUserNameAndPassword(ctx.request.body);
        if (!!result) {
            let token = jsonwebtoken.sign({
                data: result,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, secret)
            ctx.cookies.set('_token', token, {httpOnly: false})
            commonRes.success.data = result;
            commonRes.success.message.message = '登录成功！';
            ctx.body = commonRes.success;
        } else {
            ctx.body = commonRes.error_02;
        }
    } catch (error) {
        ctx.body = commonRes.error_01; 
        ctx.throw(500);
    }
})

module.exports = router;