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
import Header from '../components/Header';
import PieChart from '../components/PieChart'
import Navbar from '../components/Navbar';
import LineGraph from '../components/LineGraph';
import LiquidGraph from '../components/LiquidGraph';
import { TrendingUpIcon } from '@heroicons/react/solid';
import { CalendarIcon } from '@heroicons/react/outline';

const { SubMenu } = Menu;



function Home() {

    const [collapsed, setcollapsed] = useState(false)

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };

    return (


        <div className='bg-gray-800'>
           
            <Navbar />
            <div className='grid grid-cols-5'>
            
            {/* ------------------------ Sidebar */}
                <div   >
                    <div className='flex flex-grow h-full fixed'>

                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={collapsed}
                        >
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                Option 2
                            </Menu.Item>
                            <Menu.Item key="3" icon={<ContainerOutlined />}>
                                Option 3
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>

                <div className=' col-span-4 mt-10'>
                    <div className='grid grid-cols-2'>
                        <div className='h-80'>
                            <PieChart />
                        </div>
                        <div>
                            <div className="flex justify-center align-middle items-center bg-gray-500 mx-32 rounded-xl mt-5 hover:scale-105 transition transform duration-200 ease-out">
                                <div className='bg-gray-800 border-2 border-indigo-500 rounded-full m-5 p-3'>
                                    <TrendingUpIcon className='text-indigo-500 h-8 w-8'/>
                                </div>
                                <div className='flex flex-col align-middle items-center justify-center'>
                                    <h2 className='text-gray-300 font-bold text-lg'>Total sales today</h2>
                                    <h2 className='text-gray-200 font-bold text-md'>25,000{' '}pkr</h2>
                                </div>
                            </div>
                            <div className="flex justify-center align-middle items-center bg-gray-500 mx-32 rounded-xl mt-5 hover:scale-105 transition transform duration-200 ease-out">
                                <div className='bg-gray-800 border-2 border-indigo-500 rounded-full m-5 p-3'>
                                    <CalendarIcon className='text-indigo-500 h-8 w-8'/>
                                </div>
                                <div className='flex flex-col align-middle items-center justify-center'>
                                    <h2 className='text-gray-300 font-bold text-lg'>Appointments</h2>
                                    <h2 className='text-gray-200 font-bold text-md'>25,000{' '}pkr</h2>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 my-16 mx-10 bg-gray-600 p-20'>
                    
                            <LineGraph />
                        </div>

                    </div>
                </div>
              
                
                
            </div>
        </div>
    )
}

export default Home
