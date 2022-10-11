import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn } from "@progress/kendo-react-grid";
//import { DropDownList } from "@progress/kendo-react-dropdowns";
//import { GridPDFExport } from "@progress/kendo-react-pdf";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import "./search.css";
import { UserContext } from '../app';
import AdminNavbar from "./adminNavbar";

const SearchUsers = () => {
    const [data, setData] = useState([]);
      useEffect( ()=> {
        getData();
      }, [])
  
    const getData = async () => {
      const res = await axios.get('/api/getAllUsers')
      setData(res.data);
      console.log(data);
    }

    const gridUserSelectionChange = (gridUser, selection) => {
        // let selectedData = gridUser.data.data[selection.index];
        const selectedData = selection.selectedRows[0].dataItem;
        console.log(selectedData);
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
          
            <AdminNavbar />
            <br></br> <h2 id="Titulo"> Manejo de usuarios </h2> <br></br>
            <div className="row text-center p-5">
              <div className="col">
              <Link to='/register'>
                <button type="button" className="btn btn-primary btn-lg fw-bold">Agregar Usuario</button> </Link>
              </div>
            </div>
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
                    filterOperators={filterOperators}{...dataState}
                    selectionChange="gridUserSelectionChange(gridUser, $event)">
                  <GridColumn field="usuario" title="Usuario" width="auto"/>
                  <GridColumn field="email" title="Correo" width="auto"/>
                  <GridColumn field="userType" title="Tipo de Usuario" width="auto"/>
                  <GridColumn field="area" title="Área" width="auto"/>
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
    
export default SearchUsers;