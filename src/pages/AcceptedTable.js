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
import Pending from './Pending'
import Confirmed from './Confirmed';
const { Sider, Content } = Layout;






function AcceptedTable() {



    const [startDate, setstartDate] = useState()
    const [endDate, setendDate] = useState()
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setdata] = useState()
    const [count, setcount] = useState({
        pending:0,
        accepted:0,
        rejected:0,
        completed:0
    })
    const [loading, setloading] = useState(false)
    const [appointments, setappointments] = useState()

    const [selected, setselected] = useState("pending")



    useEffect(() => {
        console.log("Fetch Appointments")
        setloading(true)
        const fetchAppointments = async ()=> {
            let res = await axios.get(`http://localhost:5000/api/salon/getAllAppointments/${selected}`)
            let countresponse = await axios.get("http://localhost:5000/api/salon/getCounts")
            console.log(res)
            console.log(countresponse)
            // countresponse?.data?.map((item)=>(
            //     (item._id === "pending") ? setcount((prev)=>({...prev, pending:item.total})) : setcount((prev)=>({...prev, pending:0}))
            //     (item._id === "accepted") ? setcount((prev)=>({...prev, accepted:item.total})) : setcount((prev)=>({...prev, accepted:0}))
            //     (item._id === "rejected") ? setcount((prev)=>({...prev, rejected:item.total})) : setcount((prev)=>({...prev, rejected:0}))
            //     (item._id === "completed") ? setcount((prev)=>({...prev, completed:item.total})) : setcount((prev)=>({...prev, completed:0}))
            // ))

            setappointments(res.data)
            setloading(false)

        }
        fetchAppointments()
    }, [selected])


    const showModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    const dataForModal= (item) => {
        setdata(item)
    }
  
 
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    

    const setTime = async (appointmentId, startTime, endTime) => {
        let body ={
            appointmentId, startTime, endTime
        }
        try {
            let res = await axios.post(`http://localhost:5000/api/salon/setAppointmentTime`, body)
            console.log(res)
            selected("accepted")
            setIsModalVisible(false)
            
            
           
        }
        catch(err){
            console.log(err)
        }
    }


    const markAsComplete = async ( appointmentId) => {
        let body ={
            appointmentId
        }
        try {
            let res = await axios.post(`http://localhost:5000/api/salon/markAsComplete`,body)
            console.log(res)
            selected("completed")
            setIsModalVisible(false)
          
           
        }
        catch(err){
            console.log(err)
        }
    }



    const dataModal = () => {

        return (
            <Modal
            maskStyle={{ backgroundColor: "#000C17" }}
            title="Set Appointment Time"
            visible={isModalVisible}
            footer={false}
          >
            
            <div className="flex ">
                <h1 className="font-medium">Date: </h1><span className="font-medium"> {moment(data.appointment_date).format("MMM Do YY")} </span>
            </div>
                             
            <div className='flex flex-col'>

                <div className=''>
                    <p className='font-semibold text-sm'>{`Set appointment time for ${data.customer_id.name}`}</p>
                </div>
                <div className=''>
                    <TimePicker.RangePicker className='bg-gray-700'
                        onChange={(time,timeString)=>{
                            setstartDate(timeString[0])
                            setendDate(timeString[1])
                        }}
                    />
                </div>

            </div>
            <div className='text-white flex ml-auto'>
                <button onClick={()=>setTime(data._id, startDate, endDate)} className='py-2 px-3 bg-indigo-500 rounded mr-5 mt-5'>Accept</button>
                <button onClick={handleCancel} className='py-2 px-3 bg-gray-500 rounded mt-5'>Cancel</button>
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
               <div 
                    onClick={()=>setselected("pending")}
                    className={selected === 'pending' ?'h-24 rounded-lg  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '} >
                   <div className='ml-5'>
                       <img src={time} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>PENDING</h1>
                       <h1 className='text-white font-medium' >{count?.pending}</h1>
                   </div>
                   
               </div>
           </Col>
           
           <Col span={6} className='w-full'>
               <div 
                    onClick={()=>setselected("completed")}
                    className={selected === 'completed' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={tick} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>COMPLETED</h1>
                       <h1 className='text-white font-medium' >{count?.completed}</h1>
                   </div>
                   
               </div>
           </Col>

          
           <Col span={6} className='w-full'>
           
                <div 
                    onClick={()=>setselected("accepted")}
                    className={selected === 'accepted' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={calender} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'>CONFIRMED</h1>
                       <h1 className='text-white font-medium' >{count?.accepted}</h1>
                   </div>
                   
               </div>
           </Col>



           <Col span={6} className='w-full'>
                <div 
                    onClick={()=>setselected("rejected")}
                    className={selected === 'rejected' ?'h-24 rounded-lg ml-5  bg-gray-900 flex items-center cursor-pointer hover:scale-105 transition transform duration-200 ease-out ' : 'h-24 rounded-lg ml-5  bg-gray-600 flex items-center hover:scale-105 transition transform duration-200 ease-out '}>
                   <div className='ml-5'>
                       <img src={cross} alt="calender" style={{height:"70px"}} />
                   </div>
                   
                   <div className='ml-2 flex flex-col items-center'>
                       <h1 className='text-white font-medium'> CANCELED </h1>
                       <h1 className='text-white font-medium' >{count?.rejected}</h1>
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
                {selected==='pending' &&  <Pending appointments={appointments} showModal={showModal} dataForModal={dataForModal} selected={selected} /> }
                {selected==='accepted' &&  <Confirmed appointments={appointments} markAsComplete={markAsComplete} selected={selected} /> }
                {selected==='rejected' &&  <Pending appointments={appointments} showModal={showModal} dataForModal={dataForModal} selected={selected} /> }
                {selected==='completed' &&  <Pending appointments={appointments} showModal={showModal} dataForModal={dataForModal} selected={selected} /> }
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


            //    countresponse.map((dat)=> {
        //         if(dat.id==='pending'){
        //             setcount((prev)=>({...prev, pending:dat.total}))
        //         }
        //         if(dat.id==='rejeceted'){
        //             setcount((prev)=>({...prev, rejected:dat.total}))
        //         }
           
        //         if(dat.id==='accepted'){
        //             setcount((prev)=>({...prev, accepted:dat.total}))
        //         }

        //         if(dat.id==='completed'){
        //             setcount((prev)=>({...prev, completed:dat.total}))
        //         }
              
        //     })