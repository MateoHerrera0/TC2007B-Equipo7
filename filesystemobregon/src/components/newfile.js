import { useState, useReducer, useEffect} from "react";
import { fields, Field } from "./fields"
import {addDocument} from "../API/dbAPI";
import GetButtons from "./buttons";
import Navbar from "./navbar";
import PutFolio from "./addFolioForm";
import "./newFile.css"

function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function Newfile(props) {
  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: "", nulidad: false, investigacion: false}
  )
  const [formData, setFormData] = useReducer(reducer, {})
  
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }
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
  
  function handleSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector("#newFileForm")
    addDocument(formElem, setFormData);
    document.querySelector("#file").value = null;
}
  
  const nulidadFields = [
    fields.expediente, 
    fields.tja,
    fields.actor,
    fields.domicilio,
    fields.acto,
    fields.eJuridico,
    fields.eProcesal,
    fields.materia,
    fields.demandado,
    fields.nombre,
    fields.folio
  ]

  const carpetaFields = [
    fields.carpeta,
    fields.eco,
    fields.denuciante,
    fields.imputado,
    fields.delito,
    fields.lugar,
    fields.objeto,
    fields.eGuarda,
    fields.nombre,
    fields.folio
  ]

  const [fieldsToUse, setFields] = useState(user.nulidad ? nulidadFields : carpetaFields)

  const [docType, setDocType] = useState(user.nulidad ? "juicioNulidad" : "carpetaInvestigacion")
  
  const usuario = 'getusuario'

  return(
    <div className="newfile">
      <Navbar />
      <div className="section p-5">
        <div className="container">

          <p className="text-center fs-1"><strong>Selecciona un tipo de documento</strong></p> 
            <GetButtons 
              nulidad = {user.nulidad}
              carpeta = {user.investigacion}
              setFields = {setFields}
              setDocType = {setDocType}
              setFormData = {setFormData}
              nulidadFields = {nulidadFields}
              carpetaFields = {carpetaFields}
            />
          <p className="text-center fs-1"><strong>Si el expediente o la capeta ya existe, simplemente selecciona el documento correspondiente y sube el nuevo folio.</strong></p>
          <p className="text-center fs-5 pb-0 mb-0">Selecciona un documento existente.</p>
          <PutFolio docType = {docType} />
          <p className="text-center fs-1"><strong>O ingresa un documento completamente nuevo.</strong></p>
          <div className="container p-5 shadow rounded-3">
            <form onSubmit={handleSubmit} id="newFileForm">
              {fieldsToUse.map((value, index) => {
                let id = value.id
                return(
                  <Field
                    field = {value}
                    onChange = {handleChange}
                    key = {index}
                    value = {formData[id] || ""}
                  />
                )
              })}

              <div className="mb-3">
                <label htmlFor="file" className="form-label">Documento Escaneado</label>
                <input className="form-control" type="file" accept="*.pdf" id="file" name="file" required/>
              </div>
              <input type="hidden" name="usuario" id="usuario" value={usuario}/>
              <input type="hidden" name="docType" id="docType" value={docType}/>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Subir Documento</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}