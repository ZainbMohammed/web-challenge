import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const Add_EditTask = ({ taskInfo, type, fetchTasks, onClose, showToastNotifying }) => {

    // states to handle task info
    const [title, setTitle] = useState(taskInfo?.title || "");
    const [details, setDetails] = useState(taskInfo?.details || "");
    const [error, setError] = useState(null);


    // request for add new task 
    const addTask = async () => {
        try {

            const response = await axiosInstance.post('/tasks/add-task', {
                title,
                details,
            });

            if (response.data && response.data.task) {
                showToastNotifying('تمت إضافة المهمة بنجاح');
                fetchTasks();
                onClose();
            }

        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('هناك مشكبة حدثت, حاول مجدداً من فضلك');
            }
        }
    }

    // request for edit task
    const editTask = async () => {

        // get task it which want to edit
        const taskId = taskInfo._id;

        try {
            const response = await axiosInstance.put(`/tasks/edit-task/${taskId}`, {
                title,
                details,
            });

            if (response.data && response.data.task) {

                showToastNotifying('تمت تعديل المهمة بنجاح');
                fetchTasks();
                onClose();
            }
        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('هناك مشكبة حدثت, حاول مجدداً من فضلك');
            }
        }
    }

    // hanle user entries & switch between add-edit process
    const addTaskHandler = () => {
        if (!title) {
            setError('ادخل عنوان المهمة');
            return;
        }
        if (!details) {
            setError('ادخل تفاصيل المهمة');
            return;
        }

        setError('');

        if (type === 'add') {
            addTask()
        } else {
            editTask()
        }

    }

    return <>

        <div className='relative'>

            <button className='w-8 h-8 rounded-full flex items-center justify-center absolute -left-4 -top-8 hover:text-slate-950 ' onClick={onClose}>
                <MdClose className='text-xl text-slate-400 self-center' />
            </button>

            <div className='flex flex-col gap-2'>

                <label className='input-label text-xl font-medium'>عنوان المهمة</label>
                <input
                    type='text'
                    className='text-xs text-slat-950 outline-none mb-3'
                    placeholder='ادخل عنوان مهمتك'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
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
                    onChange={({ target }) => setDetails(target.value)}

                />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

            <button className='btn-primary font-medium mt-5 p-3' onClick={addTaskHandler}>
                {type === 'add' ? 'إضافة' : 'تعديل'}
            </button>
        </div>
    </>
}

export default Add_EditTask