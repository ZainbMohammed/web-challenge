import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import TaskCard from '../../components/TaskCard/taskCard';
import { MdAdd } from 'react-icons/md';
import Add_EditTask from './add_editTask';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'

const Home = () => {

  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: 'add',
    date: null
  });

  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    getUserInfo();
    return () => {};
  },[])

  const onClose = () => {
    setOpenAddEditModel({ isShown: false, type: 'add', date: null })
  }
  return <>
    <Navbar  userInfo={userInfo}/>

    <div className='container mx-auto'>
      <div className='grid grid-cols-3 gap-4 mt-8'>

        <TaskCard
          title='مقابلة عمل الساعة 8 صباحاً'
          date='9 July 2024'
          details='مقابلة عمل في شركة بوتفاي لوظيفه مبرمج تطبيقات الموبايل باستخدام فلتر'
          isPinned={true}
          onEdit={() => { }}
          onDelete={() => { }}
          onPined={() => { }}
        />

      </div>
    </div>
    <button className='w-10 h-10 flex items-center justify-center rounded-xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 ' onClick={() => {
      setOpenAddEditModel({ isShown: true, type: 'add', date: null })
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
        taskDate={openAddEditModel.date}
        type={openAddEditModel.type}
        onClose={onClose}
      />
    </Modal>
  </>
};

export default Home