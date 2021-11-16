import React, { useState, useEffect } from "react";
import { Table, Divider, Tag, Pagination, Row, Col, Calendar } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Layout, TimePicker, Spin } from 'antd';
import { SearchIcon, CalendarIcon, EyeIcon, TrashIcon, ClockIcon } from "@heroicons/react/solid";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Modal, Button } from "antd";
import calender from "../Images/calendar.png"
import customer from "../Images/customer.svg"
import service from "../Images/service.svg"
import salon from "../Images/salon.svg"
import revenue from "../Images/revenue.svg"
import tick from "../Images/tick.png"
import time from "../Images/time.png"
import cross from "../Images/cross.png"
import axios from 'axios';
import moment from 'moment'
const { Sider, Content } = Layout;






function AcceptedTable() {



    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setendDate] = useState(new Date())
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setdata] = useState({name:'haris'})
    const [count, setcount] = useState()
    const [loading, setloading] = useState(false)
    const [appointments, setappointments] = useState()

    const [selected, setselected] = useState("pending")



    // data.map((dat)=>{
    //     if(dat.id==='pending'){
    //         setPending(dat.total);
    //     }
    //     else{
    //         setPending(0)
    //     }
    //     if(dat.id==='rejeceted'){
    //         setRejected(dat.total);
    //     }
    //     else{
    //         setRejected(0)
    //     }
    //     if(dat.id==='accepted'){
    //         setAccepted(dat.total);
    //     }
    //     else{
    //         setAccepted(0)
    //     }
    //     if(dat.id==='completed'){
    //         setCompleted(dat.total);
    //     }
    //     else{
    //         setCompleted(0)
    //     }

    // })
    // useEffect(() => {
    //     console.log("appointments")
    //     // const getAppointments = async()=>{
            
    //     //     let appointments = await axios.get("http://localhost:5000/api/salon/getAllAppointments")
    //     //     console.log(appointments)
    //     // } 
    //     //  getAppointments()
    // }, [])
    useEffect(() => {
        console.log("Fetch Appointments")
        setloading(true)
        const fetchAppointments = async ()=> {
            let res = await axios.get("http://localhost:5000/api/salon/getAllAppointments")
            let count = await axios.get("http://localhost:5000/api/salon/getCounts")
            console.log(res)

            setappointments(res.data)
            setcount(count.data)
            setloading(false)

        }
        fetchAppointments()
    }, [])


    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const selectionRange = {
        startDate:startDate,
        endDate:endDate,
        key:"selection"
    }

    const handleSelect = (ranges) => {
        setstartDate(ranges.selection.startDate)
        setendDate(ranges.selection.endDate)
    }

    const dataModal = () => {

        return (
            <Modal
            maskStyle={{ backgroundColor: "#000C17" }}
            bodyStyle={{ backgroundColor: "#374151" }}
            title=""
            visible={isModalVisible}
            footer={null}
          >
            <p className='text-white'>{data.name}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
                             
            <div className='flex flex-row'>
                <div className=''>
                    <p className='text-gray-200 font-semibold text-sm'>Set appointment time for customer</p>
                </div>
                <div className=''>
                    <TimePicker.RangePicker className='bg-gray-700' />
                </div>

            </div>
            <div className='text-white flex ml-auto'>
                <button onClick={handleCancel} className='py-2 px-3 bg-indigo-500 rounded mr-5 mt-5'>Accept</button>
                <button className='py-2 px-3 bg-gray-500 rounded mt-5'>Cancel</button>
            </div>
          </Modal>
        )
    }

    return (

        <Layout style={{backgroundColor:"#000C17"}}>
            <Navbar />
            <Layout>
            <Sider style={{backgroundColor:"#001529" , height: 'calc(100vh - 56px)'}}>
                    <Sidebar />
                </Sider>
            <Content className="" style={{backgroundColor:"#000C17",height:'calc(100vh - 56px)', overflowY:"scroll" }}>
           {count ? 
            <Row className='w-full lg:w-5/6 mt-10 m-auto'>
           

            <Col span={6} className='w-full'>
               <div className={selected === 'pending' ?'h-24 rounded-lg  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '} >
                   <div className='ml-5'>
                       <img src={time} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>PENDING</h1>
                       <h1 className='text-white font-medium' >{appointments?.length}</h1>
                   </div>
                   
               </div>
           </Col>
           
           <Col span={6} className='w-full'>
               <div className={selected === 'completed' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={tick} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>COMPLETED</h1>
                       <h1 className='text-white font-medium' >12</h1>
                   </div>
                   
               </div>
           </Col>

          
           <Col span={6} className='w-full'>
           
           <div className={selected === 'confirmed' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={calender} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>CONFIRMED</h1>
                       <h1 className='text-white font-medium' >5</h1>
                   </div>
                   
               </div>
           </Col>



           <Col span={6} className='w-full'>
           <div className={selected === 'cancelled' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={cross} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'> CANCELED </h1>
                       <h1 className='text-white font-medium' >3</h1>
                   </div>
                   
               </div>
           </Col>
       </Row>
: null}


          <Row style={{}}>

            {(loading && !appointments) ? 
            <div className='flex justify-center align-middle items-center w-full h-screen'>
                <Spin size="large" />
            </div> 
            :
             
   
            <Col span={24}>

            <div className="mt-10">
                <div className="min-w-screen h-screen flex justify-center font-sans" style={{backgroundColor:'#000C17'}}>
                    <div className="w-full lg:w-5/6">
                        <div className="bg-gray-700 shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-900 text-gray-200 uppercase text-sm leading-normal border-b border-gray-500">
                                        <th className="py-3 px-6 text-left">Date</th>
                                        <th className="py-3 px-6 text-left">Client</th>
                                        <th className="py-3 px-6 text-center">Services</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-200 text-sm font-light">
                                    {appointments && appointments.map((item, index)=>{
                                        return(
                                    <tr className="  hover:bg-gray-500 cursor-pointer">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                             
                                                <span className="font-medium"> {moment(item.appointment_date).format("MMM Do YY")} </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>
                                                </div>
                                                <span>{item.customer_id?.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            <div className="flex items-center justify-center">
                                                {item.services?.map((item, index) => {
                                                    return (
                                                        <span className="bg-gray-900 text-purple-200 py-1 px-3 rounded-full text-md">
                                                            {item.price}
                                                        </span>
                                                    )
                                                })}
                                                
                                           
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-gray-900 text-purple-200 py-1 px-3 rounded-full text-md">
                                            { item.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <EyeIcon onClick= {()=>setIsModalVisible(!isModalVisible)} />
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <ClockIcon />
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <TrashIcon />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                        )
                                    })}            
                               
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalVisible ? dataModal() : null}

            </Col>
            }
            {/* <Col span={4} offset={20}>
                    <MyPagination
                        total={data.length}
                        current={current}
                        onChange={setCurrent}
                        
                    />
            </Col> */}
          
          </Row>
          

                    
               
                    
        </Content>
      </Layout>
      
    </Layout>



    )
}

export default AcceptedTable
