const apiServer = process.env.API_SERVER;
const api = {
  // 列表获取table list
  clientTablePage: `${apiServer}/api/client/page`,
  // 列表新增
  clientTableCreate: `${apiServer}/api/client/create`,
  // 列表修改
  clientTableUpdate: `${apiServer}/api/client/update`,
  // 列表删除
  clientTableDelete: `${apiServer}/api/client/batchDelete`,
  // 列表详情
  clientTableDetail: `${apiServer}/api/client/detail`,
  // 列表详情
  clientUpdateStatus: `${apiServer}/api/client/batchUpdateState`,

  // 前端接受 code 请求后端换取 token 接口
  codeToToken: `${apiServer}/codeCallback`,
};
export default api;
