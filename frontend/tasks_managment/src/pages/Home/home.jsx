import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import TaskCard from '../../components/TaskCard/taskCard';
import Add_EditTask from './add_editTask';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastNotify/toast';
import EmptyCard from '../../components/EmptyCard/emptyCard';
import AddTaskImage from '../../assets/add-task.png';
import NoSearchResult from '../../assets/obs.png';
import Slogan from '../Login/slogan';

const Home = () => {

  // for switch between add & edit modle
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  // to show toast notification if the process done successe or not
  const [showToastNotify, setShowToastNotify] = useState({
    isShown: false,
    type: 'add',
    message: ''
  })

  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  // handle show toast notification
  const showToastNotifying = (message, type) => {

    setShowToastNotify({
      isShown: true,
      type: type,
      message: message
    });
  };

  // handle close toast notification
  const toastCloseHandler = () => {
    setShowToastNotify({
      isShown: false,
      message: ''
    });
  };

  // make a model => edit
  const editHandller = (taskInfo) => {

    setOpenAddEditModel({ isShown: true, data: taskInfo, type: 'edit' })
  }

  // request for get user info
  const getUserInfo = async () => {
    try {

      const response = await axiosInstance.get('users/get-user-info');
      if (response.data && response.data.user) {

        // when request successful then assign response data to userInfo
        setUserInfo(response.data.user);
      }

    } catch (error) {

      if (error.response.status === 401) {
        localStorage.clear();
        navigate();
      }
    }
  };

  // requesr for fetch tasks
  const fetchTasks = async () => {
    try {

      const respons = await axiosInstance.get('/tasks');
      if (respons.data && respons.data.tasks) {

        // when request successful then assign response data to tasks
        setTasks(respons.data.tasks)
      }

    } catch (error) {
      console.log('uncepected error');
    }
  }

  // request for delete Task
  const deleteTask = async (taskInfo) => {

    // get taske id wnat to deleted it
    const taskId = taskInfo._id;
    try {
      const response = await axiosInstance.delete(`/tasks/delete-task/${taskId}`);
      if (response.data && !response.data.error) {

        // when request successful that mean the task deleted 
        showToastNotifying('تمت حذف المهمة بنجاح', 'delete');
        fetchTasks();
      }
    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        console.log('uncepected error');
      }
    }
  }

  // request for search for a task
  const onSearchTask = async (query) => {
    try {

      const response = await axiosInstance.get('/tasks/search-task', {
        params: { query },
      });

      if (response.data && response.data.tasks) {

        // when request successful then assign isSearch = true & tasks = (returned data from request)
        setIsSearch(true);
        setTasks(response.data.tasks)
      }

    } catch (error) {
      console.log(error);
    }
  };

  // request for update isComplete
  const updateIsComplete = async (taskInfo) => {

    // get taske id wnat to update it
    const taskId = taskInfo._id;
    try {
      const response = await axiosInstance.put(`/tasks/update-isComplete-task/${taskId}`, {
        isComplete: !taskInfo.isComplete,
      });

      if (response.data && response.data.task) {
        showToastNotifying('تمت إنجاز المهمة بنجاح');
        fetchTasks();
      }
    } catch (error) {
      console.log('error');
    }
  }

  // when user click on X button that mean there is no query to search, so set isSearch = false
  const clearSearchHandler = () => {

    setIsSearch(false);
    fetchTasks();
  }

  // useEffect hook to fetch tasks and user info once when the component mounts.
  useEffect(() => {
    fetchTasks();
    getUserInfo();
    return () => { };
  }, [])

  // when click close button switch add model
  const onClose = () => {
    setOpenAddEditModel({ isShown: false, type: 'add', data: null })
  }

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchTask={onSearchTask}
        clearSearchHandler={clearSearchHandler}
      />

      <div className='container mx-auto'>
        {tasks.length > 0 ? (<div className='grid grid-cols-3 gap-4 m-8'>

          {tasks.map((item) => {

            return <TaskCard
              key={item._id}
              title={item.title}
              data={item.createAt}
              details={item.details}
              isComplete={item.isComplete}
              onEdit={() => { editHandller(item) }}
              onDelete={() => { deleteTask(item) }}
              onComplete={() => { updateIsComplete(item) }}

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
  )
};

export default Home