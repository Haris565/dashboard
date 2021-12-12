import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {useState,useEffect, useRef} from 'react'
import ReactMapGL from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import { LocationMarkerIcon, PlusIcon} from "@heroicons/react/outline"
import { FilePond, registerPlugin } from "react-filepond";
import { Input, InputNumber, TimePicker, Layout, Modal, Row, Col, Image, Spin } from 'antd';
import SmallCard from '../components/SmallCard';
import { Space } from 'antd';

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import 'antd/dist/antd.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios"





// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);
const { Footer, Sider, Content } = Layout;

function Pakage() {

    const [loading, setloading] = useState(false)




    const [value, setvalue] = useState()
    const [price, setprice] = useState(0)


    const [offer, setoffer] = useState()
    const [profile, setprofile] = useState()


    const [service, setservice] = useState([])

    const fetchSalon = async ()=> {
        let res = await axios.get("http://localhost:5000/api/salon/getProfile")
        console.log(res)
        setprofile(res.data)
        setprice(res?.data?.package?.price)
        setvalue(res?.data?.package?.service)
        setloading(false)

    }

    useEffect(() => {
        console.log("Fetch Salon")
        setloading(true)

        fetchSalon()
    }, [])

    useEffect(() => {
      (async()=> {
          try {
              let data ={
                salon_id:"61acca2668e89a092453dc3d" 
            }
            let res = await axios.post(`http://arsalon.tech:1400/associativeRules`, data)
            console.log(res)
            setoffer(res.data)
            
          }
          catch(err){
              console.log(err)
          }
         
      })()
    }, [])


    const handlePackage =async () => {
        try {
            setservice([...offer[0].antecedents, offer[0].consequents])
            // offer[0].antecedents.map((item)=> setservice([...service, item]))
            // offer[0].consequents.map((item)=> setservice([...service, item]))
            let data = {
                service: service,
                price: price,
                profileId: profile._id
            }
            let res = await axios.post(`http://localhost:5000/api/salon/packageHandler`, data)
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDeactivate = async () => {
        try {
            setloading(true)
            let data = {
                profileId: profile._id
            }
            let res = await axios.post(`http://localhost:5000/api/salon/deactivatePackage`,data )
            if(res){
                fetchSalon()
            }
        }
        catch(err){

        }
    }

    const handleActivate = async () => {
        try {
            setloading(true)
            let data = {
                profileId: profile._id
            }
            let res = await axios.post(`http://localhost:5000/api/salon/activatePackage`,data )
            if(res){
                fetchSalon()
            }
        }
        catch(err){

        }
    }


    return (
        


        <Layout>
            <Navbar />
            <Layout>
                <Sider style={{backgroundColor:"#001529" , height: 'calc(100vh - 56px)'}}>
                    <Sidebar />
                </Sider>
                <Content style={{ height: 'calc(100vh - 56px)',backgroundColor:"#000C17", overflowY:"scroll"}} >
                    
             
                    <Row >
                        {
                            loading? 
                        <div className='flex justify-center align-middle items-center w-full h-screen'>
                            <Spin size="large" />
                        </div> 
                       
                        
                        :
                        <Col span={24} className="">
                            
                        <div className='max-w-7xl mx-auto flex flex-col flex-wrap align-middle content-center  '>
                    <h4 className="text-xl font-bold text-gray-500 mt-5 px-20"> 
                        Edit Your Services and package plan
                    </h4>
                    <div className='px-20 flex flex-col w-full'>
       
                    </div>

                    
          
       
                    <div>
                        {profile?.package && profile?.package.service.length > 0 ?
                                       <div class="w-10/12 md:w-7/12 lg:6/12 mx-auto relative py-20">
                                       <h1 class="text-3xl text-center font-bold text-blue-500">{profile?.package.status === true ? "You have one active package": "you have one Deactivated package"}</h1>
                                       <div class="border-l-2 mt-10">
                                           <div class="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                               <div class="flex-auto">
                                                   {/* {offer && offer[0].antecedents.map((item)=>
                                                       <h1 class="text-xl text-white font-bold capitalize">{item}</h1>
                                                   
                                                   )}
                                                   {offer && offer[0].consequents.map((item)=>
                                                       <h1 class="text-xl text-white font-bold">{item}</h1>
                                                   )} */}
                                                    {profile.package && profile?.package.service.map((item)=>
                                                       <h1 class="text-xl text-white font-bold capitalize">{item}</h1>
                                                   
                                                   )}
                                                
                                               </div>
                                               <div className='flex flex-col m-5'>
                                                   <input type="text" value={price} onChange={(e)=>setprice(e.target.value)} name="" id="" placeholder="Add price" className='py-2  text-black rounded px-2 ml-3' />
                                                   
                                               </div>
                                               <div>
                                                   {profile?.package.status === true ?
                                                    <button onClick={handleDeactivate} class="text-center text-white bg-gray-500 px-5 py-2 rounded hover:text-gray-300">Deactivate</button>
                                                    :
                                                    <button onClick={handleActivate} class="text-center text-white bg-gray-500 px-5 py-2 rounded hover:text-gray-300">Activate</button>
                                                   }
                                                  
                                               </div>
                                             
                                              
                                           </div>
           
           
                                       </div>
                                   </div>:
                                                                <div class="w-10/12 md:w-7/12 lg:6/12 mx-auto relative py-20">
                                                                <h1 class="text-3xl text-center font-bold text-blue-500">Suggested Package for you to boast your sale</h1>
                                                                <div class="border-l-2 mt-10">
                                                                    <div class="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                                                        <div class="flex-auto">
                                                                            {offer && offer[0].antecedents.map((item)=>
                                                                                <>
                                                                                    
                                                                                    <h1 class="text-xl text-white font-bold capitalize">{item}</h1>
                                                                                 </>
                                                                            )}
                                                                            {offer && offer[0].consequents.map((item)=>
                                                                                <>
                                                                                   
                                                                                    <h1 class="text-xl text-white font-bold">{item}</h1>
                                                                                </>
                                                                            )}
                                                                       
                                                                         
                                                                        </div>
                                                                        <div className='flex flex-col m-5'>
                                                                            <input type="text" name="" id="" value={price} onChange={(e)=>setprice(e.target.value)} placeholder="Add price" className='py-2  text-black rounded px-2 ml-3' />
                                                                            
                                                                        </div>
                                                                        <div>
                    
                                                                            <button onClick={handlePackage} class="text-center text-white bg-gray-500 px-5 py-2 rounded hover:text-gray-300">Add</button>
                                                                         
                                                                           
                                                                        </div>
                                                                      
                                                                       
                                                                    </div>
                                    
                                    
                                                                </div>
                                                            </div>
                    
                        }
             
                    </div>
                    

                    {/* <div className='grid grid-cols-2 px-20 py-6 items-center'>
                        <div className='px-12'>
                            <p className='text-gray-500 font-semibold text-lg'>Suggested Package for you to boast your sales</p>
                        </div>
                 

                    </div>

                    <div>
                    <div className="flex justify-start  bg-transparent ">
                        <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border  shadow-xl">
                                    <div
                                    className="flex flex-row justify-between p-6 bg-gray-900 border-b  rounded-tl-lg rounded-tr-lg"
                                    >
                                        <p className="font-semibold text-white">Customize A Package</p>

                                    </div>
                            <div className="flex flex-col px-6 py-5 bg-gray-900">
     
                                <p className='text-white'>These items are selling together frequently</p>


                            <div className="flex flex-row items-center justify-between p-5 bg-gray-900 border border-gray-200 rounded shadow-sm"
                            >
                                <div className="flex flex-row items-center">
                    
                                    <div className="flex flex-col">
                                        {offer && offer[0].antecedents.map((item)=>
                                         <p className="font-semibold text-white">{item}</p>
                                        )}
                                           {offer && offer[0].consequents.map((item)=>
                                         <p className="font-semibold text-white">{item}</p>
                                        )}
                                       
                                    </div>
                                </div>
                                <Space direction="vertical">
                                    <InputNumber  addonAfter="$" defaultValue={100} />
                                </Space>
                            </div>
                        </div>
                        <div
                        className="flex flex-row items-center justify-between p-5 bg-gray-900 border-t  rounded-bl-lg rounded-br-lg"
                        >
                       
                        <button className="px-4 py-2 text-red-700 font-semibold bg-white rounded">
                            Activate
                        </button>
                        </div>
                    </div>
                    </div>
                    </div> */}
                    
                </div>
                        </Col>}
                     
                    </Row>
                </Content>
            </Layout>
        </Layout>
        // <div>
        //     <Navbar />
        //     <div className='grid grid-cols-5'>
        //         <div>
        //         <div className='flex flex-grow h-full fixed'>
        //             <Sidebar />
        //         </div>
        //         </div>
            
        //         <div className='col-span-4'>
        //             <div className='grid grid-cols-1'>
        //                 {/* ----------------------------------------------------------------------- */}



        //                 <div>
           
        //     <div className='grid grid-cols-3'>
        //     <div className='col-span-3'>

    
               
        //     </div>
 

        //     </div>

        // </div>



        //                 {/* --------------------------------------------------------------------------- */}
                        
        //                 <div></div>
                   

        //             </div>
                    
        //         </div>

        //     </div>
        // </div>
    )
}

export default Pakage

