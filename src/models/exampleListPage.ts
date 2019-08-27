import { Effect } from '../../typings';
import { Reducer } from 'redux';

import {
  clientTablePage,
  clientTableCreate,
  clientTableUpdate,
  clientTableDetail,
  clientTableDelete,
  clientUpdateStatus,
} from '@/services/list';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    getTableList: Effect;
    clientTableCreate: Effect;
    clientTableUpdate: Effect;
    clientTableDetail: Effect;
    clientTableDelete: Effect;
    clientUpdateState: Effect;
  };
  reducers: {
    setTableList: Reducer<{}>;
    setDefaultValue: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: 'exampleListPage',

  state: {
    tableList: {},
    defaultValue: undefined,
  },

  effects: {
    * getTableList({ payload }, { call, put }) {
      const response = yield call(clientTablePage, payload);
      yield put({
        type: 'setTableList',
        payload: response,
      });
    },
    * clientTableDetail({ payload }, { call, put }) {
      const response = yield call(clientTableDetail, payload);
      yield put({
        type: 'setDefaultValue',
        payload: response.data,
      });
    },
    * clientTableCreate({ payload }, { call }) {
      return yield call(clientTableCreate, payload);
    },
    * clientTableUpdate({ payload }, { call }) {
      return yield call(clientTableUpdate, payload);
    },
    * clientTableDelete({ payload }, { call }) {
      return yield call(clientTableDelete, payload);
    },
    * clientUpdateState({ payload }, { call, put }) {
      return yield call(clientUpdateStatus, payload);
    },
  },

  reducers: {
    setTableList(state, { payload }) {
      return {
        ...state,
        tableList: payload,
      };
    },
    setDefaultValue(state, { payload }) {
      return {
        ...state,
        defaultValue: payload,
      };
    },
  },
};

export default Model;
