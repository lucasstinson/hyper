import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "./pages/nav/Nav";
import "./app.css";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <Routes>
          <Route />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
