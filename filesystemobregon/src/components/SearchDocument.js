/* Code used to define search folio interface and to allow users to search a folio within an expediente
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Imports
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import { useLocation } from 'react-router-dom';
import './searchDocument.css'

// Function to search document
export default function SearchDocument() {
  // Remember expediente
  const location = useLocation()
  const { expId, docType } = location.state

  // Get data
  const [data, setData] = useState([]);
      useEffect( ()=> {
        getData(expId);
      }, [])
    // Function to call backend for data
    const getData = async (query) => {
      await axios.post('/api/getFolios', {query: query})
      .then(response => {
        setData(response.data);
      })
    }

    // Download a file --> call backend 
    const download = async (id, name, docType) => {
      await axios.post('/api/descargarFolio', {_id: id, docType: docType}, {
        responseType: 'blob',
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name  + ".pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
    })
    }

    // Set result
    const [dataState, setDataState] = React.useState()
    const [res, setResult] = React.useState(data);
    useEffect(() => { setResult(data)}, [data] );

    // Handle data state changes
    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(data, event.dataState));
    }

    // Define filter operators
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
    // Render search folio interface
    return (
        <div className="searchDoc">
            <Navbar />
            <br></br> <h2 id="Titulo"> Búsqueda de Folios </h2> 

            <LocalizationProvider language="es-ES"> 
              <br></br>
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
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => download(props.dataItem[props.field], props.dataItem["nombre"], docType)}>Descargar</button>
                          </td>}
                      />
                    
              </Grid>
            </IntlProvider>
          </LocalizationProvider>
          <br></br>
          <br></br>
          <td>
            <Link to="/search">
                <button type="button" className="btn btn-primary btn-sm">Regresar a Expedientes</button>
            </Link>
          </td>
        </div>
    )
}