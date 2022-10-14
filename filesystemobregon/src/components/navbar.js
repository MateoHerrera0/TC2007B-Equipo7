import { useState } from 'react';
import { Link } from 'react-router-dom';
import AOLogo1 from '../Images/AOLogo1.png';

export default function Navbar() {
  const[expand, setExpand] = useState("collapse navbar-collapse");
  
  return(
    <div className=''>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" id='navLogo' href="/"> 
            <img src={AOLogo1} alt='Logo' width="260" className="d-inline-block align-text-top" /> 
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
                <button type="button" className="btn btn-primary btn-rounded d-flex flex-column align-items-center">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle d-none d-lg-block" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div>
                  <span className='text-center'>
                    Perfil
                  </span>
                </button>
                </Link>   
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
}