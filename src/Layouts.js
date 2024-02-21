import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Avatar,Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import './Layout.css'
const { Header, Content, Sider } = Layout;
  
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const ProfileMenu = (
  <Menu>
    <Menu.Item key="profile">
      <Link to="/managerprofile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="logout">
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);
const Layouts = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background:" #5E5E5E"
        
        }}
      >
        <div className="login_topbar">
        <div className="empire">Hotel Empire</div>{" "}
      </div>
      
      <div className="demo-logo">
          <Dropdown overlay={ProfileMenu} placement="bottomRight">
            <Avatar className="j" size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
        <Menu
          theme="light"
        backgroundColor="#e5e7eb"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          // items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
            <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          >
            {props.menuItems?.map((item) => (
              <Menu.SubMenu key={item.label} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item
                    key={child.key}
                    // onClick={() => handleMenuItemClick(child.key)}
                  >
                    <Link className="kk" to={child.link}>
                      {child.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
            {console.log('props.children:', props.children)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Layouts;