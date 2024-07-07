import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md'
import moment from 'moment';


const TaskCard = ({
    title,
    date,
    details,
    isPinned,
    onEdit,
    onDelete,
    onPined
}) => {
    return <>
        <div className='border w-96 rounded-lg p-4 bg-white hover:shadow-xl  hover:scale-110 transition-all ease-in-out duration-200'>
            <div className='flex items-center justify-between'>

                <div>
                    <h6 className='text-sm font-medium'>{title}</h6>
                    <span className='text-xs text-slate-500'>{moment(date).format('Do MM YYYY')}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${isPinned} ? text-primary : text-slate-300`} onClick={onPined} />
            </div>
            <p className='text-xs text-slate-600 mt-2'>{details?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500'>tags</div>
                <div className='flex items-center gap-2'>
                    <MdCreate
                        className='icon-btn hover:text-green-600'
                        onClick={onEdit}
                    />
                    <MdDelete
                        className='icon-btn hover:text-red-600'
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>

    </>
}

export default TaskCard