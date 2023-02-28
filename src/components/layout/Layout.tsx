import React, { useContext, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import DataTable from '../adminPanel/table/DataTable';
import Avatar1 from '../helpers/Avatar';
import { Route, Routes, useNavigate, useNavigation} from 'react-router-dom';
import AdminEmployeePage from '../adminPanel/employeePage/AdminEmployeePage';
import { AuthContext } from '../../context/context';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];



const Panel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate()
  const {logout} = useContext(AuthContext);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
     <Menu
     items={[
      {label:'Dashboard',key:'/dashboard',icon:<PieChartOutlined/> , onClick:()=>navigate('/dashboard')},
      {label:'Employee Information',key:'/eab',icon:<PieChartOutlined/> , onClick:()=>navigate('/eab')},
      {label:'Logout',key:'/eabs',icon:<PieChartOutlined/> , onClick:()=>logout(),danger:true}
     ]}
     theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
          </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: 0,
            background: colorBgContainer,
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p></p>
          <p></p>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: 10 }}>Admin</p>
            <Avatar1 />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {/* <Breadcrumb.Item></Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
   
            <Routes>
            <Route path="/dashboard" element={<DataTable/>} />
            <Route path="/eab" element={<AdminEmployeePage/>} />
            </Routes>

            {/* <DataTable /> */}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default Panel;
