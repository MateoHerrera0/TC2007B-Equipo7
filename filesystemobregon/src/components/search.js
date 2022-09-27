import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Navbar from './navbar'
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import esMessages from "./filterMessages.json";
import { process } from "@progress/kendo-data-query";
import { getDocumentInfo } from "../API/dbAPI"; // json de la base de datos 

const Search = () => {
  return(
    <div>
      <form onSubmit={(e)=> {
        e.preventDefault();
        getDocumentInfo()}}>
        <button type="submit">Get Info</button>
      </form>
    </div>
  )
}

export default Search;