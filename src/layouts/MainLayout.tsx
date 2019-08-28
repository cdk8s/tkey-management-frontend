import React, { Component } from 'react';
import { Icon, Layout, Menu, Avatar, Dropdown, Drawer, Select, BackTop, ConfigProvider } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import router from 'umi/router';
import classname from 'classnames';
import zhCN from 'antd/es/locale/zh_CN';
import Scrollbars from 'react-custom-scrollbars';
import Media from 'react-media';
import theme from '@/constants/theme';
import siderMenu from '@/constants/siderMenu';
import HehRouterTabs from '@/components/HehRouterTabs';
import './mainLayout.less';

const { Header, Footer, Sider, Content } = Layout;

interface IMenuItem {
  path: string
  icon: string
  name: string
  children?: Array<any>
}

interface IChildrenItem {
  name: string
  path: string
  icon: string
  children?: Array<any>
}

interface IProps {
  location: {
    pathname: string
  }
  isMobile?: boolean,
  global: {
    routerTabs: [],
    sidebarSelectKey: [],
    sidebarOpenKey: [],
    sidebarCloneOpenKey: [],
  }
  dispatch: any
}

const siderTheme = theme.siderTheme.trim();
const siderBackground = siderTheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 21, 41)';
const siderHeaderBackground = siderTheme === 'light' ? '#1890ff' : '#3A4D5B';
const headerBackground = siderTheme === 'light' ? '#1E90FF' : 'rgb(0, 21, 41)';
const headerFontColor = siderTheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)';

function initSelectSearch() {
  const arr: any[] = [];
  siderMenu.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((childrenItem: any) => {
        arr.push(childrenItem);
      });
    } else {
      arr.push(item);
    }
  });
  return arr;
}

const selectSearchItem = initSelectSearch();

class MainLayout extends Component<IProps> {
  state = {
    collapsed: false,
    openKey: [],
    cloneOpenKey: [],
    selectKey: [],
  };

  menu = (
    <Menu>
      <Menu.Item>
        <a className='tac'>
          个人信息
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={() => {
            window.location.href = 'http://sso.cdk8s.com/sso-client-management/logout?redirect_uri=http://www.YouMeek.com';
          }}
          className='tac'
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  componentDidMount(): void {
    this.initMenuSelect();
    this.initRouterTabs();
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    if (nextProps.isMobile) {
      this.setState({ collapsed: false });
    }
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
        this.props.dispatch({
          type: 'global/setSidebarCloneOpenKey',
          payload: [parentKey] || [],
        });
        break;
      }
      if (item.children) {
        this.recursion(item.children, pathname, item.path);
      }
    }
  };

  initRouterTabs = () => {
    let initRouterTabs = localStorage.getItem('routerTabs');
    if (initRouterTabs === null) return;
    initRouterTabs = JSON.parse(initRouterTabs);
    this.props.dispatch({
      type: 'global/setRouterTabs',
      payload: initRouterTabs,
    });
  };

  initMenuSelect = () => {
    const pathname = this.props.location.pathname;
    this.recursion(siderMenu, pathname);
  };

  onCollapse = (collapsed: boolean) => {
    if (collapsed) {
      this.props.dispatch({
        type: 'global/setSidebarOpenKey',
        payload: [],
      });
      this.setState({
        collapsed,
      });
    } else {
      this.props.dispatch({
        type: 'global/setSidebarOpenKey',
        payload: this.props.global.sidebarCloneOpenKey,
      });
      this.setState({
        collapsed,
      });
    }
  };

  addRouterTabs = (e: React.SyntheticEvent, name: string, path: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { routerTabs } = this.props.global;
    let newRouterTabs = _.cloneDeep(routerTabs);
    // @ts-ignore
    newRouterTabs.push({ name, path });
    this.props.dispatch({
      type: 'global/setRouterTabs',
      payload: newRouterTabs,
    });
  };

  reduceRouterTabs = (e: React.SyntheticEvent, path: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { routerTabs } = this.props.global;
    let newRouterTabs = _.cloneDeep(routerTabs);
    // @ts-ignore
    newRouterTabs = _.filter(newRouterTabs, (n: any) => {
      return n.path !== path;
    });
    this.props.dispatch({
      type: 'global/setRouterTabs',
      payload: newRouterTabs,
    });
  };

  renderMenuItem = (item: IMenuItem) => {
    return (
      <Menu.Item key={item.path} className='icon-pushpin-parent'>
        <Icon type={item.icon}/>
        <span>{item.name}</span>
        {
          this.isIncludes(item.path) ?
            <Icon
              className='icon-pushpin'
              type="pushpin"
              rotate={-45}
              onClick={(e) => this.reduceRouterTabs(e, item.path)}
            />
            :
            <Icon
              className='icon-pushpin'
              type="pushpin"
              onClick={(e) => this.addRouterTabs(e, item.name, item.path)}
            />
        }
      </Menu.Item>
    );
  };

  renderSubMenuItem = (item: IChildrenItem) => {
    return (
      <Menu.SubMenu
        key={item.path}
        title={
          <span>
            <Icon type={item.icon}/>
            <span>{item.name}</span>
          </span>
        }
      >
        {
          item.children && item.children.map((childrenItem: IChildrenItem) => (
            <Menu.Item
              key={childrenItem.path}
              className='icon-pushpin-parent'
            >
              <Icon type={childrenItem.icon}/>
              {childrenItem.name}
              {
                this.isIncludes(childrenItem.path) ?
                  <Icon
                    className='icon-pushpin'
                    type="pushpin"
                    rotate={-45}
                    style={{ zIndex: 999 }}
                    onClick={(e) => this.reduceRouterTabs(e, childrenItem.path)}
                  />
                  :
                  <Icon
                    className='icon-pushpin'
                    type="pushpin"
                    onClick={(e) => this.addRouterTabs(e, childrenItem.name, childrenItem.path)}
                  />
              }
            </Menu.Item>
          ))
        }
      </Menu.SubMenu>
    );
  };

  isIncludes = (path: string) => {
    const { routerTabs } = this.props.global;
    let arr = routerTabs.filter((n: any) => {
      return n.path === path;
    });
    return arr.length !== 0;
  };

  menuSelect = ({ key }: any) => {
    router.push(key);
    this.props.dispatch({
      type: 'global/setCurrentPath',
      payload: key,
    });
    this.props.dispatch({
      type: 'global/setSidebarSelectKey',
      payload: [key],
    });
  };

  menuOpen = (openKey: string[]) => {
    this.props.dispatch({
      type: 'global/setSidebarOpenKey',
      payload: openKey,
    });
    this.props.dispatch({
      type: 'global/setSidebarCloneOpenKey',
      payload: openKey,
    });
  };

  renderSider = () => {
    const { collapsed } = this.state;
    const { isMobile, global } = this.props;
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsible={true}
        collapsed={isMobile ? false : collapsed}
        style={{ background: siderBackground, boxShadow: '2px 0 6px rgba(0,21,41,.15)' }}
        width={240}
        className={
          classname(
            siderTheme === 'light' ? 'light_collapsed_icon' : '',
            'base_sider',
            isMobile ? 'mobile-sider' : '',
          )
        }
        onCollapse={this.onCollapse}
      >
        <div className='sider_icon_wrapper'>
          <div
            style={{ backgroundColor: siderHeaderBackground }}
            className={classname(isMobile ? 'logo_open' : !collapsed ? 'logo_open' : 'logo_close')}
          >
            {
              isMobile
                ? process.env.SYSTEM_TITLE_OPEN
                : !collapsed
                ? process.env.SYSTEM_TITLE_OPEN
                : process.env.SYSTEM_TITLE_CLOSE
            }
          </div>
        </div>
        <Menu
          onClick={this.menuSelect}
          onOpenChange={this.menuOpen}
          theme={theme.siderTheme}
          openKeys={global.sidebarOpenKey}
          selectedKeys={global.sidebarSelectKey}
          mode="inline"
        >
          {
            siderMenu && siderMenu.map((item: any) => {
              return (
                !item.children
                  ? this.renderMenuItem(item)
                  : this.renderSubMenuItem(item)
              );
            })
          }
        </Menu>
      </Sider>
    );
  };

  render() {
    const { collapsed } = this.state;
    const { isMobile } = this.props;
    return (
      <Scrollbars>
        <BackTop/>
        <Layout className='mh100'>
          {
            !isMobile
              ? this.renderSider()
              :
              <Drawer
                closable={false}
                visible={collapsed}
                width={200}
                placement="left"
                onClose={() => this.onCollapse(false)}
                style={{
                  padding: 0,
                  height: '100vh',
                }}
              >
                {this.renderSider()}
              </Drawer>
          }

          <Layout>
            <Header className='pdlr20' style={{ background: headerBackground }}>
              <div className='header_wrapper'>
              <span style={{ fontSize: 20 }} className='pr20'>
                <Icon
                  onClick={() => this.onCollapse(!collapsed)}
                  style={{ cursor: 'pointer', color: '#fff' }}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </span>
                <div className='header_menu_wrapper'>
                  <Select
                    value='请输入搜索侧边栏'
                    onSelect={(value: any, option: any) => router.push(option.key)}
                    showSearch={true}
                    style={{ width: 249, color: '#999' }}
                    optionFilterProp="value"
                    filterOption={(input: any, option: any) =>
                      option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      selectSearchItem.map((item: any) => (
                        <Select.Option key={item.path} value={item.name}>
                          <Icon type={item.icon}/><span className='ml10' style={{ marginBottom: 0 }}>{item.name}</span>
                          <p style={{ marginBottom: 0 }}>{item.path}</p>
                        </Select.Option>
                      ))
                    }
                  </Select>
                </div>
                <Dropdown overlay={this.menu} trigger={['click']}>
                  <div className='header_userIcon_wrapper'>
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                    <span style={{ color: headerFontColor }} className='username'>admin</span>
                  </div>
                </Dropdown>
              </div>
            </Header>
            <Content>
              <HehRouterTabs/>
              <ConfigProvider locale={zhCN}>
                {this.props.children}
              </ConfigProvider>
            </Content>
            <Footer className='tac footer'>https://github.com/cdk8s</Footer>
          </Layout>
        </Layout>
      </Scrollbars>
    );
  }
}

export default connect(({ global }: any) => ({
  global,
}))((props: IProps) => (
  <Media query="(max-width: 599px)">
    {isMobile => {
      return (
        <MainLayout {...props} isMobile={isMobile}/>
      );
    }}
  </Media>
));

