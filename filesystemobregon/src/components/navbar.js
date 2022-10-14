import { useState } from 'react';
import { Link } from 'react-router-dom';
import AOLogo1 from '../Images/AOLogo1.png';

export default function Navbar() {
  const[expand, setExpand] = useState("collapse navbar-collapse");
  
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
    <a className="navbar-brand" id='navLogo' href="/"> 
      <img src={AOLogo1} alt='Logo' width="260" height="115" class="d-inline-block align-text-top" /> 
    </a>
    
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
          <a className="nav-link active" aria-current="page" href="/home">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/newfile">Subir</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/search">Buscar</a>
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