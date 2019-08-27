import { parse } from 'qs';
import moment from 'moment';

/**
 * 获取路由参数
 */
export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

/**
 * 日期格式转换
 */
export function formatDate(date: string | number, format: string = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format);
}

/**
 * 替换11 位手机中间 4 位为星号
 */
export function phoneNumberStar(str: string) {
    if (str === undefined) return '';
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}


/**
 * 转换搜索时间为时间戳
 */
export function formatDateTimeStamp(date: string | number, type = 'start') {
    if (date === undefined || date === '') return;
    if (type === 'start') {
        return moment(moment(date).format('YYYY-MM-DD 00:00:00')).valueOf();
    }
    if (type === 'end') {
        return moment(moment(date).format('YYYY-MM-DD 23:59:59')).valueOf();
    }
    return '';
}

/**
 * 删除对象里面的undefined 和 ''
 */
export function deleteNullValue(data: object) {
    for (let i in data) {
        if (data[i] === undefined || data[i] === '') {
            delete data[i];
        }
    }
    return data;
}

/**
 * 判断所有loading是否都为 true
 */
export function mergeLoading(...args: any[]) {
    let loadingStatus = false;
    args.forEach((status: boolean) => {
        if (status) {
            loadingStatus = true;
        }
    });
    return loadingStatus;
}
