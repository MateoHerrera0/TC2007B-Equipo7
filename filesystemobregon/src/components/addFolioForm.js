import { useState, useReducer } from "react";
import { fields, Field } from "./fields"

function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function PutFolio() {
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
    setFile(null)
    document.querySelector("#file").value = null;
  }

  const usuario = 'getusuario'

  const fieldsToUse = [
    fields.folio,
  ]

  return(
     <div className="section p-5">
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
