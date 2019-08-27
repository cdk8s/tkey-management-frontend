import { Reducer } from 'redux';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {};
  reducers: {
    setRouterTabs: Reducer<{}>;
    setCurrentPath: Reducer<{}>;
    setSidebarSelectKey: Reducer<{}>;
    setSidebarOpenKey: Reducer<{}>;
    setSidebarCloneOpenKey: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: 'global',

  state: {
    routerTabs: [],
    currentPath: window.location.pathname,
    sidebarSelectKey: [],
    sidebarOpenKey: [],
    sidebarCloneOpenKey: [],
  },

  effects: {},

  reducers: {
    setRouterTabs(state, { payload }) {
      localStorage.setItem('routerTabs', JSON.stringify(payload));
      return {
        ...state,
        routerTabs: payload,
      };
    },
    setCurrentPath(state, { payload }) {
      return {
        ...state,
        currentPath: payload,
      };
    },
    setSidebarSelectKey(state, { payload }) {
      return {
        ...state,
        sidebarSelectKey: payload,
      };
    },
    setSidebarOpenKey(state, { payload }) {
      return {
        ...state,
        sidebarOpenKey: payload,
      };
    },
    setSidebarCloneOpenKey(state, { payload }) {
      return {
        ...state,
        sidebarCloneOpenKey: payload,
      };
    },
  },
};

export default Model;
