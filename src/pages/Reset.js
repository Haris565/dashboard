import { LockClosedIcon } from '@heroicons/react/solid'
import React,{useState, useEffect} from 'react'
import Header from '../components/Header'
import {useParams} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Reset() {

    const [password, setpassword] = useState('')
    const [confirm, setconfirm] = useState('')
    const [response, setresponse] = useState('')
    const [error, seterror] = useState('')
    let { token } = useParams();


    useEffect(() => {
        if(response){
            toast.success(`Password updated please login to continue`,{
                toastId:'1',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [response])


    
    useEffect(() => {
        if(error){
            toast.error(`Cannot update password please try again`,{
                toastId:'2',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [error])

    const handleClick= (e) =>{
        e.preventDefault()
        console.log(token)
        axios.request({
            method: 'POST',
            url: `http://localhost:5000/api/salon/newPassword`,
            data:{
                password,
                token
            }
            
          }).then((res)=>{ 
              console.log(res);
              setresponse(res.data.errors[0])
       
          
          }).catch((err)=>{
            console.log(err.response.data.errors[0])
            seterror(err.response.data.errors[0])
           
          
          
            
          })
    }
    return (
        <div>
        <Header />
        <ToastContainer 
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover 
        />
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
     
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">Enter your new password</h2>
             
                </div>
                <div className="mt-8 space-y-6" >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
               
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="text-sm text-gray-base w-full 
                            bg-gray-700
                            text-white
                            mr-3 py-5 px-4 h-2 border-2 
                            border-gray-700 rounded mb-2 outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            className="text-sm text-gray-base w-full 
                            bg-gray-700
                            text-white
                            mr-3 py-5 px-4 h-2 border-2 
                            border-gray-700 rounded mb-2 outline-none"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e)=>setconfirm(e.target.value)}
                        />
                    </div>
                </div>

 

                <div>
                    <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e)=>handleClick(e)}
                    >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Reset
                    </button>
                </div>
                </div>
            </div>
            </div>

       
    </div>
    )
}

export default Reset
