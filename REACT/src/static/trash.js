// <tr key={id}>
//     <td>{id + 1}</td>
//     <td>{truck.truckModel}</td>
//     <td>{truck.serialNumber}</td>
//     <td>{truck.engineModel}</td>
//     <td>{truck.engineSerialNumber}</td>
//     <td>{truck.transmissionModel}</td>
//     <td>{truck.transmissionSerialNumber}</td>
//     <td>{truck.drivingBridgeModel}</td>
//     <td>{truck.drivingBridgeSerialNumber}</td>
//     <td>{truck.controlledBridgeModel}</td>
//     <td>{truck.controlledBridgeSerialNumber}</td>
// </tr>



// onMouseDown={sliderMouseDown} onMouseLeave={sliderMouseLeave} onMouseUp={sliderMouseUp} onMouseMove={sliderMouseMove}
// const tableRef = React.useRef()
// let isDown = false
// let startX
// let scrollLeft

// function sliderMouseDown(e) {
//     isDown = true
//     tableRef.current.classList.add('active')
//     startX = e.pageX - tableRef.current.offsetLeft
//     scrollLeft = tableRef.current.scrollLeft
// }
// function sliderMouseLeave() {
//     isDown = false
//     tableRef.current.classList.remove('active');
// }
// function sliderMouseUp() {
//     isDown = false
//     tableRef.current.classList.remove('active')
// }
// function sliderMouseMove(e) {
//     if(!isDown) return
//     e.preventDefault()
//     const x = e.pageX - tableRef.current.offsetLeft
//     const walk = (x - startX) * 1.2
//     tableRef.current.scrollLeft = scrollLeft - walk
// }

    // async function qwe()
    //     {
    //         await fetch(
    //             "http://127.0.0.1:8000/user/", 
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-type": "application/json; charset=UTF-8",
    //                     "Authorization": "Token " + localStorage.getItem('token')
    //                 },
    //             })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json)
    //             return json
    //         })
    //     }

    // async function qwe() 
    // {
    //     await fetch(
    //         APIURL + "hand_book_name/14/", 
    //         {
    //         method: "PUT",
    //         body: JSON.stringify({
    //             "name": "Test PUT Barsik"
    //         }),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //             "Authorization": "Token 3a020c229f661c4a014e26a0893e0adc74d42c9d" // Barsik
    //             // "Authorization": "Token 072fcdc0caec339e3b51985aa99e260b98520a58" // User1
    //             // "Authorization": "Token bd350f8b916e742df2c6cfeacaec1d13f7ec9416" // Service1
    //             // "Authorization": "Token c93ebcba8e555cfcfb8874d8049dd59cf3aea140" // Service2
    //             // "Authorization": "Token a938d0a74866535b302561d57ba792e0a1cca287" // Manager1
    //         }
    //         })
    //     .then((response) => {
    //         console.log(response)
    //         // return response.json()
    //     })
    //     // .then((json) => {
    //     //     console.log(json)
    //     // })
    // }

    {/* { list.map((obj, id) => 
    <tr key={id}>
        <td>{id + 1}</td>
        { Object.keys(obj).map((key, id) => 
            key == "id" ? "" : 
            typeof(obj[key]) == "string" ? 
            <td key={"obj" + id} onClick={ !Object.keys(field_info).indexOf(key) ? () => location.href = location.origin + field_info[key] + obj[key] : () => {} }>
                {obj[key]}
            </td> : 
            Array.isArray(obj[key]) ? 
            <td key={id}>
                {obj[key].map((elem, id) => <p key={"objlist" + id}>{elem}</p>)}
            </td> : 
            Object.keys(obj[key]).map((key_x, uid) => 
            <td key={"userobj" + uid} onClick={ !Object.keys(field_info).indexOf(key_x) ? () => location.href = location.origin + field_info[key_x] + obj[key][key_x] : () => {} }>
                {obj[key][key_x]}
            </td>
        ))}
    </tr>
    )} */}

    
//     "name": "Модель техники"
// },
// {
//     "name": "Модель двигателя"
// },
// {
//     "name": "Модель трансмиссии"
// },
// {
//     "name": "Модель ведущего моста"
// },
// {
//     "name": "Модель управляемого моста"
// },
// {
//     "name": "Комплектация"
// },
// {
//     "name": "Вид ТО"
// },
// {
//     "name": "Сервисная компания"
// },
// {
//     "name": "Способ востановления"
// },