import React from 'react'
import UserIcon from '../assets/icon/user.png' ; 
import ShoppingIcon from '../assets/icon/shopping.png' ;  
import SearchIcon  from '../assets/icon/searchpng.png' ; 


export default function Navbar() {
  return (
    <div className='flex justify-between bg-blue-800 items-center px-5 md:px-14 '>
        <div>
            <p className='text-white font-bold text-xl'>TEST</p>
        </div> 
        <div className=''> 
           <span  className='border-r-[1px] hidden md:inline  text-white text-sm font-bold pr-2'>
             Track Order
           </span>
           <span className='border-r-[1px] '>
           <img className='inline' src={SearchIcon} alt="" />
           </span>
           <span className='border-r-[1px]'>
             <img className='inline' src={UserIcon} alt="" />
           </span> 
           <span >
           <img className='inline' src={ShoppingIcon} alt="" />
           </span>

        </div>
    </div>  
  )
}
