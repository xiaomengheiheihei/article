/**
 * 定义通用返回格式以及错误码
 */ 
module.exports = {
    success: {
        success: 1,
        data: null,
        message: {
            code: 0,
            message: '请求成功！'
        }
    },
    error_01: {         // 通用错误
        success: 0,
        data: {},
        message: {
            code: 000001,
            message: '系统内部错误，请稍后重试！'
        }
    },
    error_02: {         // 登录失败
        success: 0,
        data: {},
        message: {
            code: 000002,
            message: '账号或密码错误，请重试！'
        }
    },
    error_03: {         // token失效
        success: 0,
        data: {},
        message: {
            code: 000003,
            message: 'token校验失败！'
        }
    }
}