import React from "react";
import SwaggerUI from "swagger-ui-react";

import "./Swagger.css"
import { APIURL } from "../../../../static/api";


export default function Swagger() {
    const [spec, setSpec] = React.useState({})
    const url = APIURL

    async function getShemaApi() {
        const headers = {"Content-type": "charset=UTF-8"}
        localStorage.getItem('token') ? headers.Authorization = "Token " + localStorage.getItem('token') : ""
        fetch(
            `${APIURL}openapi?format=openapi-json`, 
            {
                method: "GET",
                headers: headers
            })
        .then((response) => {
            return response.json()})
        .then((json) => {
            setSpec(json)
        })
    }

    React.useEffect(() => {
        getShemaApi()
    },[])
    return(
        <>
        {
            Object.entries(spec).length ?
            <SwaggerUI spec={spec}/>
            :
            ""
        }
        </>
    )
}