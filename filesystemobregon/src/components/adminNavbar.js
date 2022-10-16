/* Code used to define admin interface navbar
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Function for admin navbar
export default function AdminNavbar() {
    // Allow expand
  const[expand, setExpand] = useState("collapse navbar-collapse");
  
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Alcaldía Álvaro Obregón</a>
    <button className="navbar-toggler" type="button" onClick={() => { 
      if(expand === "collapse navbar-collapse") {
        setExpand("collapse navbar-collapse show")
      } else {
        setExpand("collapse navbar-collapse")
      }
    }} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={expand} id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Manejo de usuarios</a>
        </li>
      </ul>
      <span>
      <div className="col-md-5 text-md-start text-center">
        <Link to='/profile'>
            <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Perfil</button>
        </Link>
        </div>
      </span>
    </div>
  </div>
</nav>
  )
}