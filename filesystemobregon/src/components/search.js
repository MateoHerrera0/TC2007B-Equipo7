import React from "react";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { fields } from "./fieldsSearch";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import "./search.css";

function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

const Search = () => {
    const [docType, setDocType] = useState({docType: "nulidad"});
    
    const [data, setData] = useState([]);
      useEffect( ()=> {
        getData({docType: "juicioNulidad"});
      }, [])

    const getData = async (docJson) => {
      console.log(docJson);
      await axios.post('/api/getDocs', {... docJson, query:{}, projection: {}})
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

    const [formData, setFormData] = useReducer(reducer, {})

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
        <div>
            <Navbar />
            <br></br> <h2 id="Titulo"> Búsqueda de Expedientes </h2> <br></br>
            <div className="row text-center p-5">
              <div className="col">
                <button type="button" className="btn btn-primary" onClick={
                  () => {
                    setFields(nulidadFields);
                    setFormData({reset: true});
                    setDocType({docType: "juicioNulidad"});
                    getData({docType: "juicioNulidad"});
                  }}>Juicio de Nulidad</button>
              </div>
              <div className="col">
                  <button type="button" className="btn btn-primary" onClick={
                    () => {
                      setFields(carpetaFields);
                      setFormData({reset: true});
                      setDocType({docType: "carpetaInvestigacion"});
                      getData({docType: "carpetaInvestigacion"});
                    }}>Carpeta de Investigacion</button>
              </div>
            </div>
            <br></br>

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
                        field = {fields.id}
                        title = {fields.label}
                      />
                    )})}
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
        </div>
    )
}
    
export default Search;