/* Code used to define newfile interface and to allow users to upload a file
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

//imports
import { useState, useReducer, useEffect} from "react";
import { fields, Field } from "./fields"
import {addDocument} from "../API/dbAPI";
import GetButtons from "./buttons";
import Navbar from "./navbar";
import PutFolio from "./addFolioForm";
import "./newFile.css"

// Reducer to determine what to render in form data
function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  return {...state,
    [event.id]: event.value
  }
}

// Function for newfile
export default function Newfile(props) {
  // User data
  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: "", nulidad: false, investigacion: false}
  )
  // Set data to render in forms
  const [formData, setFormData] = useReducer(reducer, {})
  
  // Handle change (inputs)
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }

  // Get current profile --> fetch from backend
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
  
  // Handle submit
  function handleSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector("#newFileForm")
    // Call api to add document
    addDocument(formElem, setFormData);
    document.querySelector("#file").value = null;
}
  
  // Fields to display in nulidad
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

  // Fields to display in carpeta investigacion
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

  // Determine fields to use
  const [fieldsToUse, setFields] = useState(user.nulidad ? nulidadFields : carpetaFields);

  // Determine doctype
  const [docType, setDocType] = useState(user.nulidad ? "juicioNulidad" : "carpetaInvestigacion");
  
  // Define current user
  const usuario = user.email;

  // Render forms
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