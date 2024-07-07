import React, { useState } from 'react'
import ProfileInfo from '../ProfileCard/profileInfo'
import Logo from '../../assets/loogo.png'
import { useNavigate } from 'react-router-dom'
import Searchbar from '../SearchBar/searchbar'

const Navbar = ({ userInfo, onSearchTask, clearSearchHandler }) => {

  const [serachQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log('logout button cliked');
    localStorage.clear();
    navigate('/login')
  };
  const searchHandler = () => {
    if (serachQuery) {
      onSearchTask(serachQuery)

    }

  };

  const onClearSearch = () => {
    setSearchQuery('');
    clearSearchHandler(); 
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <div className='flex justify-center items-center'>
        <img className='w-20' src={Logo}></img>
        <h2 className='text-xl font-medium text-black px-2  py-2'>إدارة المهام</h2>
      </div>
      {/* <h2 className='text-xl font-medium text-black px-2  py-2'>إدارة المهام</h2> */}

      <Searchbar
        value={serachQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value)
        }}
        searchHandler={searchHandler}
        onClearSearch={onClearSearch}

      />
      <ProfileInfo userInfo={userInfo} onLogout={logoutHandler} />
      {/* {userInfo || <ProfileInfo userInfo={userInfo} onLogout={logoutHandler} />} */}
    </div>
  )
};

export default Navbar