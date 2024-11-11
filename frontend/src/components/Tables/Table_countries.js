import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { Component } from 'react'

function JsonDataDisplay(id){
    const [schools, setSchools] = useState([])

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getcountries')
		.then(res => {
			
			setSchools(res.data)
		})
	}, [])



	//Вывод таблицы
	const DisplayData = schools.map((school, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td>{school.school_name}</td>
				<td>{school.school_subdivision}</td>
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
                        <th>subdivision</th>
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