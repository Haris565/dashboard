import React, { useState } from "react";
import { Table, Divider, Tag, Pagination, Row, Col, Calendar } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Layout } from 'antd';
import { SearchIcon, CalendarIcon } from "@heroicons/react/solid";

const { Sider, Content } = Layout;


const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>
  },
  {
    title: "Contact",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Email",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Services",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Complete</a>
        <Divider type="vertical" />
        <a>Reject</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

const pageSize = 3;

const getData = (current, pageSize) => {
  // Normally you should get the data from the server
  return data.slice((current - 1) * pageSize, current * pageSize);
};

// Custom pagination component
const MyPagination = ({ total, onChange, current }) => {
  return (
    <Pagination
      onChange={onChange}
      total={total}
      current={current}
      pageSize={pageSize}
    />
  );
};




function Appointments() {

    
  const [current, setCurrent] = useState(1);
  const [show, setshow] = useState(false)
    

    function onPanelChange(value, mode) {
      console.log(value, mode);
    }
    return ( 
      <Layout style={{backgroundColor:"#000C17"}}>
      <Navbar />
      <Layout>
        <Sider  style={{backgroundColor:"#000C17",height: 'calc(100vh - 56px)'}}>
        <Sidebar />
        </Sider>
        <Content className="mx-5" style={{backgroundColor:"#fff",height:'calc(100vh - 56px)', overflowY:"scroll" }}>

          <Row>
            <Col span={8} className='mt-5'>
              
            <CalendarIcon 
              className='h-8 w-8 text-gray-400 cursor-pointer hover:scale-105 transition transform duration-200 ease-out ml-5' 
              onClick={()=>setshow(!show)} 
            />

            {show && 
              <div className="w-full border-2 border-gray-500">
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                <div className='my-2'>
                  <button className="p-2 bg-gray-700 text-white rounded-lg ">Search</button>
                  <button className="p-2 bg-gray-700 text-white ml-2 rounded-lg">Cancel</button>
                  
                </div>
            
              </div>
            }
              </Col>
            <Col span={8} className='mt-5'></Col>
            <Col span={8} className=' items-center text-center align-middle justify-center mt-5'>
              <div className='flex flex-row align-middle justify-center items-center text-center bg-gray-300 rounded-sm w-9/12 mb-5'>
                  <input type="text" name="" id="" placeholder="Search your contact" 
                                className='w-8/12 p-2 bg-gray-300 outline-none rounded-sm'
                  />
                  <SearchIcon className="h-6 w-6 text-gray-900 rounded-full" />
              </div>
            </Col>
          </Row>
          <Row>
   
            <Col span={24}>

                    <Table
                        columns={columns}
                        dataSource={getData(current, pageSize)}
                        pagination={false}
                        
                    />

            </Col>
            <Col span={4} offset={20}>
                    <MyPagination
                        total={data.length}
                        current={current}
                        onChange={setCurrent}
                        
                    />
            </Col>
          
          </Row>
          

                    
               
                    
        </Content>
      </Layout>
      
    </Layout>

      );
}

export default Appointments
