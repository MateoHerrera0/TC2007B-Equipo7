import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { fields } from "./fieldsSearch";
import Popup from "./popup";
//import * as ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';
import { GetButtonsSearch } from "./buttons";
import Navbar from './navbar'
import { changeStatus } from "../API/dbAPI";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import "./search.css";

const Search = (props) => {
    const [docType, setDocType] = useState({docType: "juicioNulidad"});
    const [visible, setVisible] = useState(false);
    
    const [data, setData] = useState([]);
      useEffect( ()=> {
        getData({docType: "juicioNulidad"});
      }, [])

    const getData = async (docJson) => {
      console.log(docJson);
      await axios.post('/api/getDocs', {... docJson, query:{ }, projection: {}})
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
    }

    const [dataState, setDataState] = React.useState()
    const [res, setResult] = React.useState(data);
    useEffect(() => { setResult(data)}, [data] );

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }

    function handleSubmit(event) {
      event.preventDefault();
      let formElem = document.querySelector("#changeStatusForm")
      changeStatus(formElem)
    }
  
    function submitForm(formId) {
      document.getElementById(formId).requestSubmit();
    }

    const nulidadFields = [
      fields.expediente, 
      fields.tja,
      fields.actor,
      fields.domicilio,
      fields.acto,
      fields.eGuarda,
      fields.materia,
      fields.demandado,
      fields.usuario
    ]

    const carpetaFields = [
      fields.eco,
      fields.denuciante,
      fields.imputado,
      fields.delito,
      fields.lugar,
      fields.objeto,
      fields.eGuarda,
      fields.usuario
    ]

    const [fieldsToUse, setFields] = useState(nulidadFields)
    const [extra, setExtra] = useState({})

    const filterOperators = {
        text: [
            { text: 'grid.filterContainsOperator', operator: 'contains'},
            { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain' },
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
            { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
            // { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            // { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' },
            // { text: 'grid.filterIsEmptyOperator', operator: 'isempty' },
            // { text: 'grid.filterIsNotEmptyOperator', operator: 'isnotempty' }
        ],
        numeric: [
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterGteOperator', operator: 'gte' },
            { text: 'grid.filterGtOperator', operator: 'gt' },
            { text: 'grid.filterLteOperator', operator: 'lte' },
            { text: 'grid.filterLtOperator', operator: 'lt' },
            { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
        ],
        date: [
            { text: 'grid.filterEqOperator', operator: 'eq' },
            { text: 'grid.filterNotEqOperator', operator: 'neq' },
            { text: 'grid.filterAfterOrEqualOperator', operator: 'gte' },
            { text: 'grid.filterAfterOperator', operator: 'gt' },
            { text: 'grid.filterBeforeOperator', operator: 'lt' },
            { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte' },
            { text: 'grid.filterIsNullOperator', operator: 'isnull' },
            { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
        ],
        boolean: [
          {text: "grid.filterEqOperator", operator: "eq"}
        ],
    };
    return (
        <div className="searchClass">
            <Navbar />
            <br></br> <h2 id="Titulo"> Búsqueda de Expedientes </h2>
            <GetButtonsSearch
              setFields = {setFields}
              setDocType = {setDocType}
              getData = {getData}
              nulidadFields = {nulidadFields}
              carpetaFields = {carpetaFields}
              nulidad = {props.usuario.nulidad}
              carpeta = {props.usuario.carpeta}

            /> 

            <LocalizationProvider language="es-ES"> 
              <br></br>
                <IntlProvider locale="es">
                <Grid
                    data={data}
                    style={{
                    height: "auto",
                    }}
                    sortable={true}
                    groupable={true}
                    filterable={true}
                    pageable={{
                    buttonCount: 4,
                    pageSizes: true
                    }}
                    onDataStateChange={onDataStateChange}
                    filterOperators={filterOperators}{...dataState}>
                    {fieldsToUse.map((value) => {
                      return( 
                      <GridColumn
                        field = {value.id} 
                        title = {value.label}
                      />
                    )})}
                    <GridColumn
                        field = "_id" 
                        title = "Folios"
                        cell = {(props) => 
                        <td>
                          <Link to="/searchFolio" state={{ expId: props.dataItem[props.field], docType: docType.docType }}>
                            <button type="button" className="btn btn-primary btn-sm">Folios</button>
                          </Link>
                        </td>}
                      />
                    <GridColumn
                        field = "_id" 
                        title = "Cambiar Estado"
                        cell = {(props) => 
                        <td>
                          <div className="text-center">
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => {setVisible(true); setExtra({ expId: props.dataItem[props.field], docType: docType.docType })}}>Cambiar</button>
                          </div>
                        </td>}
                      />
                  {/* <GridColumn field="expediente" title="Expediente" width="auto"/>
                  <GridColumn field="tja" title="Sala del TJA" width="auto"/>
                  <GridColumn field="actor" title="Actor" width="auto"/>
                  <GridColumn field="domicilio" title="Domicilio" width="auto"/>
                  <GridColumn field="acto" title="Acto" width="auto"/>
                  <GridColumn field="eJuridico" title="Estado Jurídico" width="auto"/>
                  <GridColumn field="eProcesal" title="Estado Procesal" width="auto"/>
                  <GridColumn field="materia" title="Materia" width="auto"/>
                  <GridColumn field="demandado" title="Demandado" width="auto"/>
                  <GridColumn field="usuario" title="Usuario" width="auto"/> */}
              </Grid>
            </IntlProvider>
          </LocalizationProvider>
          {/* <form onSubmit={(e)=> {
            e.preventDefault();
            getData()}}>
            <button type="submit">Get Info</button>
          </form>  */}
          <Popup 
            visible = {visible}
            setVisible = {setVisible}
            popupTitle = {"Acpetar cambios ?"}
            popupBody = {
              <form onSubmit={handleSubmit} id="changeStatusForm">
              <div className="mb-3">
                <label htmlFor="eGuarda" className="form-label">Ingresa aqui el nuevo estado del documento:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id={"eGuarda"} 
                  name={"eGuarda"} 
                  placeholder={"Ingresa el estado que guarda aqui..."}
                  required
                />
              </div>
              <input type="hidden" name="_id" id="_id" value={extra.expId}/>
              <input type="hidden" name="docType" id="docType" value={extra.docType}/>
            </form>
          }
            okFunction = {()=>submitForm("changeStatusForm")}
          />
        </div>
    )
}
    
export default Search;