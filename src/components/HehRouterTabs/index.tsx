import React, { Component } from 'react';
import { Badge, Button, Icon, Tag } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import classnames from 'classnames';
import siderMenu from '@/constants/siderMenu';
import './index.less';

interface IProps {
  routerTabs: Array<IMarkTag>,
  currentPath: string
  dispatch: any
}

interface IMarkTag {
  name: string,
  path: string
}

interface IMenuItem {
  path: string
  icon: string
  name: string
  children?: Array<any>
}

interface Istate {
  dropDown: boolean
}

class RouterTabs extends Component<IProps, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      dropDown: false,
    };
  }

  recursion = (arr: Array<IMenuItem>, pathname: string, parentKey?: string) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.path === pathname) {
        this.props.dispatch({
          type: 'global/setSidebarSelectKey',
          payload: [item.path],
        });
        this.props.dispatch({
          type: 'global/setSidebarOpenKey',
          payload: [parentKey] || [],
        });
        break;
      }
      if (item.children) {
        this.recursion(item.children, pathname, item.path);
      }
    }
  };

  linkTo = (path: string) => {
    router.push(path);
    this.props.dispatch({
      type: 'global/setCurrentPath',
      payload: path,
    });
    this.recursion(siderMenu, path);
  };

  renderBookmark = () => {
    const { currentPath } = this.props;
    const { dropDown } = this.state;
    const { routerTabs } = this.props;
    return (
      routerTabs && routerTabs.map((item: IMarkTag) => (
        <Tag
          className={classnames(dropDown ? 'tag-show' : 'tag-hide')}
          color="#2d8cf0"
          style={{ marginLeft: 6, cursor: 'pointer' }}
          onClick={() => this.linkTo(item.path)}
          key={item.path}
        >
          {item.name}
          <Badge
            className='tag-badge'
            status={currentPath === item.path ? 'success' : 'default'}
          />
        </Tag>
      ))
    );
  };

  clearAllBookmark = () => {
    this.props.dispatch({
      type: 'global/setRouterTabs',
      payload: [],
    });
  };

  render() {
    const { dropDown } = this.state;
    const { routerTabs } = this.props;
    return (
      <div className={classnames('tabs-wrapper', !dropDown ? 'h0' : 'h40')}>
        <div
          className='drop-down'
          onClick={() => this.setState({ dropDown: !this.state.dropDown })}
        >
          < Icon
            type={!dropDown ? 'down' : 'up'}
          />
        </div>
        <div style={{ position: 'relative' }} className='left-tag-wrapper'>
          {this.renderBookmark()}
          {routerTabs.length === 0 ? <h4 style={{ marginLeft: 20, color: '#666' }}>暂无固定标签页，请从左侧菜单栏添加</h4> : ''}
          <div style={{ position: 'absolute', right: 20, top: 0 }}>
            <Button onClick={this.clearAllBookmark} type='primary' size='small'>清空</Button>
          </div>
        </div>
      </div>
    );
  }
};


export default connect(({ global }: any) => ({
  routerTabs: global.routerTabs,
  currentPath: global.currentPath,
}))(RouterTabs);
