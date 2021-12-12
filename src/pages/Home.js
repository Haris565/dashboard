import React, { useState, useEffect } from 'react';
import { Menu, Button, Calendar, Row, Col, Statistic, Card, Divider, Image } from 'antd';
import {  Spin } from 'antd';
import { Rate } from 'antd';
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
import axios from 'axios';
import moment from 'moment';
import Payment from './Payment';

const {  Sider, Content } = Layout;


const { SubMenu } = Menu;



function Home() {

    const [collapsed, setcollapsed] = useState(false)
    const user = useSelector(state => state.auth.user)
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState()
    const [price, setprice] = useState(false)


    useEffect(() => {
      (async()=> {
          try {
            setloading(true)
            let res = await axios.get(`http://localhost:5000/api/salon/getDashboardData/${user.profileId}`)
            console.log(res.data)
            setdata(res.data)
            setloading(false)
          }
          catch(err){
              console.log(err)
          }
       
      })
      ()
    }, [user.profileId])

    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };


    if(user?.paymentComplete === false){
        return (<Redirect to="/pricing" />)
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
                {(loading) ? 
                    <div className='flex justify-center align-middle items-center w-full h-screen'>
                        <Spin size="large" />
                    </div> 
                    :
                    <>
                    <Row className='mt-5'>
                        
            
                        <Col span={8} className='w-full'>
                            <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                                <div className='ml-5'>
                                    <img src={calender} alt="calender" style={{height:"70px"}} />
                                </div>
                                
                                <div className='ml-2 flex flex-col items-center'>
                                    <h1 className='text-white font-medium'>Appointments</h1>
                                    <h1 className='text-white font-medium' >{data?.count.length > 0 ? data?.count[0].total: 0}</h1>
                                </div>
                                
                            </div>
                        </Col>

                    
                        <Col span={8} className='w-full'>
                        
                        <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                                <div className='ml-5'>
                                    <img src={customer} alt="calender" style={{height:"70px"}} />
                                </div>
                                
                                <div className='ml-2 flex flex-col items-center'>
                                    <h1 className='text-white font-medium'>Clients</h1>
                                    <h1 className='text-white font-medium' >{data?.count.length > 0 ? data?.count[0].total: 0}</h1>
                                </div>
                                
                            </div>
                        </Col>

                        {/* <Col span={6} className='w-full'>
                            <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                                <div className='ml-5'>
                                    <img src={salon} alt="calender" style={{height:"70px"}} />
                                </div>
                                
                                <div className='ml-2 flex flex-col items-center'>
                                    <h1 className='text-white font-medium'>Services</h1>
                                    <h1 className='text-white font-medium' >5</h1>
                                </div>
                                
                            </div>
                        </Col> */}

                        <Col span={8} className='w-full'>
                        <div className='h-24 ml-5 rounded-lg bg-gray-700 flex items-center '>
                                <div className='ml-5'>
                                    <img src={revenue} alt="calender" style={{height:"70px"}} />
                                </div>
                                
                                <div className='ml-2 flex flex-col items-center'>
                                    <h1 className='text-white font-medium'>Est Revenue </h1>
                                    <h1 className='text-white font-medium' >{data?.total.length > 0 ? data?.total[0].total: 0}/pkr</h1>
                                </div>
                                
                            </div>
                        </Col>
                    </Row>
                    <Divider orientation="left" className='mt-5'> Details</Divider>
                    
                    <Row>

                        <Col span={12}>
                            <h1 className='text-gray-200 text-2xl font-normal mt-5 ml-5'>Upcoming Oppointments</h1>
                            {data && data?.upComing.length > 0 ? 
                                data?.upComing?.map((item,index)=>{
                                    return (
                                        <div className='h-24 mx-5 mt-5 rounded-lg bg-gray-700  ' key={index}>
                                            <div className='flex flex-row items-center justify-between'>
                                                <div className='ml-2 flex-col items-center justify-center'>
                                                    <div className="flex relative w-10 h-10 bg-yellow-600 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">{item?.customer_id?.name[0]} </div>
                                                    <h1 className='text-white font-medium'>{item?.customer_id?.name}</h1>
                                                </div>
                                                
                                                <div className='ml-2 flex flex-col'>
                                                    <h1 className='text-white font-medium'>Appointment Time</h1>
                                                    <h1 className='text-white font-medium' >{`${item?.start_time} - ${item?.end_time} `}</h1>
                                                </div>
                                                <div className='mt-2'>
                                                    {item?.services?.map((val,index)=>{
                                                        return (
                                                            <h1 key={index} className='text-gray-300 font-extralight leading-none pr-5' >{val.title}</h1>
                                                        )
                                                    })}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-white"> {item.total}/pkr</span>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-white mr-2"> {moment(item.appointment_date).format("MMM Do YY")} </span>
                                                </div>
                                            </div>
                            
                                    
                                            
                                        </div>
                                    )
                                })
                                
                            :
                                <div className=''>
                                    <h1 className='text-gray-200 text-lg font-normal mt-5 ml-5'>You dont have any upcoming appointments</h1>
                                </div>
                            }
                            
                        </Col>
                        <Col span={12}>
                        <div className="p-8 bg-gray-700 mr-4 mt-6 rounded-lg">
                            <Row className='mt-5'>
                
                                <Col span={12} className='w-full'>
                                    <div className='w-44 h-44 m-auto'>
                                        <LiquidGraph firstColor='#38A169' secondColor="#48BB78" percentage={data?.acceptRate} status="Acceptance Rate"  />
                                    </div>
                                </Col>
                                <Col span={12} className='w-full'>
                                    <div className='w-44 h-44 m-auto'>
                                        <LiquidGraph firstColor='#E53E3E' secondColor="#FC8181" percentage={data?.cancelRate} status="Cancel Rate"  />
                                    </div>
                                </Col>
                            </Row>
                            </div>
                        </Col>
                        
                    
                        <Col span={24}>
                        <div className='text-gray-200 text-2xl font-normal mt-5 ml-5'> Latest Reviews</div>
                        {data && data?.reviews?.length > 0 ?
                        data?.reviews?.map((item,index)=> {
                            return (
                                <div className="flex bg-gray-700 my-10 mx-4 rounded" key={index}>
                                    <div className="ml-6">
                                        <p className="flex items-center mt-2">
                                            <div className="flex relative w-10 h-10 bg-green-500 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">{item?.user_id?.name[0]} </div>
                                            <span className="text-white font-bold">{item?.user_id?.name}</span>
                                        </p>
                                        <div className="flex items-center ml-2">
                                            <Rate disabled defaultValue={item.rating} />
                                        </div>
                                    

                                        <div className="ml-2">
                                        <p className="mt-1 text-lg text-white">{item.review}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) 
                        :
                        <div>
                            <h1>No Reviews Yet</h1>
                        </div>  
                    }
                        
                        
                        </Col>


                    </Row>
                    </>
                    }

                    
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
