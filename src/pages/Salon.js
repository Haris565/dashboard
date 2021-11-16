import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {useState,useEffect, useRef} from 'react'
import ReactMapGL from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import { LocationMarkerIcon, PlusIcon} from "@heroicons/react/outline"
import { FilePond, registerPlugin } from "react-filepond";
import { Input, InputNumber, TimePicker, Layout, Modal, Row, Col, Image, Spin } from 'antd';
import SmallCard from '../components/SmallCard';


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

function Salon() {

    const [loading, setloading] = useState(false)

    const [image, setimage] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [number, setnumber] = useState('')
    const [address, setaddress] = useState()
    const [city, setcity] = useState('')


    const [value, setvalue] = useState()
    const [price, setprice] = useState(0)
    const [files, setFiles] = useState()
    const [services, setservices] = useState([])
    const [viewport, setviewport] = useState({
       
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const inputRef = useRef(null)

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
        setservices((prevState)=>{
            return (
            [...prevState, {service: value , price: price}]
        )})
        setIsModalVisible(false);
        setvalue('')
        setprice(0)
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
        setvalue('')
        setprice(0)
    };

    const removeItem = (name) => {
        let newState = services.filter((item)=>item.service!=name);
        setservices(newState)
    }



    useEffect(() => {
        console.log("Fetch Salon")
        setloading(true)
        const fetchSalon = async ()=> {
            let res = await axios.get("http://localhost:5000/api/salon/getProfile")
            console.log(res)
            setimage(res.data.image)
            setservices(res.data.services)
            setnumber(res.data.number)
            setname(res.data.name)
            setdescription(res.data.description)
            setaddress(res.data.address.address)
            setcity(res.data.address.city)
            setviewport({
                latitude: res.data.location.coordinates[0],
                longitude:  res.data.location.coordinates[1],
                zoom: 16
            })
            setloading(false)

        }
        fetchSalon()
    }, [])


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
                        Edit Your Profile
                    </h4>
                    <div className='px-20 flex flex-col w-full'>
                        <div>
                            <img
                                className="w-full h-36 object-cover"
                                preview={false}
                                src={image}
                                // src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                                alt="Your"
                            />
                        </div>

                        {/* <div className="">
                            <FilePond
                                files={files}
                                allowMultiple={false}
                                onupdatefiles={setFiles}
                                labelIdle='<span class="filepond--label-action" style={{backgroundColor:"black"}}>Upload Pic</span>'
                                
                            />
                            
                        </div> */}
                    </div>

                    
          
                    <div className='flex flex-col items-center w-full px-20 mt-5'>
                        <input
                        type="text" placeholder="Your Business Name" 
                        value={name}
                        class="text-sm text-gray-base w-full 
                                bg-gray-700
                                text-white
                                mr-3 py-5 px-4 h-2 border-2 
                                border-gray-700 rounded mb-2 outline-none" 
                        />
                        <textarea name="" id="" cols="30" rows="10" placeholder="Describe Your Business"
                        value={description}
                        class="text-sm text-gray-base w-full 
                                mr-3 py-5 px-4  border-2 
                                bg-gray-700
                                text-white
                                border-gray-700 rounded mb-2 outline-none resize-none h-24" >

                        </textarea>
          
                        
                   
                        <input type="text" name="city" id="city" 
                        value={number}
                class="text-sm text-gray-base w-full 
                mr-3 py-5 px-4 h-2 border-2 
                bg-gray-700
                text-white
                border-gray-700 rounded mb-2 outline-none" placeholder="Phone number"   />   
                        
              
                <input type="text" name="street-address" id="street-address" autocomplete="street-address" placeholder="Enter your address"
                 value={address}
                 class="text-sm text-gray-base w-full 
                 mr-3 py-5 px-4 h-2 border-2 
                 bg-gray-700
                 text-white
                 border-gray-700 rounded mb-2 outline-none"  />
                                      
             
                        <input type="text" name="city" id="city" 
                        value={city}
                class="text-sm text-gray-base w-full 
                mr-3 py-5 px-4 h-2 border-2 
                bg-gray-700
                text-white
                border-gray-700 rounded mb-2 outline-none" placeholder="City"  />
                       
            

             
               
            
                    </div>
{/*                   
                    <div className='grid grid-cols-2 px-20 py-6'>
                        <div className='px-12'>
                            <p className='text-gray-500 font-semibold text-sm'>Reset your salons opening and closing time</p>
                        </div>
                        <div className='ml-auto'>
                            <TimePicker.RangePicker className='bg-gray-700' />
                        </div>

                    </div> */}
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-20'>
                        {services?.map((item, index)=>{
                        return(
                        <SmallCard key={index}  id={index} service={item.service} price={item.price} removeItem={removeItem} />
                        )})}
                    </div>
                    <div className='grid grid-cols-2 px-20 py-6 items-center'>
                        <div className='px-12'>
                            <p className='text-gray-500 font-semibold text-lg'>Add the services you provide</p>
                        </div>
                        <div className='flex '>
                            <button onClick={showModal}
                                className='ml-auto text-white font-bold bg-indigo-600 p-4 rounded-full cursor-pointer hover:scale-105 transition transform duration-200 ease-out'>
                                <PlusIcon className='h-8' />
                            </button>
                        </div>

                    </div>

               
                    <div className='h-80 mx-20'>
                        <ReactMapGL
                               mapStyle="mapbox://styles/haris12345/cks1jpw3a3c2o17qo51pcxjyj"
                            mapboxApiAccessToken="pk.eyJ1IjoiaGFyaXMxMjM0NSIsImEiOiJja3MxamtoZDEwMmJxMm5tZXkzeWI1YW02In0.D4tqetwrkn5HLrv7AYIMdQ"
                            {...viewport}
                            width="100%"
                            height="100%"
                            onViewportChange={(nextViewport)=>{
                                setviewport(nextViewport)
                                console.log(nextViewport)
                            }}
                        >
                                <Marker
                                    longitude={viewport?.longitude}
                                    latitude={viewport?.latitude}
                                    offsetLeft={-20}
                                    offsetTop={-10}
                                >

                                    <p role='img' aria-label='push-pin'>
                                        <LocationMarkerIcon className='h-8 bg-blue-300 text-black rounded-full p-2 cursor-pointer md:mx-2 animate-bounce' />
                                    </p>
                                </Marker>

                        </ReactMapGL>
                
            </div>
                    <div className='flex flex-grow px-20 mt-5 mb-5'>
                        <button className='text-white font-bold bg-indigo-600 p-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out w-full '>
                            Update
                        </button>
                    </div>
                    <>
                        <Modal title="Add Your Service" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Input placeholder="Service Name" value={value} onChange={(e)=>setvalue(e.target.value)} />
                            <Input suffix="PKR" value={price} onChange={e=>setprice(e.target.value)} />
                        </Modal>
                    </>
                    
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

export default Salon
