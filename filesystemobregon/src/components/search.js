import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//import * as ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import esMessages from "./filterMessages.json";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import "./search.css";

const Search = () => {
  const [data, setData] = useState([]);
    useEffect( ()=> {
      getData();
    }, [])

  const getData = async () => {
    const res = await axios.get('/api/getDocInfo')
    setData(res.data);
    console.log(data);
  }

  const [dataState, setDataState] = React.useState()
  const [res, setResult] = React.useState(data);
  useEffect(() => { setResult(data)}, [data] );

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(data, event.dataState));
  }

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

  //filterOperators={filterOperators};

  return(
    <div>
      <br></br> <h2 id="Titulo"> Búsqueda de Expedientes </h2> <br></br>
      <LocalizationProvider language="es-ES"> 
        <IntlProvider locale="es">
          <Grid
            data={res}
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
              <GridColumn field="expediente" title="Expediente" width="auto"/>
              <GridColumn field="tja" title="Sala del TJA" width="auto"/>
              <GridColumn field="actor" title="Actor" width="auto"/>
              <GridColumn field="domicilio" title="Domicilio" width="auto"/>
              <GridColumn field="acto" title="Acto" width="auto"/>
              <GridColumn field="eJuridico" title="Estado Jurídico" width="auto"/>
              <GridColumn field="eProcesal" title="Estado Procesal" width="auto"/>
              <GridColumn field="materia" title="Materia" width="auto"/>
              <GridColumn field="demandado" title="Demandado" width="auto"/>
              <GridColumn field="usuario" title="Usuario" width="auto"/>
          </Grid>
        </IntlProvider>
      </LocalizationProvider>
      <form onSubmit={(e)=> {
        e.preventDefault();
        getData()}}>
        <button type="submit">Get Info</button>
      </form> 
    </div>
  )
}

export default Search;