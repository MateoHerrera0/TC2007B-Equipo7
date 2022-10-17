/* Code used to render addFolioForm and to allow users to add folios
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Import libraries
import { useState, useReducer } from "react";
import { putDocument } from "../API/dbAPI";
import { fields, Field } from "./fields"
import AsyncSelect from "react-select/async"
import Popup from "./popup";

// Reducer to determine what to display in form data --> reset or current state
function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  return {...state,
    [event.id]: event.value
  }
}

<<<<<<< HEAD
// Function to put folio
=======

>>>>>>> 143b0cfda95eac76d353b765174133bb6c562202
export default function PutFolio(props) {
  // Determine doctype (nulidad/investigacion)
  const [docType, setDocType] = useState(props.docType)
  const [visible, setVisible] = useState(false);


  if (docType != props.docType) {
    setDocType(props.docType)
  }

  //console.log(props.docType)
  // Call backend to get docs
  const fetchData = (inputValue, callback) => {
    setTimeout(() => {
        fetch('/api/getDocs', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
          'docType': docType, 
          'query': {"docID" : {$regex : inputValue}},
          'projection': {projection: {"docID": 1}}}),
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
              
            }
          }
          callback(tempArray);
        })
        .catch((error) => {
          console.log(error, "catch the hoop");
        });
    }, 2000);
  };

  // Form data
  const [formData, setFormData] = useReducer(reducer, {})
  
  // Handle changes in forms
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
  }

  // Handle submit
  function handleSubmit(event) {
    event.preventDefault();
    let formElem = document.querySelector("#folioForm")
    // Add folio
    putDocument(formElem, setFormData)
    document.querySelector("#file").value = null;
  }

  const usuario = 'getusuario'

  // Determine fields to render
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
          <input type="hidden" name="docType" id="docType" value={props.docType}/>
          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={() => setVisible(true)}>Subir Documento</button>
          </div>
        </form>
        <Popup 
          visible = {visible}
          setVisible = {setVisible}
          popupTitle = {"Favor de confirmar lo siguiente:"}
          popupBody = {<p>Estas seguro de que los datos ingresados son correctos y el arcivo esta listo para ser guardado?</p>}
          okFunction = {()=>props.submitForm("folioForm")}
        />
      </div>
     </div>
  )
}
