import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import TaskCard from '../../components/TaskCard/taskCard'
import { MdAdd} from 'react-icons/md'

const Home = () => {
  return <>
    <Navbar />

    <div className='container mx-auto'>
      <div className='grid grid-cols-3 gap-4 mt-8'>

        <TaskCard
          title='مقابلة عمل الساعة 8 صباحاً'
          date='9 July 2024'
          content='مقابلة عمل في شركة بوتفاي لوظيفه مبرمج تطبيقات الموبايل باستخدام فلتر'
          isPinned={true}
          onEdit={() => { }}
          onDelete={() => { }}
          onPined={() => { }}
        />

      </div>
    </div>
    <button className='w-10 h-10 flex items-center justify-center rounded-xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 ' onClick={() => {}}>
      <MdAdd className='text-[32px] text-white font-thin'/>
    </button>
  </>
}

export default Home