import React from 'react';

// receive 2 props : the src of displayed image on EmptyCard & dynamic content of EmptyCard
const EmptyCard = ({ imageSRC, children }) => {

    return <>
        <div className='flex flex-col items-center justify-center mt-20'>
            <img src={imageSRC} alt='لا توجد مهام' className='w-32 mb-6 transition-all duration-100 
                                        hover:scale-110' />

            <div className='w-1/2 font-medium text-slate-700 text-center leading-7 text-lg'>
                {children}
            </div>
        </div>
    </>
}

export default EmptyCard