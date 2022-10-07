import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/register'

import { UserContext } from './app'
import Home from './components/home'
import Newfile from './components/newfile'
import Profile from './components/profile'
import Register from './components/register'
import Search from './components/search'

function RoutesComp() {
  const userContext = useContext(UserContext)
  console.log("el contexto",userContext);
  return (
    <>
      <Routes>
        {userContext != {} && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/newFile" element={<Newfile />} />
          <Route path="/profile" element={<Profile usuario = {userContext} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
        </>
        )}
        {userContext == {} && (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default RoutesComp