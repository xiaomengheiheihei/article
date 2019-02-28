const db = require('../db');
module.exports = {
    /**
     * 根据用户名&&密码查询用户
     */ 
    getOneByUserNameAndPassword: async (options) => {
        let _sql = `SELECT * from user 
        where password="${options.password}" and username="${options.username}"
        limit 1`;
        let result = await db.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    },
    /**
     * 新增用户，插入数据
     */ 
    insertUser: async (userInfos) => {
        let _sql = `insert into user 
        (username, password) 
        values 
        ("${userInfos.username}", "${userInfos.password}")`;
        let result = await db.query(_sql);
    },
    /**
     * 获取文章列表
     */ 
    getArticleList: async (query) => {
        let _sql = `select * from article limit 0, 1000`;
        let result = await db.query(_sql);
        return result;
    },
    /**
     * 上传文章保存
     */ 
    uploadArticle: async (query) => {
        let now = new Date().getTime();
        let _sql = `insert into article
        (keyWord, description, title, createTime, classification, content)
        values
        ("${query.keyword}", "${query.des}", "${query.articleTitle}", 
        "${now}", "${query.type}", "${query.value}")`;
        let result = await db.query(_sql);
        return result;
    },
    /**
     * 删除文章
     */ 
    deleteArticle: async (query) => {
        let _sql = `delete from article
        where articleId = "${query}"`;
        let result = await db.query(_sql);
        return result;
    },
    /**
     * 修改文章
     */ 
    updateArticle: async (query) => {
        let _sql = `update article
        set keyWord = "${query.keyword}", description = "${query.des}", title="${query.articleTitle}",
        classification = "${query.type}", content = "${query.value}"
        where articleId = ${query.id}`;
        let result = await db.query(_sql);
        return result;
    }
}