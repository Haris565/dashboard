import {SearchIcon, MenuIcon, UserCircleIcon, UserIcon, GlobeAltIcon, LoginIcon} from "@heroicons/react/solid"

function Header() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-2 bg-gray-800 shadow-md py-5 px-5 md:px-10 ">

        <div className='relative flex items-center h-10 cursor-pointer my-auto'>
            {/* <img src="https://links.papareact.com/qd3" 
                width='60px' height="60px"
                                       
            /> */}
        </div>

        <div className='flex items-center justify-end space-x-4 text-gray-500'>
            <p className='hidden md:inline cursor-pointer text-white font-semibold'>Make your business grow with us</p>
            <GlobeAltIcon className='h-6 cursor-pointer text-white'  />

           
                <div className='flex items-center space-x-2 border-2 p-2 rounded-full text-white '>
                    <button>Login </button>
                    <MenuIcon className='h-6 cursor-pointer' />
                </div>
                <div className='flex items-center space-x-2 border-2 p-2 rounded-full text-white '>
                    <button>Signup </button>
                    <UserIcon className='h-6 cursor-pointer' />
                </div>
              
               
            
        </div>
        
    </header>
    )
}

export default Header
