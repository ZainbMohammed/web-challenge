import React from 'react'

const EmptyCard = ({ imageSRC,children }) => {
    return <>
    <div className='flex flex-col items-center justify-center mt-20'>
            <img src={imageSRC} alt='لا توجد مهام' className='w-32 mb-6' />

            <div className='w-1/2 font-medium text-slate-700 text-center leading-7 text-lg'>
                {children}
            </div>
        </div>
    </>
        

    
}

export default EmptyCard