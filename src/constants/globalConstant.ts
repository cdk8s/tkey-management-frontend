const prefix = 'process.env.';

exports.constant = {
    devConstant: {
        [`${prefix}SYSTEM_TITLE_OPEN`]: '本地 管理系统',
        [`${prefix}SYSTEM_TITLE_CLOSE`]: '本地',
        [`${prefix}LOCAL_STORAGE_TOKEN_KEY`]: 'tkey-token',
        [`${prefix}REQUEST_HEADER_TOKEN_KEY`]: 'x-token',
        [`${prefix}API_SERVER`]: '/sso-client-management',
        [`${prefix}LOGOUT_URL`]: 'http://sso.cdk8s.com/sso-client-management/logout?redirect_uri=http://www.YouMeek.com',
        [`${prefix}REQUEST_SPLICING_TKEY_SSO_BASE_URL`]: 'http://sso.cdk8s.com:9091/sso/oauth/authorize?response_type=code&client_id=client_management&redirect_uri=',
        [`${prefix}REQUEST_SPLICING_TKEY_SSO_CODE_CALLBACK`]: 'http://localhost:8000/codeCallback?redirect_uri=',
    },
    testConstant: {
        [`${prefix}SYSTEM_TITLE_OPEN`]: 'TKey SSO Client 管理系统',
        [`${prefix}SYSTEM_TITLE_CLOSE`]: 'TKey',
        [`${prefix}LOCAL_STORAGE_TOKEN_KEY`]: 'tkey-token',
        [`${prefix}REQUEST_HEADER_TOKEN_KEY`]: 'x-token',
        [`${prefix}API_SERVER`]: 'http://sso.cdk8s.com/sso-client-management',
        [`${prefix}LOGOUT_URL`]: 'http://sso.cdk8s.com/sso-client-management/logout?redirect_uri=http://www.YouMeek.com',
        [`${prefix}REQUEST_SPLICING_TKEY_SSO_BASE_URL`]: 'http://sso.cdk8s.com/sso/oauth/authorize?response_type=code&client_id=client_management&redirect_uri=',
        [`${prefix}REQUEST_SPLICING_TKEY_SSO_CODE_CALLBACK`]: 'http://sso.cdk8s.com/tkey-sso-client-management-frontend/codeCallback?redirect_uri=',
    },
};
