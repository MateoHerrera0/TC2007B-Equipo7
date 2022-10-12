import { Link } from 'react-router-dom';
import './home.css'
import upload from '../Images/upload.png'
import download from '../Images/download.png'
import instructions1 from '../Images/instruct1.png'
import instructions2 from '../Images/instruct2.png'
import Navbar from "./navbar"

export default function Home() {
  return(
    <div className='home'>
      <Navbar />
      <div className="section p-5">
        <div className="container p-5">
          <div className="row align-items-center">
            <div className="col-md-5 text-md-start text-center">
              <p className="title"><strong>Sube tus archivos</strong></p>
              <p className="lead fs-5">Haz click en el boton y guarda tus archivos
              escaneados</p>
              <Link to='/newFile'>
                <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Subir archivo</button>
              </Link>
            </div>
            <div className="col-md text-md-end text-center pt-md-0 pt-5">
              <p className="display-1"><img src={upload} alt='upload image' width='60%'/></p>
            </div>
          </div>
        </div>
      </div>

      <div className="section p-5">
        <div className="container p-5">
          <div className="row align-items-center">
            <div className="col-md-5 text-md-end text-center order-md-5">
              <p className="title"><strong>Busca archivos</strong></p>
              <p className="lead fs-5">Haz click en el boton y busca los archivos que necesites</p>
              <Link to='/search'>
                <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Buscar archivo</button>
              </Link>
            </div>
            <div className="col-md text-md-start text-center order-md-1 pt-md-0 pt-5">
              <p className="display-1"><img src={download} alt='search image' width='60%'/></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section p-5 mx-5'>
        <div className='container bg-white rounded-3 shadow'>
          <div className='row'>
            <div className="col-md-5 text-md-start text-center p-5">
              <p className="fs-1"><strong>¿Cómo subir mis archivos?</strong></p>
              <p className="fw-bold">Instrucciones:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 1</strong></p>
                  <p className='fw-lighter'>Ingresa a la sección de "subir archivos"</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 2</strong></p>
                  <p className='fw-lighter'>Ingresa los datos solicitados. Asegúrate de llenar bien los espacios</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 3</strong></p>
                  <p className='fw-lighter'>Da click en "subir" y revisa la confirmación de que tus datos fueron agregados correctamente</p>
                </li>
              </ul>
            </div>
            <div className="col-md text-md-end text-center p-5">
              <p className="display-1"><img src={instructions2} alt='search image' width='80%'/></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section px-5 mx-5'>
        <div className='container bg-white rounded-3 shadow'>
          <div className='row'>
            <div className="col-md-6 justify-content-start text-md-start text-center p-5 order-md-5">
              <p className="fs-1"><strong>¿Cómo buscar documentos?</strong></p>
              <p className="fw-bold">Conoce el sistema de búsqueda:</p>
              <ul className="list-group list-group-flush"> 
                <li className="list-group-item">
                    <p className="fs-3"><strong>Paso 1</strong></p>
                    <p className='fw-lighter'>Utiliza los filtros para encontrar rápidamente los expedientes que necesites, mediante expediente, materia, acto, estado, etc.</p>
                </li>
                <li className="list-group-item">
                    <p className="fs-3"><strong>Paso 2</strong></p>
                    <p className='fw-lighter'>Selecciona un expediente y haz click en el botón de "Folios" </p>
                </li>
                <li className="list-group-item">
                    <p className="fs-3"><strong>Paso 3</strong></p>
                    <p className='fw-lighter'>Utiliza los filtros para encontrar el documento y ¡descarga! </p>
                </li>
              </ul>
              
            </div>
            <div className="col-md text-md-start text-center p-5 order-md-1">
              <p className="display-1"><img src={instructions1} alt='search image' width='60%'/></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section px-5'>
        <div className='border-top'>
          <div className='text-center p-3'>
            <p className='fw-lighter'>Créditos</p>
          </div>
        </div>

      </div>
    </div>
  )
}