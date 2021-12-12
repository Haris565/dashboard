import { Layout } from 'antd';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from './../components/Navbar';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const {  Sider, Content } = Layout;



function Payment() {
    const history = useHistory();
    const user = useSelector(state => state.auth.user)

  const [priceId, setpriceId] = useState('price_1JVM7YGHsDLdda7ZQpmvu3tt')


  const submitHandler = async () => {
      try {
          let data = {
              priceId
          }
        let res = await axios.post(`http://localhost:5000/api/salon/checkout`, data)
        console.log(res.data.session)
        if(res.data?.session?.url)
        {
            window.location.href = (res.data?.session?.url) ;
            // history.push(res.data?.session?.url)
        }

      }
      catch(err){
          console.log(err)
      }
  }
  if(user?.paymentComplete===true){
    return (<Redirect to="/" />)
  }

    return (

        <Layout >
        
        <div>
            <Navbar />
        </div>

        <Layout>
     
            <Content style={{backgroundColor:"#000C17",}} className='h-screen'>

            <div className="bg-gray-700  text-white py-14">
    <h3 className="text-2xl tracking-widest text-indigo-600 text-center">A Great Experience
Is Priceless</h3>
    <h1 className="mt-8 text-center text-5xl text-indigo-600 font-bold">Start Your plan today</h1>


    <div className="md:flex md:justify-center md:space-x-8 md:px-14">

      <div className="mt-16 py-4 px-4 bg-whit w-72 bg-gray-400 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div className="w-sm">
          <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a17abde8d83650a582a28432/users-with-speech-bubbles-vector_53876-82250.jpg" alt="" />
          <div className="mt-4 text-indigo-600 text-center">
            <h1 className="text-xl font-bold">Easy Appointments</h1>
            <p className="mt-4 text-white">Pretium lectus quam id leo in vitae turpis. Mattis pellentesque id nibh tortor id.</p>
            <button  onClick={()=>submitHandler() } className="mt-8 mb-4 py-2 px-14 rounded-full bg-indigo-600 text-white tracking-widest hover:bg-indigo-500 transition duration-200">MORE</button>
          </div>
        </div>
      </div>

  
      <div className="mt-16 py-4 px-4 bg-whit w-72 bg-gray-400 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div className="w-sm">
          <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/3b242447f922540fbe750cab/fdf.jpg" alt="" />
          <div className="mt-4 text-indigo-600 text-center">
            <h1 className="text-xl font-bold">No time restriction</h1>
            <p className="mt-4 text-white">Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Risus feugiat.</p>
            <button  onClick={()=>submitHandler() } className="mt-8 mb-4 py-2 px-14 rounded-full bg-indigo-600 text-white tracking-widest hover:bg-indigo-500 transition duration-200">MORE</button>
          </div>
        </div>
      </div>

  
      <div className="mt-16 py-4 px-4 bg-whit w-72 bg-gray-400 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div className="w-sm">
          <img className="w-64" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg" alt="" />
          <div className="mt-4 text-indigo-600 text-center">
            <h1 className="text-xl font-bold">Cancel Anytime</h1>
            <p className="mt-4 text-white">Nisl purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris.</p>
            <button onClick={()=>submitHandler() } className="mt-8 mb-4 py-2 px-14 rounded-full bg-indigo-600 text-white tracking-widest hover:bg-indigo-500 transition duration-200">MORE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
            </Content>

        </Layout>
    
    </Layout>  
  



     

  

    )
}

export default Payment
