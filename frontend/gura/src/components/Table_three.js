import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import axios from "axios"

function JsonDataDisplay(id){
    const Clicked = (event) =>{
        var id = event.target.id;
        console.log(id)
    }

	//const [olymps, setOlymps] = useState([]);

	// const getApiData = async() => {
	// 	const response = await fetch(
	// 		'http://localhost:8000/api/getolympiadas')
	// 	.then(response => response.json());

	// 	setOlymps(response);
	// };

	// useEffect(() => {
	// 	getApiData();
	// }, []);

	const [columns, setColumns] = useState([])
	const [olymps, setOlymps] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8000/api/getolympiadas')
		.then(res => {
			setOlymps(res.data)
		})
	}, [])

	const DisplayData = olymps.map((olymp) => {
		return(
			<tr>
				<td>{olymp.id}</td>
				<td>{olymp.olymp_name}</td>
				<td>{olymp.olymp_date_start}</td>
			    <td>{olymp.olymp_time}</td>
			    <td><Button variant='primary' onClick={Clicked} id={olymp.id}>Записаться</Button></td>
			</tr>
		)
	})

	return(
        <>
        <Container>
			<Table striped>
				<thead>
					<tr>
					<th>#</th>
					<th>Название</th>
					<th>Дата проведения</th>
                    <th>Длительность</th>
					</tr>
				</thead>
				<tbody>
					{DisplayData}
				</tbody>
			</Table>
        </Container>
        </>
	)
}

export default JsonDataDisplay;