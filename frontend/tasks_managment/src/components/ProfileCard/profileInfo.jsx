import React from 'react'
import { initName } from '../../utils/helper'

const ProfileInfo = ({logoutHandler}) => {
    
    
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-semibold bg-slate-100'>
                {initName('زينب محمد')}
            </div>

            <div>
                <p className='text-sm font-medium'>زينب محمد</p>
                <button className='text-sm text-slate-700 underline pt-2 hover:bg-primary' onClick={logoutHandler}>تسجيل الخروج</button>
            </div>

        </div>
    )
}
export default ProfileInfo