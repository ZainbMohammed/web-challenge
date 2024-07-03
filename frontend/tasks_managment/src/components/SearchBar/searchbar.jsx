import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6';

import {IoMdClose} from 'react-icons/io';
const Searchbar = ({value, onChange, searchHandler , onClearSearch}) => {
  return <>
   <div className='w-80 flex items-center px-4 bg-slate-100 rounded-lg'>
    
    <input
        type='text'
        placeholder='بحث'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
    />

{value && (
        <IoMdClose className='text-xl text-state-500 cursor-pointer hover:text-black ml-3' onClick={onClearSearch}/> 

)}
    <FaMagnifyingGlass className='text-state-400 cursor-pointer hover:text-black' onClick={searchHandler}/> 
  </div>
  
  </>

  
}

export default Searchbar