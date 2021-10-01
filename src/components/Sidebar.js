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
import {NavLink} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../redux/actions/auth"
import { Redirect } from 'react-router';


const { SubMenu } = Menu;


function Sidebar() {

    
    const [collapsed, setcollapsed] = useState(false)

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isAuthenticated)

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };

    const logoutHandler = () => {
        dispatch(logout())
    }

    if(!auth){
        return(<Redirect to="/login" />)
        
    }
    return (
        
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
    >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
        <NavLink to="/" className="nav-text">Dashboard</NavLink>
            
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
        <NavLink to="/userProfile" className="nav-text">Profile</NavLink>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Appointments">
            <Menu.Item key="3" >
                <NavLink to="/allAppointments" className="nav-text">Appointments</NavLink>
            </Menu.Item>

            <Menu.Item key="4">
                <NavLink to="/accepted" className="nav-text">Accepted</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
                <NavLink to="/rejected" className="nav-text">Rejected</NavLink>
            </Menu.Item>
           
        </SubMenu>
        <Menu.Item key="6" icon={<DesktopOutlined />}>
            <NavLink to="/messages" className="nav-text">Messages</NavLink>
        </Menu.Item>
        <Menu.Item key="7" icon={<DesktopOutlined />} onClick={logoutHandler}>
            SignOut
        </Menu.Item>
    
    </Menu>
    )
}

export default Sidebar
