import Navbar from "./components/navbar"
import useScript from "./components/jscdn"
import { getDocNames } from "./API/dbAPI";

// Import the Components for routing
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

// Import components
import Home from "./components/home";
import Newfile from "./components/newfile";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";

export default function App() {
  useScript()
  return(
    <div>
      {/* Bootsrtap CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newFile" element={<Newfile/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}