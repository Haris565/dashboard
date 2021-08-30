import React, { useState } from "react";
import { Table, Divider, Tag, Pagination } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


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

const pageSize = 2;

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
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-5'>
            <div>
                <div className='flex flex-grow h-full fixed'>
                    <Sidebar />
                </div>
            </div>

            <div className='col-span-4'>

                <div className='mt-20 mr-10 flex flex-col'>

                    <Table
                        columns={columns}
                        dataSource={getData(current, pageSize)}
                        pagination={false}
                        
                    />
                    <div className='ml-auto'>
                    <MyPagination
                        total={data.length}
                        current={current}
                        onChange={setCurrent}
                        
                    />

                    </div>
       

                </div>
              
   
             
     
    
            </div>


        </div>
        </div>
       
      );
}

export default Appointments
