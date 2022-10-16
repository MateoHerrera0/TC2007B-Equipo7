/* Code used to define user management interface and allow admin to search for users
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Imports
import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";
import '@progress/kendo-theme-default/dist/all.css';
import "./search.css";
import AdminNavbar from "./adminNavbar";
import { deleteUser } from "../API/dbAPI";
import "./userManagement.css"

// Define button to edit users
const userEditButton = (props) => {
    // Get data
    const { dataItem } = props;
    // on button click, go to edit user interface
    return(
        <td>
            <Link to='/editUser' state={dataItem}>
                <button className="btn btn-primary btn-sm rounded-3 fw-bold">Editar</button>
            </Link>
        </td>
    );
};

// Define button to delete users
const userDeleteButton = (props) => {
    // Get data
    const { dataItem } = props;
    // on click, call delete user api
    return(
        <td>
        <button className="btn btn-primary btn-sm rounded-3 fw-bold" onClick={ () => {deleteUser(dataItem)}}>Borrar</button>
        </td>
    );
};

// Search users
const SearchUsers = () => {
    // Get data
    const [data, setData] = useState([]);
      useEffect( ()=> {
        getData();
      }, [])
    // Call backed to get all users
    const getData = async () => {
      const res = await axios.get('/api/getAllUsers')
      setData(res.data);
    }

    // Set results
    const [dataState, setDataState] = React.useState()
    const [res, setResult] = React.useState(data);
    useEffect(() => { setResult(data)}, [data] );

    // Handle data state change
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
    // Render user search interface with buttons to edit and delete users
    return (
        <div className="management">
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
                  <GridColumn field="nulidad" title="Nulidad" width="auto"/>
                  <GridColumn field="investigacion" title="Investigación" width="auto"/>
                  <GridColumn cell = {
                    userEditButton
                  } width="100px" filterable={false}/>
                  <GridColumn cell = {
                    userDeleteButton
                  } width="100px" filterable={false}/>
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