import React, { useState, useEffect } from 'react';
import { Menu, Button, Calendar } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';



const { SubMenu } = Menu;


function Sidebar() {


    const [collapsed, setcollapsed] = useState(false)

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };
    return (
        
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
    >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dagboard
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
            User Profile
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Appointments">
            <Menu.Item key="3">All Appointments</Menu.Item>
            <Menu.Item key="4">Completed </Menu.Item>
            <Menu.Item key="5">Rejected</Menu.Item>
           
        </SubMenu>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
            Biling
        </Menu.Item>
        <Menu.Item key="4" icon={<DesktopOutlined />}>
            SignOut
        </Menu.Item>
    
    </Menu>
    )
}

export default Sidebar
