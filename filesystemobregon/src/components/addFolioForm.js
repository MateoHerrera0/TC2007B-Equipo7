import { useState, useReducer } from "react";
import { putDocument } from "../API/dbAPI";
import { fields, Field } from "./fields"
import AsyncSelect from "react-select/async"

function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function PutFolio(props) {

  const data = props.data
  console.log(props.data);
  const loadOptions = (searchValue, callback) => {
    setTimeout( () => {
      const filteredOptions = data.filter((option) => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log('loadOptions', searchValue, filteredOptions);
      callback(filteredOptions)
    }, (2000));
  }

  const [formData, setFormData] = useReducer(reducer, {})
  
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector("#folioForm")
    putDocument(formElem, setFormData)
    console.log(formData);
    document.querySelector("#file").value = null;
  }

  const usuario = 'getusuario'

  const fieldsToUse = [
    fields.folio,
  ]

  return(
     <div className="section p-5">
      <div className="container p-5 shadow rounded-3">
        <form onSubmit={handleSubmit} id="folioForm">
          <div className="mb-3">
            <label htmlFor="docID" className="form-label">Selecciona uno de los documentos existentes mediante su id.</label>
            <AsyncSelect 
              loadOptions={loadOptions} 
              defaultOptions 
              name="docID"
              id="docID" 
              placeholder = "Ej: EJ-123820"
            />
          </div>
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
            <label htmlFor="fileFolio" className="form-label">Documento Escaneado</label>
            <input className="form-control" type="file" accept="*.pdf" id="fileFolio" name="fileFolio" required/>
          </div>
          <input type="hidden" name="usuario" id="usuario" value={usuario}/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}
