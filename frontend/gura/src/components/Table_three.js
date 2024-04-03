import React from 'react'

import JsonData from '../data/olymp_list.json'
import { Button, Container, Table } from 'react-bootstrap'
function JsonDataDisplay(id){
    const Clicked = (event) =>{
        var id = event.target.id;
        console.log(id)
    }

	const DisplayData=JsonData.map(
		(info)=>{
			return(
				<tr>
					<td>{info.id}</td>
					<td>{info.olymp_name}</td>
					<td>{info.olymp_date_start}</td>
                    <td>{info.olymp_time}</td>
                    <td><Button variant='primary' onClick={Clicked} id={info.id}>Записаться</Button></td>
				</tr>
			)
		}
	)

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