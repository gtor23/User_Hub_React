// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   return (
//     <div id="App">
//       <h1>Hello, World</h1>
//     </div>
//   );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );





// src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import {
  Header,
    UserPosts,
    UserTodos
} from './components';

import {
    getUsers,
    getPostsByUser,
    getTodosByUser // NEW
} from './api';

//NEW
import{getCurrentUser} from './auth'

const App = () => {
  const [userList, setUserList] = useState([]);

  // const [currentUser, setCurrentUser] = useState(null); // NEW
  const [currentUser, setCurrentUser] = useState(getCurrentUser()); // NEW

  
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]); // NEW

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        // something something errors
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      setUserTodos([]); // NEW
      return;
    }

    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        // something something errors
        console.error(error);
      });



    getTodosByUser(currentUser.id)
    .then(todos => {
        setUserTodos(todos);
    })
    .catch(error => {
        // something something errors
        console.error(error);
    });
    }, [currentUser]);


  // return (
  //   <div id="App">
  //     <Header 
  //       userList={ userList } 
  //       currentUser={ currentUser }
  //       setCurrentUser={ setCurrentUser } />
  //   {
  //       currentUser
  //       ? 
  //       <>
  //           <UserPosts
  //               userPosts={ userPosts }
  //               currentUser={ currentUser } />

  //           <UserTodos
  //               userTodos = {userTodos}
  //               currentUser = {currentUser} />
 
  //       </>
  //       : null
  //   }

  //   </div>
  // );


  return (
    <Router>
      <div id="App">
        <Header
          userList={ userList }
          currentUser={ currentUser }
          setCurrentUser={ setCurrentUser } />
        {
          currentUser
          ? <>
              <Switch>
                <Route path="/posts">
                  <UserPosts
                    userPosts={ userPosts }
                    currentUser={ currentUser } />
                </Route>
                <Route path="/todos">
                  <UserTodos
                    userTodos={ userTodos }
                    currentUser={ currentUser } />
                </Route>
                <Route exact path="/">
                  <h2 style={{
                    padding: ".5em"
                  }}>Welcome, { currentUser.username }!</h2>
                </Route>
                <Redirect to="/" />
              </Switch>
            </>
          : <>
              <Switch>
                <Route exact path="/">
                  <h2 style={{
                    padding: ".5em"
                  }}>Please log in, above.</h2>
                </Route>
                <Redirect to="/" />
              </Switch>
            </>
        }
      </div>
    </Router>
  );
}









ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// export { default as UserPosts } from './UserPosts'