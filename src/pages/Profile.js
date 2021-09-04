import {useState,useEffect} from 'react'
import ReactMapGL from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import Header from '../components/Header';
import { LocationMarkerIcon, PlusIcon} from "@heroicons/react/outline"
import { FilePond, registerPlugin } from "react-filepond";
import { Input, InputNumber, TimePicker } from 'antd';
import SmallCard from '../components/SmallCard';
import { Modal } from 'antd';

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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

function Profile() {
 
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
        navigator.geolocation.getCurrentPosition(function(position) {
                setviewport({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    zoom:16
                })
          });
    }, [])



    return (
        <div>
            <Header />
            <div className='grid grid-cols-3'>
            <div className='col-span-2'>
                <div className='max-w-7xl mx-auto flex flex-col flex-wrap align-middle content-center '>
                    <h4 className="text-xl font-bold text-gray-500 mt-5 px-20"> 
                        Setup Your Profile
                    </h4>
                    <div className='flex flex-col items-center w-full px-20 mt-5'>
                        <input
                        type="text" placeholder="Your Business Name" 
                        class="text-sm text-gray-base w-full 
                                mr-3 py-5 px-4 h-2 border-2 
                                border-gray-700 rounded mb-2 outline-none" 
                        />
                        <textarea name="" id="" cols="30" rows="10" placeholder="Describe Your Business"    
                        class="text-sm text-gray-base w-full 
                                mr-3 py-5 px-4  border-2 
                                border-gray-700 rounded mb-2 outline-none resize-none h-24" >

                        </textarea>
            
                    </div>
                    <div className='grid grid-cols-2 px-20 py-6'>
                        <div className='px-12'>
                            <p className='text-gray-500 font-semibold text-sm'>Enter your salons opening and closing time</p>
                        </div>
                        <div className='ml-auto'>
                            <TimePicker.RangePicker className='' />
                        </div>

                    </div>
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

                    <div className="px-20">
                        <FilePond
                            files={files}
                            allowMultiple={false}
                            onupdatefiles={setFiles}
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                    <div className='flex flex-grow px-20 mt-5'>
                        <button className='text-white font-bold bg-indigo-600 p-4 cursor-pointer hover:scale-105 transition transform duration-200 ease-out w-full '>
                            Submit
                        </button>
                    </div>
                    
                </div>
    
               
            </div>
            <div className=' xl:inline-flex xl:min-w-full h-screen'>
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

            </div>
            <>
                <Modal title="Add Your Service" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input placeholder="Service Name" value={value} onChange={(e)=>setvalue(e.target.value)} />
                    <Input suffix="PKR" value={price} onChange={e=>setprice(e.target.value)} />
                </Modal>
            </>
        </div>
      
            
        
    )
}

export default Profile
