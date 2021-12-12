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
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../redux/actions/auth"
import { Redirect } from 'react-router';
import "../App.css"

const { SubMenu } = Menu;


function Sidebar() {

    
    const [collapsed, setcollapsed] = useState(true)

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
            <Link to="/" className="nav-text">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/userProfile" className="nav-text">Profile</Link>
        </Menu.Item>
        
        <Menu.Item key="3" icon={<MailOutlined />} >
            <Link to="/allAppointments" className="nav-text" >Appointments</Link>
        </Menu.Item>

            
        <Menu.Item key="6" icon={<DesktopOutlined />}>
            <Link to="/messages" className="nav-text">Messages</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link to="/package" className="nav-text">Package</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<DesktopOutlined />} onClick={logoutHandler}>
            SignOut
        </Menu.Item>
    
    </Menu>
    )
}

export default Sidebar
