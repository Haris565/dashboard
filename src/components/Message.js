import { Avatar } from "antd"

const Message = () => {
    const our = false
    return (
        <div className={our? 'flex flex-col bg-indigo-600 mx-5 my-2 w-6/12 rounded-xl justify-around py-4 object-contain text-white px-2': 
        'flex flex-col bg-gray-300 mx-5 my-2 w-6/12 rounded-xl justify-around ml-auto py-4 object-contain px-2'
        }>
            
            
                <span>Haris Hello how are you </span>
          
                <small className=" text-right">10m ago</small>
          
            
        </div>
    )
}

export default Message
