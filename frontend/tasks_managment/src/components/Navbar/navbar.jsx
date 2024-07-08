import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../ProfileCard/profileInfo';
import Logo from '../../assets/loogo.png';
import Searchbar from '../SearchBar/searchbar';

// receive 3 props needs for navbar
const Navbar = ({ userInfo, onSearchTask, clearSearchHandler }) => {

  // query writted by user for seach
  const [serachQuery, setSearchQuery] = useState('')

  // use from react-router-dom package to navigate between pages
  const navigate = useNavigate();

  // handle the logout process
  const logoutHandler = () => {
    // remove token from local storage when user logouted and the go back to login page
    localStorage.clear();
    navigate('/login')
  };

  // handle search process
  const searchHandler = () => {
    if (serachQuery) {
      onSearchTask(serachQuery)
    }
  };

  // when user click x icon ,led to clear search input field
  const onClearSearch = () => {
    setSearchQuery('');
    clearSearchHandler();
  };

  return <>
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <div className='flex justify-center items-center'>
        <img className='w-20' src={Logo}></img>
        <h2 className='text-xl font-medium text-black px-2  py-2'>إدارة المهام</h2>
      </div>

      <Searchbar
        value={serachQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value)
        }}
        searchHandler={searchHandler}
        onClearSearch={onClearSearch}

      />
      <ProfileInfo userInfo={userInfo} onLogout={logoutHandler} />
    </div>
    </>
};

export default Navbar