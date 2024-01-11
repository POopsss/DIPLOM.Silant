import { json } from "react-router-dom"

export const APIURL = "http://127.0.0.1:8000/"


export async function get(path, query, auth) 
{
    const headers = {"Content-type": "application/json; charset=UTF-8"}
    auth ? headers.Authorization = "Token " + localStorage.getItem('token') : ""
    return await fetch(
        APIURL + path + query, 
        {
            method: "GET",
            headers: headers
        })
    .then((response) => {
        if (response.status == 404) {
            return false
        }        
        return response.json()        
    })
}

export async function post(body, path, auth) 
{
    const headers = {"Content-type": "application/json; charset=UTF-8"}
    auth ? headers.Authorization = "Token " + localStorage.getItem('token') : ""
    return await fetch(
        APIURL + path, 
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
    .then((response) => response.json())
    .then((json) => {
        return json
    })
}

export async function put(body, path, auth) 
{
    const headers = {"Content-type": "application/json; charset=UTF-8"}
    auth ? headers.Authorization = "Token " + localStorage.getItem('token') : ""
    return await fetch(
        "http://127.0.0.1:8000" + path, 
        {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        })
    .then((response) => response.json())
    .then((json) => {
        return json
    })
}


export async function del(path) 
{
    const headers = {"Content-type": "application/json; charset=UTF-8"}
    headers.Authorization = "Token " + localStorage.getItem('token')
    await fetch(
        APIURL + path, 
        {
            method: "DELETE",
            headers: headers,
        })
}