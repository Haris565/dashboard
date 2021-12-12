import { ClockIcon, EyeIcon, TrashIcon } from '@heroicons/react/solid'
import moment from 'moment'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Spin, TimePicker, Tooltip } from 'antd';
import { Drawer, Button, Space, } from 'antd';
import './Ant.css'

function Pending({selected}) {
    const [startDate, setstartDate] = useState()
    const [endDate, setendDate] = useState()
    
    const [data, setdata] = useState()

    const [loading, setloading] = useState(false)
    const [appointments, setappointments] = useState()
    const [visible, setVisible] = useState(false);
    const [reload, setreload] = useState()


    const showDrawer = () => {
        setVisible(true);
      };
    
    
      const onClose = () => {
        setVisible(false);
      };

      const setTime = async (appointmentId, startTime, endTime) => {
        let body ={
            appointmentId, startTime, endTime
        }
        try {
            let res = await axios.post(`http://localhost:5000/api/salon/setAppointmentTime`, body)
            console.log(res)
            setVisible(false)
            setreload(appointmentId)



        }
        catch(err){
            console.log(err)
        }
    }

    
    const markAsCancelled = async ( appointmentId) => {
        let body ={
            appointmentId
        }
        try {
            let res = await axios.post(`http://localhost:5000/api/salon/markAsCancelled`,body)
            console.log(res)
            setreload(appointmentId)
            


        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        console.log("Fetch Appointments")
        setloading(true)
        const fetchAppointments = async ()=> {
            let res = await axios.get(`http://localhost:5000/api/salon/getAllAppointments/${selected}`)
          
            console.log(res)
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
    }, [selected, reload])


    const drawerForAppointmentTime = () => {
        return (
            <Drawer
            title="Set Appointment Time"
            width={500}
            onClose={onClose}
            visible={visible}
            >
            <div className="flex ">
               <p className="font-medium"> {moment(data?.appointment_date).format("MMM Do YY")} </p>
            </div>

            <div className='flex flex-col'>


                <div className=''>
                    <p className='font-semibold text-sm'>{`Name ${data.customer_id.name}`}</p>
                    <p className='font-semibold text-sm'>{`Email ${data.customer_id.email}`}</p>
                    <p className='font-semibold text-sm'>{`Contact ${data.customer_id.number}`}</p>
                </div>
                <div>
                    
                </div>
                <div className=''>
                    <div>
                        Set Appointment time
                    </div>
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
                <button onClick={()=>onClose()}  className='py-2 px-3 bg-gray-500 rounded mt-5'>Cancel</button>
            </div>
          </Drawer>
        )
    }


    return (
        <>
        {visible ? drawerForAppointmentTime(): null}
        
        {
            loading  ? 
            <div className='flex justify-center align-middle items-center w-full h-screen'>
                <Spin size="large" />
            </div>
            :appointments?.length === 0 ? 
        <div className="text-green-300 font-semibold text-3xl flex justify-center mt-10 uppercase">You dont have any {selected} appointments</div>
        : 
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
                                <th className="py-3 px-6 text-center">Amount</th>
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
                                        {/* <div className="mr-2">
                                            <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>
                                        </div> */}
                                        <span>{item.customer_id?.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-center">
                                    <div className="flex items-center justify-center">
                                        {item.services?.map((item, index) => {
                                            return (
                                                <span className="bg-gray-900 text-purple-200 py-1 px-3 rounded-full text-md">
                                                    {` ${item?.title}`}
                                                </span>
                                            )
                                        })}
                                        
                                   
                                    </div>
                                </td>
                                <td className="py-3 px-2 text-center">
                                    <div className="flex items-center justify-center">
                                   
                                                <span className="bg-gray-900 text-purple-200 py-1 px-3 rounded-full text-md">
                                                    {` ${item?.total}`}
                                                </span>
                                     
                                        
                                   
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
                                        <Tooltip placement="topLeft" title="Accept Appointment">
                                            <ClockIcon
                                                    onClick= {()=>{
                                                        showDrawer()
                                                        setdata(item)
                                                        }
                                                    } 
                                                />
      
                                        </Tooltip>

                                       
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <Tooltip placement="topLeft" title="Reject Appointment">
                                                <TrashIcon
                                                    onClick={()=>{
                                                        markAsCancelled(item?._id)
                                                    }}
                                                />
                                            </Tooltip>
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
    }
    </>
    )
}

export default Pending
