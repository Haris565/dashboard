import React, { useState, useEffect } from 'react';
import { Menu, Button, Calendar} from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import PieChart from '../components/PieChart'
import Navbar from '../components/Navbar';
import LineGraph from '../components/LineGraph';
import LiquidGraph from '../components/LiquidGraph';
import { TrendingUpIcon } from '@heroicons/react/solid';
import { CalendarIcon } from '@heroicons/react/outline';
import Sidebar from '../components/Sidebar';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


const { SubMenu } = Menu;



function Home() {

    const [collapsed, setcollapsed] = useState(false)

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };

    return (


        <Layout>
        
                <div>
                    <Navbar />
                </div>
            
            <Layout>
                <Sider style={{backgroundColor:"white"}}>
                    <Sidebar />
                </Sider>
                <Content>Content</Content>
            </Layout>
                
      </Layout>


        // <div className='bg-white'>
           
        //    

        //               {/* ------------------------ Sidebar */}
        //     <div>
        //         <div className='flex flex-grow h-full fixed'>
        //             <Sidebar/>
        //         </div>
        //     </div>
            /* <div className='grid grid-cols-5'>
            
  

                <div className=' col-span-4 mt-10'>
                    <div className='grid grid-cols-1'>
                        <div className='h-80 '>
                            <PieChart />
                        </div>
                        <div>
                            <div className="flex justify-center align-middle items-center bg-gray-500 mx-32 rounded-xl mt-5 hover:scale-105 transition transform duration-200 ease-out">
                                <div className='bg-gray-800 border-2 border-indigo-500 rounded-full m-5 p-3'>
                                    <TrendingUpIcon className='text-indigo-500 h-8 w-8'/>
                                </div>
                                <div className='flex flex-col align-middle items-center justify-center flex-grow'>
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
              
                
                
            </div> */
        // </div>
    )
}

export default Home
