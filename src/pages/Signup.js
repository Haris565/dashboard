import Header from "../components/Header"
import { UserIcon, LockClosedIcon} from "@heroicons/react/solid"
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {register} from "../redux/actions/auth";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
 
    const dispatch = useDispatch()
    const err= useSelector((state)=>state.auth.error)
  


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(email,password))
        err?.map((val,index)=>toast.error(`${val.msg}`,{
            toastId:index,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }))
    }


    console.log(err)
    console.log("----------------------------------------")
    console.log("----------------------------------------")
    console.log("----------------------------------------")
    console.log("----------------------------------------")
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
               
                              
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to create your account</h2>
     
                 
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
                            value={email}
                            onChange={(e)=>{setemail(e.target.value)}}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                        </div>
                        <div className='mt-8'>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e)=>{setpassword(e.target.value)}}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                        </div>
                    </div>

                    <div>
                        <button onClick={(e)=>handleSubmit(e)}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Sign up
                        </button>
                    </div>
                    </form>
                </div>
                </div>

           
        </div>
            
       
    )
}

export default Signup
