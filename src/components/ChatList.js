import Avatar from "antd/lib/avatar/avatar"
import { UserOutlined } from '@ant-design/icons';
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/solid";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from "axios";
import user from "../Images/account.png"


const ChatList = ({chat, clickHandler}) => {
    const [receiver, setreceiver] = useState()
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        (async () => {
            let finded = chat.members.find((m)=>m!==user.profileId)
            console.log(finded)
            try {
                let user =await axios.get(`http://localhost:5000/api/salon/findChatOtherUser/${finded}`)
                console.log(user.data)
                setreceiver(user.data)
            }
            catch(err){
                console.log(err)
            }
        })
        ()

    }, [chat?.members, user?.profileId])
    return (
        
        <div 
            onClick={()=>clickHandler(chat)}
            className="hover:bg-gray-500 border-b space-x-4 text-center border-gray-600 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-700 transition duration-150 ease-in-out">
            {receiver && receiver.image ? <img className="h-10 w-10 rounded-full object-cover"
                src={receiver?.image}
                alt="username" /> :
            
                <div className="flex relative w-10 h-10 bg-green-500 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">{receiver?.name[0]} </div>
            }
            <div className="w-full">
                <div className="flex justify-between">
                    <span className="block font-semibold text-base text-gray-100 capitalize">{receiver?.name}</span>
                </div>
                
            </div>
        </div>
    
    )
}

export default ChatList
