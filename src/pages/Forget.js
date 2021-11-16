import Header from "../components/Header"
import { LockClosedIcon } from '@heroicons/react/solid';
import { useState,useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function Forget() {
    const [email, setemail] = useState('')
    const [data, setdata] = useState("")


    const handleClick= (e) =>{
        e.preventDefault()
        axios.request({
            method: 'POST',
            url: `http://localhost:5000/api/salon/resetPassword`,
            data:{
                email:email
            }
          
          }).then((res)=>{ 
              console.log(res);
              setdata(res.data.withToken)
       
          
          }).catch((err)=>{
            const error = err.response.data
            console.log("api call unsucessfull",err);
          
            
          })
    }
    useEffect(() => {
        if(data){
            toast.success(`Check your email to reset your password `,{
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
    }, [data])

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
         
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-500">Enter Email to receive password reseting link</h2>
                 
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="text-sm text-gray-base w-full 
                            bg-gray-700
                            text-white
                            mr-3 py-5 px-4 h-2 border-2 
                            border-gray-700 rounded mb-2 outline-none"
                            placeholder="Email address"
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                        />
                        </div>
                        
                    </div>

          

                    <div>
                        <button onClick={(e)=>handleClick(e)} 
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                            Reset
                        </button>
                    </div>
                    </form>
                </div>
                </div>

           
        </div>


    )
}

export default Forget
