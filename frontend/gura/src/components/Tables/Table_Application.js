import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function Appli_list(id){
	const [applications, setApplications] = useState([])
	const [olymps, setOlymps] = useState([])

	//Запрос списка заявок
	useEffect(() => {
		axios.get('http://localhost:8000/api/getapplications')
		.then(res => {
			setApplications(res.data)
		})
	}, [])

	//Запрос списка олимпиады
	
	useEffect(() => {
		axios.get('http://localhost:8000/api/getolympiadas')
		.then(res => {
			setOlymps(res.data)
			
		})
	}, [])

	const clicked = (event) => {
		event.preventDefault();

		console.log(event)
	}

	//Вывод таблицы
	const DisplayData = applications.map((app, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td>{app.applied_student}</td>
				<td>{app.applied_olymp}</td>
			    <td>{app.application_date}</td>
				<td>{app.application_employee}</td>
			    <td><Button variant='primary' onClick={clicked}>Записаться</Button></td>
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
					<th>ФИО</th>
					<th>Олимпиада</th>
                    <th>Дата подачи</th>
					<th>Оргнаиз</th>
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

export default Appli_list;