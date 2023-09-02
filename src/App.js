import './App.css';
import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  
  useEffect(() => {
    fetchPosts();
    checkUser()
  }, []);
  
  async function fetchPosts() {
    try {
      const postData = await API.graphql({query: listPosts});
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log({err})
    }
  }
  
  async function checkUser() { 
    const user = await Auth.currentAuthenticatedUser();
    setCurrentUser(user.username);
    console.log('user:', user);
    console.log('user attributes:', user.attributes);
  }
  
  return (
    <div>
      <h1>Ampliyfoto</h1>
      Hello, {currentUser}
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))
      }
    </div>
  )
}

export default withAuthenticator(App);
