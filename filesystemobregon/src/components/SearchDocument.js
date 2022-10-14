import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { fields } from "./fieldsSearch";
//import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import { useLocation } from 'react-router-dom'

export default function SearchDocument() {
  const location = useLocation()
  const { expId } = location.state

  const [data, setData] = useState([]);
      useEffect( ()=> {
        console.log(expId);
        getData(expId);
      }, [])

    const getData = async (query) => {
      await axios.post('/api/getFolios', {query: query})
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
    }

    const download = async (id, name) => {
      await axios.post('/api/descargarFolio', {_id: id}, {
        responseType: 'blob',
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name  + ".pdf");
        document.body.appendChild(link);
        link.click();
    })
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
    return (
        <div>
            <Navbar />
            <br></br> <h2 id="Titulo"> Búsqueda de Folios </h2> 

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
                    <GridColumn
                        field = "folio" 
                        title = "Folio"
                      />
                    <GridColumn
                        field = "nombre" 
                        title = "Nombre"
                      />
                    <GridColumn
                        field = "_id" 
                        title = "Descargar Archivo"
                        cell = {(props) => 
                          <td>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => download(props.dataItem[props.field], props.dataItem["nombre"])}>Descargar</button>
                          </td>}
                      />
                    
              </Grid>
            </IntlProvider>
          </LocalizationProvider>
          <br></br>
          <td>
            <Link to="/search">
                <button type="button" className="btn btn-primary btn-sm">Regresar a Expedientes</button>
              </Link>
          </td>
        </div>
    )
}