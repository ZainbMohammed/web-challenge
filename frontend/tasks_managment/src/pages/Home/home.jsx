import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import TaskCard from '../../components/TaskCard/taskCard';
import { MdAdd } from 'react-icons/md';
import Add_EditTask from './add_editTask';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastNotify/toast';
import EmptyCard from '../../components/EmptyCard/emptyCard';
import AddTaskImage from '../../assets/add-task.png';
import NoSearchResult from '../../assets/obs.png';
import Slogan from '../Login/slogan';
const Home = () => {

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  const [showToastNotify, setShowToastNotify] = useState({
    isShown: false,
    type: 'add',
    message: ''
  })


  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const editHandller = (taskInfo) => {

    setOpenAddEditModel({ isShown: true, data: taskInfo, type: 'edit' })
  }

  const showToastNotifying = (message, type) => {
    setShowToastNotify({
      isShown: true,
      type: type,
      message: message
    });
  };
  const toastCloseHandler = () => {
    setShowToastNotify({
      isShown: false,
      // type:'add',
      message: ''
    });
  };
  // get user info 
  const getUserInfo = async () => {
    // e.preventDefault();
    try {

      // Handle successful login
      const response = await axiosInstance.get('users/get-user-info');

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {

      // Handle failed login
      if (error.response.status === 401) {

        localStorage.clear();
        navigate();

      }
    }
  };

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const respons = await axiosInstance.get('/tasks');
      if (respons.data && respons.data.tasks) {
        setTasks(respons.data.tasks)
      }
    } catch (error) {
      console.log('uncepected error ,please try again');
    }
  }

  // delete Task
  const deleteTask = async (taskInfo) => {

    const taskId = taskInfo._id;
    try {
      const response = await axiosInstance.delete(`/tasks/delete-task/${taskId}`);

      if (response.data && !response.data.error) {
        showToastNotifying('تمت حذف المهمة بنجاح', 'delete');
        fetchTasks();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {

        console.log('uncepected error ,please try again');

      }
    }
  }

  // search for a task
  const onSearchTask = async (query) => {

    try {

      const response = await axiosInstance.get('/tasks/search-task', {
        params: { query },
      });
      if (response.data && response.data.tasks) {
        setIsSearch(true);
        setTasks(response.data.tasks)
      }

    } catch (error) {

      console.log(error);
    }
  };

  // update isPinned
  const updateIsPinned = async (taskInfo) =>{

    const taskId = taskInfo._id;
        try {
            const response = await axiosInstance.put(`/tasks/update-isPinned-task/${taskId}`, {
               isPinned: !taskInfo.isPinned,
            });

            if (response.data && response.data.task) {
                showToastNotifying('تمت تعديل المهمة بنجاح');
                fetchTasks();
            }
        } catch (error) {
            console.log('error');
        }
  }
  const clearSearchHandler = () => {

    setIsSearch(false);
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
    getUserInfo();
    return () => { };
  }, [])

  const onClose = () => {
    setOpenAddEditModel({ isShown: false, type: 'add', data: null })
  }
  return <>
    <Navbar
      userInfo={userInfo}
      onSearchTask={onSearchTask}
      clearSearchHandler={clearSearchHandler}
    />

    <div className='container mx-auto'>
      {tasks.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>

        {tasks.map((item) => {

          return <TaskCard
            key={item._id}
            title={item.title}
            data={item.createAt}
            details={item.details}
            isPinned={item.isPinned}
            onEdit={() => { editHandller(item) }}
            onDelete={() => { deleteTask(item) }}
            onPinned={() => { updateIsPinned(item)}}

          />
        })}
      </div>) :
        isSearch
          ? (<EmptyCard imageSRC={NoSearchResult} >لا توجد مهام مطابقة لما تبحث</EmptyCard>)
          : (<EmptyCard imageSRC={AddTaskImage} ><Slogan /></EmptyCard>)
      }
    </div>
    <button className='w-10 h-10 flex items-center justify-center rounded-xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 ' onClick={() => {
      setOpenAddEditModel({ isShown: true, type: 'add', data: null })
    }}>
      <MdAdd className='text-[32px] text-white font-thin' />
    </button>

    <Modal
      isOpen={openAddEditModel.isShown}
      onRequestClose={() => { }}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      }}
      contentLabel=''
      className='w-[35%] max-h-3/4 border rounded-3xl shadow-2xl bg-white px-7 py-10 mx-auto mt-24'
    // className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll '
    >

      <Add_EditTask
        taskInfo={openAddEditModel.data}
        type={openAddEditModel.type}
        fetchTasks={fetchTasks}
        onClose={onClose}
        showToastNotifying={showToastNotifying}
      />
    </Modal>

    <Toast
      isShown={showToastNotify.isShown}
      type={showToastNotify.type}
      message={showToastNotify.message}
      onClose={toastCloseHandler}
    />
  </>
};

export default Home