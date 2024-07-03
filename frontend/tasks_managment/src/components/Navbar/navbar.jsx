import React from 'react'
import ProfileInfo from '../ProfileCard/profileInfo'
import Logo from '../../assets/loogo.png'

const Navbar = () => {
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      {/* <div className='flex justify-center items-center'>
        <img className='w-20' src={Logo}></img>
        <h2 className='text-xl font-medium text-black px-2  py-2'>إدارة المهام</h2>
      </div> */}
      <h2 className='text-xl font-medium text-black px-2  py-2'>إدارة المهام</h2>

      <ProfileInfo />
    </div>
  )
}

export default Navbar