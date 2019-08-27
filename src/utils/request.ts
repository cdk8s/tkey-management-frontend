/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import NProgress from 'nprogress';
import { notification, message } from 'antd';
import './../global.less';

NProgress.configure({
    minimum: 0.35,
    easing: 'ease-in',
    speed: 233,
    trickle: true,
    trickleSpeed: 65,
    showSpinner: false,
});

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
    NProgress.done();
    const { response } = error;
    const responseJson = response.clone().json();
    if (response && response.status && response.status !== 200) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        responseJson.then(res => {
            if (res && res.msg) {
                message.error(res.msg);
            } else {
                notification.error({
                    message: `请求错误 ${status}: ${url}`,
                    description: errorText,
                });
            }
        });
        console.log(`请求错误, 状态码：${status},url地址：${url},${errorText}`);
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }
    return response;
};

// 配置request请求时的默认参数
const request = extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
    NProgress.done();
    if (response.status === 401) {
        let baseUrl = process.env.REQUEST_SPLICING_TKEY_SSO_BASE_URL || '';
        let codeCallbackUrl = process.env.REQUEST_SPLICING_TKEY_SSO_CODE_CALLBACK;
        let pageUrl = window.location.href;
        pageUrl = encodeURIComponent(pageUrl);
        codeCallbackUrl = encodeURIComponent(codeCallbackUrl + pageUrl);
        baseUrl = baseUrl + codeCallbackUrl;
        window.location.href = baseUrl;
    }
    if (response.redirected) {
        window.location.href = response.url;
    }
    return response;
});


// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    NProgress.start();
    let tkeyToken = localStorage.getItem(process.env.LOCAL_STORAGE_TOKEN_KEY || '') || '';
    return (
        {
            url: `${url}`,
            options: {
                ...options,
                headers: { [process.env.REQUEST_HEADER_TOKEN_KEY || '']: tkeyToken },
            },
        }
    );
});

export default request;
