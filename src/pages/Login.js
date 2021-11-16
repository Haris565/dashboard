import Header from "../components/Header"
import { UserIcon, LockClosedIcon} from "@heroicons/react/solid"
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import {login} from "../redux/actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Spin, Space } from 'antd'

import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';

function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()
    const err= useSelector((state)=>state.auth.error)
    const loading= useSelector((state)=>state.auth.loading)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    
    console.log("isAuthenticated", isAuthenticated)


    useEffect(() => {
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
        
    }, [err])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email===''){
            toast.error(`Email not valid`,{
                toastId:'email',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }) 
                return;
        }
        if(password===''){
            toast.error(`Password cant be less then 8`,{
                toastId:'password',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }) 
                return;
        }
        dispatch(login(email,password))
    
        
    }

    if(isAuthenticated){
        return(<Redirect to="/" />)
     }
    return (
       
        <div >
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">Login to your account</h2>
                </div>
                <form className="mt-8 space-y-6">
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
                        className="text-sm text-gray-base w-full 
                        bg-gray-700
                        text-white
                        mr-3 py-5 px-4 h-2 border-2 
                        border-gray-700 rounded mb-2 outline-none"
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
                        className="text-sm text-gray-base w-full 
                        bg-gray-700
                        text-white
                        mr-3 py-5 px-4 h-2 border-2 
                        border-gray-700 rounded mb-2 outline-none"
                        placeholder="Password"
                    />
                    </div>
                </div>
                <div className="flex items-center justify-between">
        

                    <div className="text-sm">
                        <Link to="/forgot" className="font-medium text-gray-500 no-underline ">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div>
                    <button onClick={(e)=>handleSubmit(e)}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-white group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    {loading ? <Spin />: "Login" }
                    
                    
                    </button>
                </div>
                </form>
            </div>
            </div>

       
    </div>
    )
}

export default Login



