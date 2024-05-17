import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function User(props) {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://api.github.com/users/${username}`, props.options
      );
      setUser(res.data);
    };

    const getRepos = async () => {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`, props.options
      );
      setRepos(res.data);
    };

    getUser();
    getRepos();
  }, [username, props.options]);

  return (
    <>
      <section>
        <figure className='flex j-center'>
          <img 
            src={user.avatar_url} 
            alt={user.name} 
            className='user-profile-img'
          />
        </figure>
        <h1 className='user-profile-name'>{user.name}</h1>
        <div className='flex j-center stats'>
          <div>
            <p className='stats-highlight'>{user.public_repos}</p>
            <p className='stats-name'>repositories</p>
          </div>
          <div>
            <p className='stats-highlight'>{user.followers}</p>
            <p className='stats-name'>followers</p>
          </div>
          <div>
            <p className='stats-highlight'>{user.following}</p>
            <p className='stats-name'>following</p>
          </div>
        </div>
        <div className='flex j-center'>
          <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button>Go to GitHub</button>
          </a>
        </div>
      </section>
      <section>
        <div className='repo-list'>
          <h3>My repositories</h3>
          {repos.sort((a, b) => 
            new Date(b.updated_at) - new Date(a.updated_at)).map((repo) => {
              const formatDate = new Date(repo.updated_at).toLocaleDateString(
                'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <div key={repo.id} className='repo-list-container'>
                  <div className='flex space-between'>
                    <a
                      href={`https://github.com/${username}/${repo.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <h4 className='repo-name'>{repo.name}</h4>
                    </a>
                    <p className='repo-date'>Updated at {formatDate}</p>
                  </div>
                  <p className='repo-description'>{repo.description}</p>
                </div>
              );
            })
          }
        </div>
      </section>
    </>
  );
};

export default User;