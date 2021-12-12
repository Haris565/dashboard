import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import {SearchIcon, MenuIcon, UserCircleIcon, UserIcon, GlobeAltIcon, MenuAlt1Icon, LoginIcon} from "@heroicons/react/solid"
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';


function Navbar() {
    const dispatch = useDispatch()
    return (
        <header className="sticky top-0 z-50 grid grid-cols-2 bg-gray-800 shadow-sm py-2 px-5 md:px-10   ">

        <div className='relative flex items-center h-10 cursor-pointer my-auto '>
            <MenuAlt1Icon className='text-white h-6'/>
        </div>

        <div className='flex items-center justify-end space-x-4 text-gray-500'>
            <p className='hidden md:inline  cursor-pointer text-white font-semibold'>Make your business grow with us</p>
            <GlobeAltIcon className='h-6 cursor-pointer text-white'  />

                <div className='flex items-center space-x-2 border-2 p-2 rounded-full text-white '>
                    <UserIcon className='h-5 cursor-pointer' onClick={()=>dispatch(logout())} />
                </div>
              
               
            
        </div>
        
    </header>
    )
}

export default Navbar
