import { ClockIcon, EyeIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/solid'
import moment from 'moment'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Spin } from 'antd';

function Cancel({selected}) {
    const [loading, setloading] = useState(false)
    const [appointments, setappointments] = useState()


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
    }, [selected])
    // if(loading && !appointments) {
    //     <div className='flex justify-center align-middle items-center w-full h-screen'>
    //         <Spin size="large" />
    //     </div>
    // }
    return (
        <>
        {
        loading  ? 
            <div className='flex justify-center align-middle items-center w-full h-screen'>
                <Spin size="large" />
            </div>
        :
        appointments?.length === 0 ? 
            <div className="text-green-300 font-semibold text-3xl flex justify-center mt-10 uppercase">You dont have any Canceled appointments</div>
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

export default Cancel
