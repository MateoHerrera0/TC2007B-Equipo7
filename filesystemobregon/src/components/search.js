import React from "react";
import './search.css';
import getDocumentInfo from "../API/dbAPI";
import { useState } from "react";

const tagsNulidad = [
    fields.expediente, 
    fields.tja,
    fields.actor,
    fields.domicilio,
    fields.acto,
    fields.eJuridico,
    fields.eProcesal,
    fields.materia,
    fields.demandado,
    fields.folio
]

const tagsCarpeta = [
    fields.eco,
    fields.denuciante,
    fields.imputado,
    fields.delito,
    fields.lugar,
    fields.objeto,
    fields.eGuarda,
    fields.folio
]

function Search({setData}) {
    const [filters, setFilters] = useState([
        {category: 'Caso', value: '1'}
    ]);

    function handleSubmit(event) {
        
    }
}