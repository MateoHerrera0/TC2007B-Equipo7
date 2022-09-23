import { useState, useReducer } from "react";
import { fields, Field } from "./fields"
import {addDocument} from "../API/dbAPI";


function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function Newfile() {
  const [formData, setFormData] = useReducer(reducer, {})
  const [file, setFile] = useState()
  
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector("form")
    console.log("FORM DATA: " + formElem);
    addDocument(formElem, setFormData, file);
    setFile(null)
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
    fields.folio
  ]

  const carpetaFields = [
    fields.eco,
    fields.denuciante,
    fields.imputado,
    fields.delito,
    fields.lugar,
    fields.objeto,
    fields.eGuarda,
    fields.folio
  ]

  const [fieldsToUse, setFields] = useState(nulidadFields)
  const usuario = 'getusuario'

  return(
     <div className="section p-5">
        <p className="text-center fs-1"><strong>Para subir tus documentos, ingresa los datos necesarios</strong></p>
        <p className="text-center fs-5">Selecciona un tipo de documento.</p>
        <div className="row text-center p-5">
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={() => {setFields(nulidadFields); setFormData({reset: true})}}>Juicio de Nulidad</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={() => {setFields(carpetaFields); setFormData({reset: true})}}>Carpeta de Investigacion</button>
          </div>
        </div>
      <div className="container p-5 shadow rounded-3">
        <form onSubmit={handleSubmit}>
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
            <input className="form-control" type="file" accept="*.pdf" id="file" name="file" onChange={handleFileChange} required/>
          </div>
          <input type="hidden" name="usuario" id="usuario" value={usuario}/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}