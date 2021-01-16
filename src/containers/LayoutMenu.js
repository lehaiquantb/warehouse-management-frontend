import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import "./LayoutMenu.css";
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button, Spin } from 'antd';
import {
  BarChartOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { IconMap } from 'antd/lib/result';
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/LayoutMenu.css';
//import { logoutAction } from "../../redux/actions/authAction";
import logo from '../assets/images/logo.jpg';
import logoFull from '../assets/images/logo.jpg';
import pr_icon from '../assets/images/product-icon.jpg';
import sp_icon from '../assets/images/supplier-icon.png';
import { logout } from '../redux/actions/user';
import Clock from '../components/Clock';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function LayoutMenu(props) {
  const { children } = props;
  const { isRequesting } = useSelector((state) => state.config);
  const [collapsed, setCollapsed] = useState(false);
  const userName = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const { pathname } = useSelector((state) => state.router.location);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  React.useEffect(() => {}, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout(email));
  };

  const menu = (
    <Menu>
      <Menu.Item>{userName}</Menu.Item>
      <Menu.Item onClick={onLogout}>Log out</Menu.Item>
    </Menu>
  );

  const ProductIcon = (
    <span
      className="anticon anticon-form"
      style={{ marginRight: '10px', color: '#fff', minWidth: '14px' }}
    >
      <img src={pr_icon} style={{ height: '15px', width: '15px' }} />
    </span>
  );

  const SupplierIcon = (
    <span
      className="anticon anticon-form"
      style={{ marginRight: '10px', color: '#fff', minWidth: '14px' }}
    >
      <img
        src={sp_icon}
        style={{
          height: '15px',
          width: '15px',
          backgroundColor: '#fff',
          borderRadius: '100%',
        }}
      />
    </span>
  );

  const showHeader = () => {
    switch (pathname) {
      case '/home':
        return 'Trang chủ';
      case '/products':
        return 'Danh sách sản phẩm';
      case '/receipts':
        return 'Danh sách đơn nhập kho';
      case '/suppliers':
        return 'Danh sách nhà cung cấp';
      default:
        return '';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className='logo' /> */}
        <div
          className="logo"
          style={collapsed ? { padding: '4px' } : { padding: '4px' }}
        >
          {/* <Logo height={collapsed ? "50px" : "100px"} /> */}
          <img src={collapsed ? logo : logoFull} height={'60px'} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[history.location.pathname || '/home']}
          mode="inline"
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Trang chủ</Link>
          </Menu.Item>
          <SubMenu key="sub-product" icon={ProductIcon} title="Sản phẩm">
            <Menu.Item key="/products">
              <Link to="/products">Danh sách sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="/products/create">
              <Link to="/products/create">Tạo mới sản phẩm</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub-receipt"
            icon={<FormOutlined />}
            title="Đơn nhập kho"
          >
            <Menu.Item key="/receipts">
              <Link to="/receipts">Danh sách đơn</Link>
            </Menu.Item>
            <Menu.Item key="/receipts/create">
              <Link to="/receipts/create">Tạo mới đơn</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub-supplier" icon={SupplierIcon} title="Nhà cung cấp">
            <Menu.Item key="/suppliers">
              <Link to="/suppliers">Danh sách nhà cung cấp</Link>
            </Menu.Item>
            <Menu.Item key="/suppliers/create">
              <Link to="/suppliers/create">Tạo mới nhà cung cấp</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <h5 style={{ textAlign: 'center', lineHeight: '60px' }}>
            {showHeader()}
          </h5>
          <div>
            <span className="header-name">{userName}</span>
            <span className="header-avatar">
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Button shape="circle" icon={<UserOutlined />}></Button>
              </Dropdown>
            </span>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: '100%' }}
          >
            {isRequesting ? (
              <Spin style={{ margin: 'auto' }} size="large" />
            ) : (
              children
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <h6>
            <Clock />
          </h6>
        </Footer>
      </Layout>
    </Layout>
  );
}

LayoutMenu.propTypes = {};

export default LayoutMenu;
