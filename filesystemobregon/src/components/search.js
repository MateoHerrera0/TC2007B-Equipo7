import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import esMessages from "./filterMessages.json";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider,loadMessages} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';

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

  return(
    <div>
      <h2> Búsqueda de Archivos </h2>
      <p> Selecciona un expediente para ver más detalles </p>
      <LocalizationProvider language="es-ES"> 
        <IntlProvider locale="es">
          <Grid
            data={data}
            style={{
              height: "700px",
            }}
            sortable={true}
            //groupable={true}
            filterable={true}
            pageable={{
              buttonCount: 4,
              pageSizes: true,
            }}
            onDataStateChange={onDataStateChange}
            filterOperators={esMessages}{...dataState}>
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
      {/* <form onSubmit={(e)=> {
        e.preventDefault();
        getData()}}>
        <button type="submit">Get Info</button>
      </form> */}
    </div>
  )
}

export default Search;