import React, { useState, useEffect } from 'react';
import { Menu, Button, Calendar, Row, Col, Statistic, Card, Divider, Image } from 'antd';
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
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import calender from "../Images/calendar.svg"
import customer from "../Images/customer.svg"
import service from "../Images/service.svg"
import salon from "../Images/salon.svg"
import revenue from "../Images/revenue.svg"
import Pie from './../components/PieChart';
const {  Sider, Content } = Layout;


const { SubMenu } = Menu;



function Home() {

    const [collapsed, setcollapsed] = useState(false)
    const auth = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };

    if(!auth){
        return(<Redirect to="/login" />)
        
    }

    if(!user?.profileComplete){
        return(<Redirect to="/profile" />)
    }
    return (


        <Layout style={{backgroundColor:"#000C17", }}>
        
                <div>
                    <Navbar />
                </div>
            
            <Layout>
                <Sider style={{backgroundColor:"#001529" , height: 'calc(100vh - 56px)'}}>
                    <Sidebar />
                </Sider>
                <Content style={{backgroundColor:"#000C17",height: 'calc(100vh - 56px)', overflowY:"scroll"}} className=''>

                <Row className='mt-5'>
           
                    <Col span={6} className='w-full'>
                        <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                            <div className='ml-5'>
                                <img src={calender} alt="calender" style={{height:"70px"}} />
                            </div>
                            
                            <div className='ml-2 flex flex-col items-center'>
                                <h1 className='text-white font-medium'>Appointments</h1>
                                <h1 className='text-white font-medium' >12</h1>
                            </div>
                            
                        </div>
                    </Col>

                   
                    <Col span={6} className='w-full'>
                    
                    <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                            <div className='ml-5'>
                                <img src={customer} alt="calender" style={{height:"70px"}} />
                            </div>
                            
                            <div className='ml-2 flex flex-col items-center'>
                                <h1 className='text-white font-medium'>Clients</h1>
                                <h1 className='text-white font-medium' >5</h1>
                            </div>
                            
                        </div>
                    </Col>

                    <Col span={6} className='w-full'>
                        <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                            <div className='ml-5'>
                                <img src={salon} alt="calender" style={{height:"70px"}} />
                            </div>
                            
                            <div className='ml-2 flex flex-col items-center'>
                                <h1 className='text-white font-medium'>Services</h1>
                                <h1 className='text-white font-medium' >5</h1>
                            </div>
                            
                        </div>
                    </Col>

                    <Col span={6} className='w-full'>
                    <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                            <div className='ml-5'>
                                <img src={revenue} alt="calender" style={{height:"70px"}} />
                            </div>
                            
                            <div className='ml-2 flex flex-col items-center'>
                                <h1 className='text-white font-medium'>Est Revenue </h1>
                                <h1 className='text-white font-medium' >3000/pkr</h1>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left" className='mt-5'> Details</Divider>
                <Row>

                    <Col span={12}>
                        <h1 className='text-gray-200 text-lg font-normal mt-5 ml-5'>Upcoming Oppointments</h1>
                        <div className='h-24 mx-5 mt-5 rounded-lg bg-gray-700 flex justify-between item-center '>
                            <div className='flex flex-row'>
                                <div className=''>
                                    <img className='w-24 h-24 rounded-lg' src="https://scontent.fisb13-1.fna.fbcdn.net/v/t1.6435-9/40498379_730364463977445_2131666155327193088_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEZg5gG6t3kkI8qF23YjszW4oQx7-yCq9XihDHv7IKr1feBeeolrv-9QS4BfYrc65TdTlOhcl_0J8WK5Izw16Vr&_nc_ohc=VWdeL-MpiKUAX8EJOsS&_nc_ht=scontent.fisb13-1.fna&oh=f0dc6d0a4df607c688908a121de343e1&oe=61729C75" alt="no image" />
                                </div>
                                
                                <div className='ml-2 flex flex-col'>
                                    <h1 className='text-white font-medium'>Haris</h1>
                                    <h1 className='text-white font-medium' >12:00 - 1:00</h1>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h1 className='text-gray-300 font-extralight leading-none pr-5' >Hair cut</h1>
                                <h1 className='text-gray-300 font-extralight leading-none pr-5' >shave</h1>
                            </div>
                      
                            
                        </div>
                        
                    </Col>
                    <Col span={12}>
                    <div className="p-8 bg-gray-700 mr-4 mt-6 rounded-lg">
                        <Row className='mt-5'>
            
                            <Col span={12} className='w-full'>
                                <div className='w-44 h-44 m-auto'>
                                    <LiquidGraph firstColor='#3D76DD' secondColor="#B8E1FF" percentage="70" status="Acceptance Rate"  />
                                </div>
                            </Col>
                            <Col span={12} className='w-full'>
                                <div className='w-44 h-44 m-auto'>
                                    <LiquidGraph firstColor='#3D76DD' secondColor="#B8E1FF" percentage="70" status="Reject Rate"  />
                                </div>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                
                 
                    <Col span={24}>
                    {/* <div className='flex flex-row'>
                            <div className="flex ml-auto justify-around bg-gray-500 mx-32 rounded-xl mt-5 hover:scale-105 transition transform duration-200 ease-out w-72">
                                <div className='bg-gray-800 border-2 border-indigo-500 rounded-full m-5 p-3'>
                                    <TrendingUpIcon className='text-indigo-500 h-8 w-8'/>
                                </div>
                                <div className='flex flex-col align-middle items-center justify-center flex-grow'>
                                    <h2 className='text-gray-300 font-bold text-lg'>Total sales today</h2>
                                    <h2 className='text-gray-200 font-bold text-md'>25,000{' '}pkr</h2>
                                </div>
                            </div>
                            <div className="flex ml-auto justify-around bg-gray-500 mx-32 rounded-xl mt-5 hover:scale-105 transition transform duration-200 ease-out w-72">
                                <div className='bg-gray-800 border-2 border-indigo-500 rounded-full m-5 p-3'>
                                    <CalendarIcon className='text-indigo-500 h-8 w-8'/>
                                </div>
                                <div className='flex flex-col align-middle items-center justify-center flex-grow'>
                                    <h2 className='text-gray-300 font-bold text-lg'>Appointments Today</h2>
                                    <h2 className='text-gray-200 font-bold text-md'>25,000{' '}pkr</h2>
                                </div>
                            </div>
                        </div> */}
                    
                    </Col>


                </Row>
                    
                </Content>
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
