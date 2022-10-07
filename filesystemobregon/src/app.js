import Navbar from "./components/navbar"
import useScript from "./components/jscdn"
import { getDocNames } from "./API/dbAPI";

// Import the Components for routing
import { Route, Navigate} from 'react-router-dom';
import { useState, useEffect, createContext } from "react";
import Routes from './Routes'

// Import components
import Home from "./components/home";
import Newfile from "./components/newfile";
import Login from "./components/Login";
import Profile from "./components/profile";
import Register from "./components/register";
import Search from "./components/search";


export const UserContext = createContext({})


export default function App() {
  const [userData, setUserData] = useState();
  // Fetch the data when the page loads
  // useEffect(() => {
  //   getDocNames(setData);

  // }, [])
  // useScript()

  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState(true)
  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/sessionExists')
        if (res.ok == false) return setLoading(false)

        setUserSession(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])
  useScript()
  return(
    <div>
      {/* Bootsrtap CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <UserContext.Provider value={userSession}>
        {loading ? <>loading...</> : <Routes />}
      </UserContext.Provider>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newFile" element={<Newfile/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
        <Route path="/search" element={<Search />} />
      {/* </Routes> */}
    </div>
  )
}