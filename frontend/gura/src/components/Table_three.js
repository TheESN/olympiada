import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function JsonDataDisplay(id){
	const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)
    const CloseWind = () => setShowModal(false)

	const [inputData, setInputData] = useState({name:''})

    const Clicked = (event) =>{
        var id = event.target.id;
        console.log(id)
    }
	
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
				<td><a href='#' onClick={ShowWind}>{olymp.olymp_name}</a></td>
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

		<Modal show={showModal} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить олимпиаду</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" value={DisplayData}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='datefield'  name="olymp_date_start"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="olymp_time"/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" >Обновить</Button>
					<Button variant='danger' className='ms-2 mt-3' type='submit'>Удалить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
	)
}

export default JsonDataDisplay;