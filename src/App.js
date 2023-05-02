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
import userWhite from "./assets/images/user-white.png";
import "./app.css";

const App = () => {
  const currentUser = useAuth();

  const [bio, setBio] = useState("");

  const [name, setName] = useState("");

  const [photoURL, setPhotoURL] = useState(userWhite);

  const [username, setUserName] = useState("");

  const [rerender, setRerender] = useState(false);

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
      }
    }, [1000]);
  }, [currentUser, bio, name, photoURL]);

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
          }}
        >
          <Nav />
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
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
