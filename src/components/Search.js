import { FaGithub } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search(props) {
  const [username, setUsername] = useState('');
  const [searchInfo, setSearchInfo] = useState('Welcome to GitHub Finder');
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the GitHub user before redirecting to the profile page
    try {
      const res = await 
        axios.get(`https://api.github.com/users/${username}`, props.options);
      if (res.status === 200) {
        // If valid, redirect to the profile page
        navigate(`/user/${username}`);
      }
    } catch (error) {
        if (error.response && error.response.status === 404) {
          setSearchInfo('User not found');
        } else {
          setSearchInfo('An error occurred');
      }
    }
  };

  return (
    <section>
      <div className='flex j-center'>
        <FaGithub className='github-icon'/>
      </div>
      <form onSubmit={handleSubmit} className='flex j-center'>
        <div className='input-wrap'>
          <div className='input-inner'>
            <input
              type='text'
              placeholder='User name'
              aria-label='User name'
              maxLength={20}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={inputRef}
            />
          </div>
        </div>
      </form>
      <p className='search-info'>{searchInfo}</p>
    </section>
  )
}

export default Search;
