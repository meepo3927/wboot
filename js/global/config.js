define([], function () {

    // From Webpack
    let env = '';
    try {
        let o = process.env || {};
        env = o.RUN_ENV;
    } catch(e) {}

    // 运行环境
    let isProduction = (env === 'production');

    // 全局Inject变量
    let global = window.global || {};
    let basePath = global.basePath || '';

    // 用户信息
    let user = {};

    // Ajax请求路径
    if (isProduction) {
        var ajaxUrlBase = basePath;
    } else {
        ajaxUrlBase = basePath + '/mock';
    }

    return {
        env,
        basePath,
        user,
        ajaxUrlBase,
        mock: !isProduction,
        isProduction
    };
});