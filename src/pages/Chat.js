import {useEffect, useState} from "react"
import { Col, Layout, Row, } from 'antd';
import {
   
    ArrowLeftOutlined 
  } from '@ant-design/icons'

import ChatList from './../components/ChatList';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'


const { Content } = Layout;
const Chat = () => {
    const [chats, setchats] = useState([])
    const user = useSelector(state => state.auth.user)
    const [selected, setselected] = useState()
    useEffect(() => {
        (async ()=> {
            try {
                let res = await axios.get(`http://localhost:5000/api/salon/getSalonConversations/${user.profileId}`)
                console.log("res", res.data)
                setchats(res.data)

            }
            catch (err){
                console.log(err)
            }
        })
        ()
    }, [user?.profileId])

    const clickHandler = (item) => {
        setselected(item)
    }
    
    return (
        <Layout>
            <Content className='bg-gray-900' style={{backgroundColor:"#000c17"}} >
                <Row>
                    <Col span={8} style={{}}>
                        <div className='border border-gray-500 h-full'>
                            <div className='w-full text-white my-3 mx-3'>
                                <Link to='/' className='flex space-x-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                    </svg>
                                    
                                    
                                </Link>
                            </div>
                            <div className="my-3 mx-3 ">
                                <div className="relative text-gray-600 focus-within:text-gray-800">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </span>
                                    <input aria-placeholder="Busca tus amigos o contacta nuevos" placeholder="Search Chat"
                                    className="py-2 pl-10 block w-full rounded bg-gray-600 outline-none focus:text-gray-700" type="search" name="search" required autocomplete="search" />
                                </div>
                            </div>
                            {/* <h2 className="text-gray-100 text-lg my-3 mx-3"></h2> */}
                            {chats && chats.length !== 0 ? 
                            <div className=' overflow-y-scroll scrollbar-hide'>
                                {chats.map((item,index)=><ChatList chat={item} key={index} clickHandler={clickHandler} />)}
                            </div>
                            :
                            <div>
                                <h1 className='text-white text-lg ml-5'>No chat exist</h1>
                            </div>
                            }
                        </div>

                    </Col>
                    <Col span={16} className='border-b border-r border-gray-500 h-screen bg-gray-900' style={{backgroundColor:"#000c17"}}>
  
                            {selected ? <Message chat ={selected} />:
                                <div>
                                    <h1 className="text-gray-300 text-2xl font-semibold text-center mt-1/2">Select chat to see msgs</h1>
                                </div>
                            } 

                    </Col>
                </Row>
            </Content>
        </Layout>

    )
}

export default Chat
