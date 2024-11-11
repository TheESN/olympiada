import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { Component } from 'react'

function JsonDataDisplay(id){
    const [countries, setCountries] = useState([])

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getcountries')
		.then(res => {
			
			setCountries(res.data)
		})
	}, [])



	//Вывод таблицы
	const DisplayData = countries.map((countrie, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td>{countrie.country_name}</td>
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