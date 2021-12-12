import React from 'react'
import { Layout } from 'antd';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from './../components/Navbar';
import  axios  from 'axios';
import { useHistory, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { loadUser } from './../redux/actions/auth';
import { useDispatch } from 'react-redux';


const {  Sider, Content } = Layout;


function Success() {
    const location = useLocation();
    const history = useHistory()
    const dispatch = useDispatch()
    
    let queryParams = new URLSearchParams(location.search)
    let session_id = queryParams.get("session_id")
    console.log(session_id)
  
    const submitHandler = async () => {
        try {
            let body = {
                session_id 
            }
            let res = await axios.post(`http://localhost:5000/api/salon/markPaymentDone`, body)
            if(res.data){
                dispatch(loadUser())
                history.push("/")
            }
        }
        catch(err){
            console.log(err)
        }
    }
  
      return (
  
          <Layout >
          
          <div>
              <Navbar />
          </div>
  
          <Layout>
       
              <Content style={{backgroundColor:"#000C17",}} className='h-screen'>
  
              <div className="bg-gray-700 h-screen">
      <div className="bg-gray-700 p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-white font-semibold text-center">Payment Done!</h3>
            <p className="text-white my-2">Thank you for completing your secure online payment.</p>
            <p className='text-white'> Have a great day!  </p>
            <div className="py-10 text-center">
                <button onClick={submitHandler}  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK 
               </button>
            </div>
        </div>
    </div>
  </div>
              </Content>
  
          </Layout>
      
      </Layout>  
    
  
  
  
       
  
    
  
      )
}

export default Success
