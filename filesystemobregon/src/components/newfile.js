import { useState, useReducer} from "react";
import { fields, Field } from "./fields"
import {addDocument} from "../API/dbAPI";
import Navbar from "./navbar";
import PutFolio from "./addFolioForm";


function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function Newfile(props) {
  

  const [formData, setFormData] = useReducer(reducer, {})
  
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }

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

  const [fieldsToUse, setFields] = useState(nulidadFields)
  const [docType, setDocType] = useState("juicioNulidad")
  const usuario = 'getusuario'

  return(
    <div className="newfile">
      <Navbar />
      <div className="section p-5">
        <div className="container">

          <p className="text-center fs-1"><strong>Selecciona un tipo de documento.</strong></p>
          <div className="row text-center p-5 gx-5">
            <div className="col d-grid">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => {setFields(nulidadFields); setFormData({reset: true}); setDocType("juicioNulidad")}}>Juicio de Nulidad</button>
            </div>
            <div className="col d-grid">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => {setFields(carpetaFields); setFormData({reset: true}); setDocType("carpetaInvestigacion")}}>Carpeta de Investigacion</button>
            </div>
          </div>
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
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}