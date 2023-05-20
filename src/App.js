import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./firebase/firebase";
import Nav from "./pages/nav/Nav";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/messages/Messages";
import Notifications from "./pages/notifications/Notifications";
import SignUp from "./pages/signup/SignUp";
import LogIn from "./pages/login/LogIn";
import Footer from "./pages/footer/Footer";
import Settings from "./pages/settings/Settings";
import UserPost from "./pages/postThread/UserPost";
import { UserContext } from "./UserContext";
import { getProfileData } from "./firebase/users";
import { getNotifications } from "./firebase/notifications";
import { pendingMessages } from "./firebase/messages";
import userWhite from "./assets/images/user-white.png";
import "./app.css";
import ChatRoom from "./pages/messages/components/ChatRoom";

const App = () => {
  // gets status of current user, logged In | Not logged In
  const currentUser = useAuth();

  // Initial bio for a user
  const [bio, setBio] = useState("");

  // Initial name for a user
  const [name, setName] = useState("");

  // Initial photo for a user
  const [photoURL, setPhotoURL] = useState(userWhite);

  // Initial photo for a username
  const [username, setUserName] = useState("");

  // Additional flag that may be used to rerender
  const [rerender, setRerender] = useState(false);

  // Unread notificaiton count for users when they sign in
  const [notificationCount, setNotificationCount] = useState("");

  // Unread messageCount count for users when they sign in
  const [messageCount, setMessageCount] = useState("");

  // On Mount, if current User is a logged in user
  // load the profile, notification and message data
  // delay the run by 1 second to allow the current user to load
  useEffect(() => {
    setTimeout(() => {
      if (currentUser) {
        const loadProfileData = async () => {
          const profileData = await getProfileData(currentUser.uid);
          setPhotoURL(profileData.photoURL);
          setBio(profileData.bio);
          setName(profileData.name);
          setUserName(profileData.username);
        };
        loadProfileData();
        const loadNotifications = async () => {
          try {
            const notifications = await getNotifications(currentUser.uid);
            setNotificationCount(notifications.count);
          } catch (error) {}
        };
        loadNotifications();
        const loadMessages = async () => {
          try {
            const messages = await pendingMessages(currentUser.uid);
            setMessageCount(messages);
          } catch (error) {}
        };
        loadMessages();
      }
    }, [1000]);
  }, [currentUser, bio, name, photoURL]);

  // if a current user exists, allow the user to access specific routes
  // else restrict direct interaction with users.
  if (currentUser) {
    return (
      <div className="App">
        <HashRouter>
          <UserContext.Provider
            value={{
              currentUser,
              name,
              setName,
              bio,
              setBio,
              photoURL,
              setPhotoURL,
              username,
              setUserName,
              rerender,
              setRerender,
              notificationCount,
              setNotificationCount,
              messageCount,
              setMessageCount,
            }}
          >
            <Nav />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<ChatRoom />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile/:id/settings" element={<Settings />} />
              <Route path="/post/:id" element={<UserPost />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </HashRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <HashRouter>
          <UserContext.Provider
            value={{
              currentUser,
              name,
              setName,
              bio,
              setBio,
              photoURL,
              setPhotoURL,
              username,
              setUserName,
              rerender,
              setRerender,
              notificationCount,
              setNotificationCount,
              messageCount,
              setMessageCount,
            }}
          >
            <Nav />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<UserPost />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </HashRouter>
      </div>
    );
  }
  // return (
  //   <div className="App">
  //     <HashRouter>
  //       <UserContext.Provider
  //         value={{
  //           currentUser,
  //           name,
  //           setName,
  //           bio,
  //           setBio,
  //           photoURL,
  //           setPhotoURL,
  //           username,
  //           setUserName,
  //           rerender,
  //           setRerender,
  //           notificationCount,
  //           setNotificationCount,
  //           messageCount,
  //           setMessageCount,
  //         }}
  //       >
  //         <Nav />
  //         <Routes>
  //           <Route path="/" element={<Feed />} />
  //           <Route path="/signup" element={<SignUp />} />
  //           <Route path="/login" element={<LogIn />} />
  //           <Route path="/profile" element={<Profile />} />
  //           <Route path="/messages" element={<Messages />} />
  //           <Route path="/messages/:id" element={<ChatRoom />} />
  //           <Route path="/notifications" element={<Notifications />} />
  //           <Route path="/profile/:id/settings" element={<Settings />} />
  //           <Route path="/post/:id" element={<UserPost />} />
  //           <Route path="/profile/:id" element={<Profile />} />
  //         </Routes>
  //         <Footer />
  //       </UserContext.Provider>
  //     </HashRouter>
  //   </div>
  // );
};

export default App;
