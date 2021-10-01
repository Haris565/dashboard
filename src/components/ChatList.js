import Avatar from "antd/lib/avatar/avatar"
import { UserOutlined } from '@ant-design/icons';
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/solid";


const ChatList = () => {
    return (
        <div className="flex w-full bg-white rounded-lg p-2 items-center justify-between cursor-pointer  mt-5">
            <div>
                <Avatar size={44} icon={<UserOutlined className='' />} />
                <span className='text-md font-medium text-center cursor-pointer ml-2'>Haris Naseem</span>
            </div>
             
              <div className='bg-white p-2 rounded-full cursor-pointer '>
                  <TrashIcon className='h-4 w-4 text-gray-500'/>
              </div>
        </div>
    )
}

export default ChatList
