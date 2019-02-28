const router = require('koa-router')();
const db = require('../../db');
const commonRes = require('../../utils/commonRes');
const getArticleList = require('../../utils/util').getArticleList;
const uploadArticle = require('../../utils/util').uploadArticle;
const deleteArticle = require('../../utils/util').deleteArticle;
const updateArticle = require('../../utils/util').updateArticle;

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
router.post('/article/add', async (ctx, next) => {
    try {
        let res = await uploadArticle(ctx.request.body)
        ctx.body = commonRes.success;
    } catch (error) {
        ctx.body = commonRes.error_01;
        ctx.throw(500);
    }
})

/**
 * 删除文章
 */ 
router.delete('/article/delete', async (ctx, next) => {
    try {
        if (ctx.request.url.indexOf('id') > -1) {
            let id = ctx.request.url.split('id=')[1];
            let res = await deleteArticle(id);
            commonRes.success.message.message = '删除成功！';
            ctx.body = commonRes.success;
        } else {
            commonRes.error_01.message = {
                code: 000004,
                message: '参数错误！'
            }
            ctx.body = commonRes.error_01;
        }
        ctx.body = commonRes.success;
    } catch (error) {
        ctx.body = commonRes.error_01;
        ctx.throw(500);
    }
})

/**
 * 修改文章
 */ 
router.put('/article/update', async (ctx, next) => {
    try {
        let res = await updateArticle(ctx.request.body)
        if (!!res) {
            ctx.body = commonRes.success;
        }
    } catch (error) {
        ctx.body = commonRes.error_01;
        ctx.throw(500);
    }
})

module.exports = router;