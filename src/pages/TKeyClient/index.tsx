import React, { Component } from 'react';
import {
  Card,
  Divider,
  Modal,
  Popconfirm,
  Form,
  Row,
  Col,
  Button,
  message,
  Spin,
  Switch,
  Dropdown,
  Menu,
  Icon,
} from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import cryptoRandomString from 'crypto-random-string';
import { FormComponentProps } from 'antd/lib/form/Form';
import SearchForm from '@/components/HehSearch';
import HehTable from '@/components/HehTable';
import HehForm from '@/components/HehForm';
import HehBreadcrumb from '@/components/HehBreadcrumb';
import { handleDate } from '@/utils/columnsHandle';
import { formatDateTimeStamp, deleteNullValue, mergeLoading } from '@/utils/utils';
import HehReactJson from '@/components/HehReactJson';

import '../../base.less';


const pageApi = 'exampleListPage/getTableList';
const createApi = 'exampleListPage/clientTableCreate';
const updateApi = 'exampleListPage/clientTableUpdate';
const detailApi = 'exampleListPage/clientTableDetail';
const deleteApi = 'exampleListPage/clientTableDelete';
const updateStateApi = 'exampleListPage/clientUpdateState';
const setDefaultValue = 'exampleListPage/setDefaultValue';


class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newModalVisible: false,
      isCopyOperation: false,
      selectedRowKeys: [],
      reactJsonVisible: false,
      reactJson: undefined,
    };
  }

  //=====================================生命周期 start=====================================
  componentDidMount() {
    this.getPageList();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <>
        <HehReactJson
          visible={this.state.reactJsonVisible}
          json={this.state.reactJson}
          onCancel={() => this.setState({ reactJsonVisible: false })}
        />
        <HehBreadcrumb
          data={[{ name: '首页', link: '/' }]}
        />
        <Card className='base_card' style={{ minHeight: 500 }}>
          {this.renderNewModal()}
          {this.renderSearchForm()}
          {this.renderTable()}
        </Card>
      </>
    );
  }

  //=====================================生命周期  end=====================================


  //=====================================函数式组件 start==================================
  renderTable = () => {
    const columns = [
      { title: '客户端名称', dataIndex: 'clientName' },
      { title: '客户端 Id', dataIndex: 'clientId' },
      { title: '客户端地址', dataIndex: 'clientUrl' },
      { title: '客户端描述', dataIndex: 'clientDesc' },
      { title: 'logo 地址', dataIndex: 'logoUrl' },
      { title: '排序', dataIndex: 'ranking' },
      { title: '备注', dataIndex: 'remark' },
      {
        title: '状态', dataIndex: 'stateEnum', render: (text: string | number, record: any) => (
          <Switch
            onChange={() => this.updateState([record.id], text === 1 ? 2 : 1)}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            checked={text === 1}
          />
        ),
      },
      { title: '创建时间', dataIndex: 'createDate', render: (text: number) => handleDate(text) },
      { title: '更新时间', dataIndex: 'updateDate', render: (text: number) => handleDate(text) },
      {
        title: '操作', width: 200, dataIndex: 'operation', render: (text: any, record: any) => (
          <span>
            <a onClick={() => this.getDefaultValue(record)}><Icon type='edit'/>编辑</a>
            <Divider type='vertical'/>
            <a
              onClick={() => {
                this.setState({ isCopyOperation: true }, () => {
                  this.getDefaultValue(record);
                });
              }}
            >
              <Icon type="copy"/>复制
            </a>
            <Divider type='vertical'/>
            <Popconfirm
              title="确认删除该条数据?"
              okText="确定"
              okType='danger'
              onConfirm={() => this.delete([record.id])}
              cancelText="取消"
            >
              <a><Icon type="delete"/>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const { loading, tableList, deleteLoading, updateStateLoading } = this.props;
    return (
      <>
        <Row style={{ marginBottom: 5 }}>
          <Col span={24}>
            <Button
              onClick={() => this.setState({ newModalVisible: true })}
              style={{ width: 100 }}
              type='primary'
            >
              <Icon type='plus'/>新建
            </Button>
            <Dropdown
              disabled={this.state.selectedRowKeys.length === 0}
              overlay={(
                <Menu>
                  <Menu.Item>
                    <Popconfirm
                      title="确定执行批量删除操作?"
                      onConfirm={() => this.delete(this.state.selectedRowKeys)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button>
                        <Icon type='delete'/> 批量删除
                      </Button>
                    </Popconfirm>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      onClick={() => this.updateState(this.state.selectedRowKeys, 1)}
                    >
                      <Icon type="check-circle"/> 批量启用
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      onClick={() => this.updateState(this.state.selectedRowKeys, 2)}
                    >
                      <Icon type="close-circle"/> 批量禁用
                    </Button>
                  </Menu.Item>
                </Menu>
              )}
              placement="bottomCenter"
            >
              <Button
                style={{ marginLeft: 10 }}
              >
                批量操作 <Icon type='down'/>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <HehTable
          columns={columns}
          adaptation={{ scroll: { x: 2350 }, fixed: { clientName: 'left', operation: 'right' } }}
          getSelectedRowKeys={this.getSelectedRowKeys}
          selectedRowKeys={this.state.selectedRowKeys}
          data={tableList && tableList.data || []}
          tableOptions={{
            loading: mergeLoading(loading, deleteLoading, updateStateLoading),
          }}
          pageChange={(current, size) => {
            this.getPageList(current, size);
          }}
        />
      </>
    );
  };

  renderSearchForm = () => {
    const searchItems = [
      {
        type: 'input',
        label: '客户端名称',
        id: 'clientName',
        attribute: {
          placeholder: '请输入客户端名称',
        },
      },
      {
        type: 'input',
        label: '客户端 id',
        id: 'clientId',
        attribute: {
          placeholder: '请输入客户端 id',
        },
      },
      {
        type: 'select',
        label: '启用状态',
        id: 'stateEnum',
        options: [{ value: 1, label: '启用' }, { value: 2, label: '禁用' }],
        attribute: {
          allowClear: true,
          placeholder: '请选择启用状态',
        },
        optionAttribute: {
          key: 'value',
        },
      },
      {
        type: 'rangePicker',
        label: '范围时间',
        id: 'rangeDate',
        attribute: {
          allowClear: true,
        },
      },
    ];
    return (
      <SearchForm
        searchItems={searchItems}
        getValue={this.getSearchValue}
      />
    );
  };

  renderNewModal = () => {
    const { defaultValue, form, createBtnLoading, updateBtnLoading } = this.props;
    const { isCopyOperation } = this.state;
    const newFormItem = [
      {
        type: 'input',
        id: 'clientName',
        label: '客户端名称',
        defaultValue: _.get(defaultValue, 'clientName'),
      },
      {
        type: 'input',
        id: 'clientId',
        label: '客户端 Id',
        defaultValue: _.get(defaultValue, 'clientId'),
        attribute: {
          maxLength: 20,
        },
        formDecoratorOptions: {
          rules: [
            { required: true, message: '客户端 Id为必填项' },
            { min: 5, message: '客户端 Id为5-20位' },
            { max: 20, message: '客户端 Id为5-20位' },
            { pattern: '^[0-9a-zA-Z_]{1,}$', message: '客户端 Id 必须为数字，字母，下划线组成' },
          ],
        },
      },
      {
        type: 'input',
        id: 'clientSecret',
        label: '客户端秘钥',
        defaultValue: _.get(defaultValue, 'clientSecret'),
        operation: <Button onClick={this.randomToClientSecret} size='small' type='primary'>随机生成</Button>,
        attribute: {
          maxLength: 32,
        },
        formDecoratorOptions: {
          rules: [
            { required: true, message: '客户端秘钥为必填项' },
            { min: 32, message: '客户端秘钥必须为32位' },
          ],
        },
      },
      {
        type: 'input',
        id: 'clientUrl',
        label: '客户端地址',
        defaultValue: _.get(defaultValue, 'clientUrl'),
        attribute: { placeholder: '可以输入正则表达式，限制回调地址' },
        formDecoratorOptions: {
          rules: [
            { required: true, message: '客户端地址为必填项' },
          ],
        },
      },
      { type: 'input', id: 'clientDesc', label: '客户端描述', defaultValue: _.get(defaultValue, 'clientDesc') },
      {
        type: 'input',
        id: 'logoUrl',
        label: 'logo 地址',
        defaultValue: _.get(defaultValue, 'logoUrl'),
        formDecoratorOptions: {
          rules: [
            { required: true, message: 'logo 地址为必填项' },
            { type: 'url', message: 'logo 地址必须为http或者https开头' },
          ],
        },
      },
      {
        type: 'inputNumber',
        id: 'ranking',
        label: '排序',
        defaultValue: _.get(defaultValue, 'ranking'),
        formDecoratorOptions: {
          rules: [
            { required: true, message: '排序为必填项' },
            {
              validator: (rule: any, value: any, callback: any) => {
                if (value < 1 || value > 100) {
                  callback('值为1-100正整数！');
                }
                callback();
              },
            },
          ],
        },
      },
      { type: 'input', id: 'remark', label: '备注', defaultValue: _.get(defaultValue, 'remark') },
      {
        type: 'radio',
        id: 'stateEnum',
        label: '启用状态',
        options: [{ label: '启用', value: 1 }, { label: '禁用', value: 2 }],
        defaultValue: _.get(defaultValue, 'stateEnum'),
      },
    ];

    return (
      <Modal
        afterClose={() => {
          this.setState({
            isCopyOperation: false,
          });
          this.props.dispatch({
            type: setDefaultValue,
            payload: undefined,
          });
        }}
        destroyOnClose={true}
        title={defaultValue && isCopyOperation ? '复制' : defaultValue && !isCopyOperation ? '编辑' : '新建'}
        visible={this.state.newModalVisible}
        okButtonProps={{ loading: mergeLoading(createBtnLoading, updateBtnLoading) }}
        onOk={this.getFormValue}
        centered={true}
        width={1024}
        onCancel={() => this.setState({ newModalVisible: false })}
      >
        <Spin spinning={this.props.detailLoading || false}>
          <HehForm
            rowCols={2}
            form={form}
            formItems={newFormItem}
          />
        </Spin>
      </Modal>
    );
  };
  //=====================================函数式组件 end====================================

  //=====================================组件工具方法 start==================================
  randomToClientSecret = () => {
    this.props.form.setFieldsValue({
      clientSecret: cryptoRandomString({ length: 32 }),
    });
  };

  getSearchValue = (values: any) => {
    if (values.rangeDate && values.rangeDate.length === 2) {
      values.startDate = formatDateTimeStamp(values.rangeDate[0], 'start');
      values.endDate = formatDateTimeStamp(values.rangeDate[1], 'end');
      delete values.rangeDate;
    }
    values = deleteNullValue(values);
    this.getPageList(1, 10, values);
  };

  getSelectedRowKeys = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  };
  //=====================================组件工具方法 end====================================

  //=====================================带请求方法 start=====================================
  getPageList = (current = 1, size = 10, searchValue = {}) => {
    this.props.dispatch({
      type: pageApi,
      payload: {
        pageNum: current,
        pageSize: size,
        ...searchValue,
      },
    });
  };

  create = (values: object) => {
    this.props.dispatch({
      type: createApi,
      payload: values,
    })
      .then((response: any) => {
        if (response && response.isSuccess) {
          message.success(response.msg);
          this.setState({ newModalVisible: false });
          this.getPageList();
        }
      });
  };

  update = (values: object) => {
    this.props.dispatch({
      type: updateApi,
      payload: values,
    })
      .then((response: any) => {
        if (response && response.isSuccess) {
          message.success(response.msg);
          this.setState({ newModalVisible: false });
          this.getPageList();
        }
      });
  };

  getFormValue = () => {
    this.props.form.validateFields((err: any, values: any) => {
      if (err) return;
      const { defaultValue } = this.props;
      if (defaultValue && !this.state.isCopyOperation) {
        this.update({ ...values, id: defaultValue.id });
      } else {
        this.create(values);
      }
    });
  };


  getDefaultValue = (record: any) => {
    this.props.dispatch({
      type: detailApi,
      payload: { id: record.id },
    });
    this.setState({ newModalVisible: true });
  };

  delete = (ids: any) => {
    this.props.dispatch({
      type: deleteApi,
      payload: { idList: ids },
    }).then((res: any) => {
      if (res && res.isSuccess) {
        message.success(res.msg);
        this.setState({ selectedRowKeys: [] });
        this.getPageList();
      }
    });
  };

  updateState = (ids: any, stateEnum: string | number) => {
    this.props.dispatch({
      type: updateStateApi,
      payload: {
        idList: ids,
        stateEnum,
      },
    }).then((res: any) => {
      if (res && res.isSuccess) {
        message.success(res.msg);
        this.setState({ selectedRowKeys: [] });
        this.getPageList();
      }
    });
  };
  //=====================================带请求方法 end=====================================
}

export default connect(({ exampleListPage, loading }: any) => ({
  tableList: exampleListPage.tableList,
  defaultValue: exampleListPage.defaultValue,
  loading: loading.effects[pageApi],
  createBtnLoading: loading.effects[createApi],
  updateBtnLoading: loading.effects[updateApi],
  detailLoading: loading.effects[detailApi],
  deleteLoading: loading.effects[deleteApi],
  updateStateLoading: loading.effects[updateStateApi],
}))(Form.create<FormComponentProps>()(Index));


