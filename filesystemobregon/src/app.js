/* Code used for app definition
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Imports
import useScript from "./components/jscdn"
import { useState, useEffect, createContext } from "react";
import Routes from './Routes'

// Set user context
export const UserContext = createContext({})

// App function
export default function App() {
  // Detemine if page is loading
  const [loading, setLoading] = useState(true)
  // Define user session
  const [userSession, setUserSession] = useState(true)
  // Get user session from backend --> depending on existence of session
  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/sessionExists')
        if (!res.ok) return setLoading(false)
        console.log(res.ok)
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
  // Evaluate if loaded and render routes depending on user session
  return(
    <div>
      {/* Bootsrtap CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <UserContext.Provider value={userSession}>
        {loading ? <>loading...</> : <Routes />}
      </UserContext.Provider>
    </div>
  )
}