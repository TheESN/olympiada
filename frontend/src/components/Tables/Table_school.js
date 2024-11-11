import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { Component } from 'react'

function JsonDataDisplay(id){
    const [schools, setSchools] = useState([])
	const [inputData, setInputData] = useState([])
	const [editSchool, setEditSchool] = useState({
		id: -1,
	})

	const [showModal, setShowModal] = useState(false)
	const [showModalEditSchool, setShowModalEditSchool] = useState(false)

    const ShowWind = () => setShowModal(true)

	const CloseWind = () => {
		setShowModalEditSchool(false)
		setShowModal(false)
	}

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getschools')
		.then(res => {
			
			setSchools(res.data)
		})
	}, [])

	function handleSubmit(event){
        event.preventDefault()

        axios.post('http://localhost:8000/api/school', inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные добавлены");
                console.log(res.data.valid)
                Refresh()
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }


	function Refresh(){
        axios.get('http://localhost:8000/api/getschools')
        .then(res => {
            setSchools(res.data)
        })
    }



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

		<div className="AddButton">
            <Button onClick={ShowWind}>Добавить</Button>
        </div>

		<Modal show={showModal} onHide={CloseWind}>
                <Modal.Header closeButton>
                    <Modal.Title>asd</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                            onChange={e => setInputData({...inputData, school_name: e.target.value})}
                            required/>
                        </Form.Group>

						<Form.Group>
                            <Form.Label>subdivision</Form.Label>
                            <Form.Control type='text'
                            onChange={e => setInputData({...inputData, school_subdivision: e.target.value})}
                            required/>
                        </Form.Group>

                        
                    </Form>
                </Modal.Body>
            </Modal>

        </>
	)
}

export default JsonDataDisplay;