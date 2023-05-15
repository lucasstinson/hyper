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
import { getAllPosts } from "./firebase/posts";
import { getNotifications } from "./firebase/notifications";
import userWhite from "./assets/images/user-white.png";
import "./app.css";
import ChatRoom from "./pages/messages/components/ChatRoom";

const App = () => {
  const currentUser = useAuth();

  const [bio, setBio] = useState("");

  const [name, setName] = useState("");

  const [photoURL, setPhotoURL] = useState(userWhite);

  const [username, setUserName] = useState("");

  const [rerender, setRerender] = useState(false);

  const [notificationCount, setNotificationCount] = useState("");

  useEffect(() => {
    console.log("run app");
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
          } catch (error) {
            const errorMessage = error.message;
          }
        };
        loadNotifications();
      }
    }, [1000]);
  }, [currentUser, bio, name, photoURL]);

  // useState(() => {
  //   setTimeout(() => {
  //     console.log("notifications");
  //     if (currentUser) {
  //       console.log("notifications-currentuser");
  //       const notifications = async () => {
  //         try {
  //           const test = await getNotifications(currentUser.uid);
  //           setNotificationCount(test.count);
  //         } catch (error) {
  //           const errorMessage = error.message;
  //         }
  //       };
  //       notifications();
  //     }
  //   }, [2000]);
  // }, [currentUser]);

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
          }}
        >
          <Nav />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
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
};

export default App;
