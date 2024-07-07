import React from 'react'
import { initName } from '../../utils/helper'

const ProfileInfo = ({userInfo,onLogout}) => {
    
    if (!userInfo) {
        return null; // Or handle the case where userInfo is not available
      }
    
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-semibold bg-slate-100'>
            {userInfo.fullName ? initName(userInfo.fullName) : 'Loading...'}
            </div>

            <div>
                <p className='text-sm font-medium'>{userInfo.fullName}</p>
                <button className='text-sm text-slate-700 underline pt-2 hover:text-blue-500' onClick={onLogout}>تسجيل الخروج</button>
            </div>

        </div>
    )
}
export default ProfileInfo