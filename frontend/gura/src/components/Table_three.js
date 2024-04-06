import React, { useEffect, useState } from 'react'
import JsonData from '../data/olymp_list.json'
import axios from 'axios'

import { Button, Container, Table } from 'react-bootstrap'
function JsonDataDisplay(id){
    const Clicked = (event) =>{
        var id = event.target.id;
        console.log(id)
    }

	const defaultValue = [];

	const [olymps, setOlymps] = useState([]);

	const getApiData = async() => {
		const response = await fetch(
			'http://localhost:8000/api/getolympiadas')
		.then(response => response.json());

		setOlymps(response);
	};

	// const getApiData = async() => {
	// 	const response = await axios(
	// 		"http://localhost:8000/api/getolympiadas"
			
	// 	);

	// 	setOlymps(response);
	// };

	useEffect(() => {
		getApiData();
	}, []);

	// const DisplayData=JsonData.map(
	// 	(info)=>{
	// 		return(
	// 			<tr>
	// 				<td>{info.id}</td>
	// 				<td>{info.olymp_name}</td>
	// 				<td>{info.olymp_date_start}</td>
    //                 <td>{info.olymp_time}</td>
    //                 <td><Button variant='primary' onClick={Clicked} id={info.id}>Записаться</Button></td>
	// 			</tr>
	// 		)
	// 	}
	// )

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