import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function JsonDataDisplay(id){
	const [showModal, setShowModal] = useState(false);
	const [editOlymp, setEditOlymp] = useState({
		"id":-1,
		"olymp_name":"a",
		"olymp_date_start":"",
		"olymp_time":""
	}
	);

	//Показ модальное окно
    const ShowWind = (event) => {
		event.preventDefault();
		
		id = event.target.id;
		let v = findOlympById(id);
		setEditOlymp(v);
		setShowModal(true)
	}

	//Закрыть модальное окно
    const CloseWind = () => setShowModal(false)	

	const [inputData, setInputData] = useState({name:''})

    const Clicked = (event) =>{
		id = event.target.id
        console.log(id)
    }
	
	const [olymps, setOlymps] = useState([])

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getolympiadas')
		.then(res => {
			setOlymps(res.data)
		})
	}, [])

	//Редактирование олимпиады
	function handleSubmit(event){
		event.preventDefault()

		var url = "http://localhost:8000/api/getolympiada/" + editOlymp.id.toString();

        axios.put(url, inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные обновлены");
                console.log(res.data.valid)
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }

	//Удаление олимпиады
	function DeleteSubmit(event){
		event.preventDefault()

		var url = "http://localhost:8000/api/getolympiada/" + editOlymp.id.toString();

        axios.delete(url)
        .then(res => {
                alert("Удаленео");
        })
    }

	//Вывод таблицы
	const DisplayData = olymps.map((olymp) => {
		return(
			<tr>
				<td>{olymp.id}</td>
				<td><a href='#' onClick={ShowWind} id={olymp.id}>{olymp.olymp_name}</a></td>
				<td>{olymp.olymp_date_start}</td>
			    <td>{olymp.olymp_time}</td>
			    <td><Button variant='primary' onClick={Clicked} id={olymp.id}>Записаться</Button></td>
			</tr>
		)
	})

	//Поиск олимпиады по айди
	function findOlympById(ID) {
		for(var i=0;i<olymps.length;i++){
			if (olymps[i].id == ID){		
				return olymps[i];
			}
	    } 
	}

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
					{/* <Form.Control type='hidden' value={editOlymp.id}/> */}
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" onChange={e => setInputData({...inputData, olymp_name: e.target.value})}  required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='datefield'  name="olymp_date_start" onChange={e => setInputData({...inputData, olymp_date_start: e.target.value})} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="olymp_time" onChange={e => setInputData({...inputData, olymp_time: e.target.value})} required/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" onClick={handleSubmit}>Обновить</Button>
					<Button variant='danger' className='ms-2 mt-3' type='submit' onClick={DeleteSubmit}>Удалить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
	)
}

export default JsonDataDisplay;