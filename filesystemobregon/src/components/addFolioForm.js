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
  const [docType, setDocType] = useState(props.docType)

  if (docType != props.docType) {
    setDocType(props.docType)
  }

  console.log(props.docType)
  const fetchData = (inputValue, callback) => {
    setTimeout(() => {
        fetch('/api/getDocNames', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({'docID': inputValue, 'docType': docType}),
          method: "POST",
        })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          const tempArray = [];
          if (data) {
            if (data.length) {
              data.forEach((element) => {
                console.log(element);
                tempArray.push({
                  label: `${element.docID}`,
                  value: element._id,
                });
              });
            } else {
              tempArray.push({
                label: `${data.body}`,
                value: data.id,
              });
            }
          }
          callback(tempArray);
        })
        .catch((error) => {
          console.log(error, "catch the hoop");
        });
    }, 2000);
  };
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
    document.querySelector("#file").value = null;
  }

  const usuario = 'getusuario'

  const fieldsToUse = [
    fields.nombre,
    fields.folio,
  ]

  return(
     <div className="section p-5">
      <div className="container p-5 shadow rounded-3">
        <form onSubmit={handleSubmit} id="folioForm">
          <div className="mb-3">
            <label htmlFor="docID" className="form-label">Id del expediente o la carpeta</label>
            <AsyncSelect
              loadOptions={fetchData}
              defaultOptions={true}
              name = "proceeding"
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
