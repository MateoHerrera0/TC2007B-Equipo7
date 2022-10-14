import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/register'

import { UserContext } from './app'
import Home from './components/home'
import Newfile from './components/newfile'
import Profile from './components/profile'
import Register from './components/register'
import Search from './components/search'
import SearchUsers from './components/userManagement'
import Navbar from './components/navbar'
import AdminNavbar from './components/adminNavbar'
import SearchDocument from './components/SearchDocument'
import EditUser from './components/editUser'

function RoutesComp() {
  const userContext = useContext(UserContext)
  console.log("el contexto",userContext);
  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: "", area: ""}
  )
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile')
        const userData = await res.json()
        setUserData(userData[0])
      } catch (error) {
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUser()
  }, [])
  return (
    <>
      <Routes>
        {userContext != null && user.userType == "Administrador" && (
        <>
          <Route path="/register" element={<Register />} />
          <Route path='/userManagement' element={<SearchUsers />} />
          <Route path='/' element={<SearchUsers />} />
          <Route path="/profile" element={<Profile usuario = {userContext} navbar = {<AdminNavbar />}/>} />
          <Route path='/editUser' element={<EditUser />} />
        </>
        )}
        {userContext != null && user.userType == "Usuario" && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/newFile" element={<Newfile />} />
          <Route path="/profile" element={<Profile usuario = {userContext} navbar = {<Navbar />}/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchFolio" element={<SearchDocument />} />
        </>
        )}
        {userContext == null && (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default RoutesComp