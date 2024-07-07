import React from 'react'

const EmptyCard = ({imageSRC}) => {
  return <>
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src={imageSRC} alt='لا توجد مهام' className='w-40' />
        
        <div className='w-1/2 font-medium text-slate-700 text-center leading-7 text-lg'>
        <div>
      <p className='mb-3 text-lg'>الحل المثالي لحفظ وتنظيم مهامك اليومية، بحيث يمكنك التركيز على الإنجازات الكبيرة بكل ثقة وأمان، مع ضمان الحفاظ على كل تفاصيل مهامك في مكان واحد.</p>
      <p className=''>أترك إدارة مهامك علينا ، و عليك الأبداع</p>
      <p className='text-xl font-semibold mt-2'>مهام منظمة إنجاز أكثر</p>
      <p className='mt-12 '> هيا ماذا تنتظر!</p>
    </div>
        </div>
    </div>
  
  </>
}

export default EmptyCard