/* Code used to define routes within app depending in user context
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/
// Imports
import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
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
import ChangePass from './components/changePass'
import Setup from './components/setup'

// Routes component
function RoutesComp() {
  // Get user context --> user logged in
  const userContext = useContext(UserContext)
  // User data
  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: "", area: ""}
  )
  // Get user data from backend
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
  // Routes depending on user credentials (admin/user/not logged in)
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
          <Route path='/changePass' element={<ChangePass />} />
        </>
        )}
        {userContext != null && user.userType == "Usuario" && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/newFile" element={<Newfile usuario = {userContext}/>}/>
          <Route path="/profile" element={<Profile usuario = {userContext} navbar = {<Navbar />}/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchFolio" element={<SearchDocument />} />
        </>
        )}
        {userContext == null && (
          <>
            <Route path="/" element={<Login />} />
            <Route path='/api/setup' element={<Setup />}/>
          </>
        )}
      </Routes>
    </>
  )
}

export default RoutesComp