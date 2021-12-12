import { Layout } from 'antd';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from './../components/Navbar';

const {  Sider, Content } = Layout;



function Payment() {


  const [priceId, setpriceId] = useState('price_1JVM7YGHsDLdda7ZQpmvu3tt')

    return (

        <Layout >
        
        <div>
            <Navbar />
        </div>

        <Layout>
     
            <Content style={{backgroundColor:"#000C17",}} className='h-screen'>

            <div className="flex flex-col  w-3/6 md:h-56 bg-gray-500 mx-auto  rounded-lg shadow-lg overflow-hidden mt-28 md:flex-row">
                <div className="md:flex items-center justify-center md:w-2/3 md:bg-gray-500">
                    <div className="py-6 px-8 md:py-0">
                    <h2 className="text-white text-2xl font-bold md:text-white">
                        Basic Plan
                    </h2>
                    <p className="mt-2 text-white text-xl font-bold md:text-white">
                       The Plan that includes Everything
                    </p>
                    <p className="mt-2 text-white text-lg font-bold md:text-white">
                       Lets get started
                    </p>
                    </div>
                
                </div>
                <div className="flex flex-col items-center justify-center pb-6 md:py-0 md:w-1/3 md:border-b-8 bg-gray-200 border-white">
                    <div className="md:flex flex-col items-center justify-center  ">
                    <div>
                        <h2 className=" text-6xl md:text-5x1  font-bold  text-black">
                        $20 <span className="text-base text-gray-700 italic">per month</span>
                        </h2>
                    </div>
                    </div>
                    <div className="flex items-center justify-center w-full  ">
                    <p
                        className="mx-auto lg:mx-0 hover:underline bg-black text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                    >
                        Get started
                    </p>
                    
                    
                    </div>
                   
                    
                </div>
             </div>
            </Content>

        </Layout>
    
    </Layout>  
  



     

  

    )
}

export default Payment
