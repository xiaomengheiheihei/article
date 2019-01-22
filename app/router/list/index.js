const router = require('koa-router')();
const db = require('../../db');
const commonRes = require('../../utils/commonRes');
const getArticleList = require('../../utils/util').getArticleList;

/**
 * 文章列表
 */ 
router.get('/article/getList', async(ctx, next) => {
    try {
        let result = await getArticleList();
        commonRes.success.data = result;
        commonRes.success.message.message = `获取数据成功！`;
        ctx.body = commonRes.success;
    } catch (error) {
        ctx.body = commonRes.error_01;
        ctx.throw(500);
    }
})
/**
 * 上传文章
 */ 
router.post('/article/upload', async (ctx, next) => {
    try {
        console.log(ctx)
        console.log(ctx.request.body)
        ctx.body = commonRes.error_01;
    } catch (error) {
        ctx.body = commonRes.error_01;
        ctx.throw(500);
    }
})

module.exports = router;