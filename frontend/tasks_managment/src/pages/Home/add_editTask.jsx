import React, { useState } from 'react'
import {MdClose} from 'react-icons/md'

const Add_EditTask = ({onClose}) => {

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    // const [title, setTitle] = useState('');

    return <>
        <div className='relative'>
            <button className='w-8 h-8 rounded-full flex items-center justify-center absolute -left-4 -top-8 hover:text-slate-950 ' onClick={onClose}>

                <MdClose className='text-xl text-slate-400 self-center'/>
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label text-xl font-medium'>عنوان المهمة</label>
                <input
                    type='text'
                    className='text-xs text-slat-950 outline-none mb-3'
                    placeholder='ادخل عنوان مهمتك'
                    value={title}
                    onChange={ ( {target}) => setTitle(target.value)}

                />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label text-xl font-medium'>تفاصيل المهمة</label>
                <textarea
                    type='text'
                    className='text-sm text-slat-950 outline-none bg-slate-50 p-2 rounded mb-3'
                    placeholder='ادخل تفاصيل مهمتك'
                    rows={4}
                    value={details}
                    onChange={ ( {target}) => setDetails(target.value)}

                />
            </div>
            <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>
                إضافة
            </button>
        </div>
    </>
}

export default Add_EditTask