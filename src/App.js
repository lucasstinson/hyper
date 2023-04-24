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
import { UserContext } from "./UserContext";
import { getProfileData } from "./firebase/firebase";
import userWhite from "./assets/images/user-white.png";
import "./app.css";

const App = () => {
  const currentUser = useAuth();

  const [bio, setBio] = useState("");

  const [name, setName] = useState("");

  const [photoURL, setPhotoURL] = useState(userWhite);

  const [username, setUserName] = useState("");

  const [rerender, setRerender] = useState(false);

  async function userData() {
    const profileData = await getProfileData();
    setBio(profileData.bio);
    setName(profileData.name);
    setUserName(profileData.username);
    if (currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }

  useEffect(() => {
    if (currentUser) {
      userData();
      console.log("setting user data");
    }
    console.log("run app");
  });

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
            <Route path="/" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </HashRouter>
    </div>
  );
};

export default App;
