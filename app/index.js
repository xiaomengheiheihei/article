const Koa = require('koa');
const app = new Koa();
const router = require('./router/index');
const tokenError = require('./middlewares/tokenError');
const jwt = require('koa-jwt');
const secret = 'ningyuanyuanjwt';
const koaBody = require('koa-body');

app.use(tokenError);
app.use(jwt(
    {'secret': secret, tokenKey: '_token', cookie: '_token'}
    ).unless({path: [/\/register/, /\/login/],}));
app.use(koaBody({
    multipart: true,
    // formidable: {
    //     maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    // }
}));


router(app);
  
app.listen(9000, () => {
    console.log(`Your server is running on http://localhost:9000`)
});