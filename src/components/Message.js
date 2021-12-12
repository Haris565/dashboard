import { Avatar } from "antd"
import axios from "axios"
import moment from "moment"
import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import {io} from "socket.io-client"


const Message = ({chat}) => {
    const [member, setmember] = useState()
    const [text, settext] = useState([])
    const [content, setcontent] = useState('')
    const [arrivedmsg, setarrivedmsg] = useState()
    const user = useSelector(state => state.auth.user)
    const socket = useRef()
    const scrollRef = useRef();


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [text]);

    useEffect(() => {
        socket.current = io("http://localhost:5000/")
        socket.current.on("getMessage",({senderId, text})=>{
           
            setarrivedmsg(  (prev)=>({
                sender:senderId,
                text:text,
                createdAt: Date.now(),
            }))
        
        })
    }, []) 

    useEffect(() => {
    
        settext((prev)=>[...prev, arrivedmsg ])
    }, [arrivedmsg, chat])


    useEffect(() => {
        socket.current.emit("addUser", user.profileId);
        socket.current.on("getUsers", (users)=>{
            console.log(users)
        })
     
    }, [user])

    console.log(socket)


    



    useEffect(() => {
        (async()=>{
            let finded = chat?.members.find((m)=>m!==user?.profileId)
            console.log(finded)
            try {
                console.log("into the async")
                let res = await axios.get(`http://localhost:5000/api/user/getMessage/${chat._id}`)
                let sender =await axios.get(`http://localhost:5000/api/salon/findChatOtherUser/${finded}`)
                console.log("sender",sender.data)
                console.log(res.data)
                setmember(sender.data)
                settext(res.data)
            }
            catch(err){
                console.log(err)
            }
        })
        ()
    }, [chat?._id, user?.profileId])


    const onSendPress = async () => {
    
        try {
          let body = {
            conversationId: chat?._id,
            sender: user?.profileId,
            text:content
          }

          const receiverId = chat?.members.find((member)=>member!==user.profileId)

   
          console.log(body)
          let res =await axios.post(`http://localhost:5000/api/user/sendMessage`, body)
          socket?.current.emit('sendMessage', {
            senderId: user.profileId,
            receiverId,
            text:content
        })
          console.log(res.data)
          settext((prev)=>[...prev,res.data])
        }
        catch(err){
          console.log(err)
        }
        // send the message to the backend
    
        setcontent('');
      }

     
    return (


            <div className='flex flex-col justify-between h-full'>

            <div className="flex items-center border-b border-gray-600 pl-3 py-3">
            <div className="flex relative w-10 h-10 bg-green-500 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">{member?.name[0]} </div>
                <span className="block ml-2 font-bold text-base text-gray-100 capitalize">{member?.name}</span>
                <span className="connected text-green-500 ml-2" >
                    <svg width="6" height="6">
                        <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                    </svg>
                </span>
            </div>
            <div className='overflow-y-scroll h-full ' >


                
                    {text.map((item,index)=>{
                        
                        return (
                            <div ref={scrollRef} key={index} className={item?.sender === user?.profileId ? "w-full flex flex-col items-end content-end self-end " : "self-start content-start w-full flex flex-col  items-start "}>
                            <div className={item?.sender === user?.profileId ?"bg-green-600 rounded py-2 my-2 mx-5 text-white relative min-w-[300px] max-w-[300px]":"bg-gray-300 rounded py-2 my-2 mx-5 text-gray-700 relative min-w-[300px] max-w-[300px]" }>
                                <span className="block px-5">{item?.text}</span>
                                <span className="block text-xs text-right px-2">{moment(item?.createdAt).fromNow()}</span>
                            </div>
                             </div> 
                        )
                    })}
               

            </div>

            <div className="w-full py-3 px-3 flex items-center justify-end border-t border-gray-700">
                <button className="outline-none focus:outline-none">
                    <svg className="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    </button>
                    <button className="outline-none focus:outline-none ml-1">
                    <svg className="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    </button>

                    <input aria-placeholder="Escribe un mensaje aquí" placeholder="Write ..."
                    value={content}
                    onChange={(e)=>setcontent(e.target.value)}
                    className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text" name="message" required/>

                    <button className="outline-none focus:outline-none" onClick={onSendPress}>
                    <svg className="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>

            </div>
    )
}

export default Message
