import {XIcon} from '@heroicons/react/outline'

function SmallCard({service , price , removeItem, id}) {
    return (
        <div className='flex m-2 mt-5 space-x-4 py-4 relative rounded-xl cursor-pointer bg-blue-600 hover:scale-105 transition transform duration-200 ease-out '>
           <div onClick={()=>{removeItem(service)}}>
                <XIcon className='h-4 absolute right-0 top-0 m-2 text-indigo-700 bg-white rounded-xl hover'/>
           </div>
           <div className='flex flex-grow justify-between mt-4'>
                <h2 className='text-white pl-2'>{service}</h2>
                <h3 className='text-white pr-4'>{price}</h3>
            </div>
        </div>
    )
}

export default SmallCard
