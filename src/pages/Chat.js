import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';
import { Col, Layout, Row, Divider } from 'antd';
import { Avatar, Image } from 'antd';
import {
    SendOutlined 
  } from '@ant-design/icons'

import ChatList from './../components/ChatList';
import Message from '../components/Message';

const { Header, Sider, Content } = Layout;

const Chat = () => {

    return (

        <Layout style={{   }}>
            <div>
            <Navbar />
            </div>
            
        <Layout>
            <Sider style={{backgroundColor:"#001529" , height: 'calc(100vh - 56px)'}} >
               
                <Sidebar />
                
                
            </Sider>
            <Content className='bg-white' style={{ height: 'calc(100vh - 56px)', backgroundColor:"#000C17"  }}>
                <Row>
                    <Col span={15} style={{  height: 'calc(100vh - 56px)', backgroundColor:"#000C17"  }}>
                        
                        <div className='flex flex-col justify-between h-full'>
                            <div className='overflow-y-scroll scrollbar-hide '>
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                
                        
                            </div>
                           
                            <div className='text-center '>
                                    <input type="text" name="" id="" className='w-8/12 p-2 my-5 mx-2 bg-gray-300 outline-none rounded-lg' placeholder="Type ...."/>
                                    <span className='cursor-pointer'> <SendOutlined style={{ fontSize: "16px", color: '#1890FF', textAlign:"center"  }} /></span>
                            </div>
                           
                        </div>

                    </Col>
                    <Col span={1}>
                        <Divider type='vertical' style={{height:"100%", width:'2px'}} />
                    </Col>
                    <Col span={8} style={{}}>
                        <div className=''>
                            <input type="text" name="" id="" placeholder="Search your contact" 
                                className='w-11/12 p-2 my-5 mx-2 bg-gray-300 outline-none rounded-lg'
                            />
                         
                            <div className='m-2 overflow-y-scroll scrollbar-hide'>
   
                                <ChatList />
                                <ChatList />
                                <ChatList />
                                <ChatList />
                       
                       
                                
                            </div>
                        </div>

                    </Col>
                </Row>
            </Content>
        </Layout>
        
      </Layout>
    )
}

export default Chat
