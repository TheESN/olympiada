import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function JsonDataDisplay(id){
	const [showModalEditOlymp, setShowModalEditOlymp] = useState(false);

	const [showModalRegister, setShowModalRegister] = useState(false);
    
    const [olymps, setOlymps] = useState([])

	const [editOlymp, setEditOlymp] = useState({
		"id":-1,
		"olymp_name":"a",
		"olymp_date_start":"",
		"olymp_time":""
	}
	);

	const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)

    const [inputData, setInputData] = useState({name:''})


	
    //Добавление олимпиады

    function handleSubmit(event){
        event.preventDefault()

        axios.post('http://localhost:8000/api/olympiada', inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные добавлены");
                console.log(res.data.valid)
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }

	//Показ модальное окно редактирования
    const ShowWindEditOlymp = (event) => {
		event.preventDefault();
		
		id = event.target.id;
		let v = findOlympById(id);
		setEditOlymp(v);
		setShowModalEditOlymp(true)
	}

	//Показ модальное окно записи
	const ShowModalRegister = (event) => {
		event.preventDefault();
		
		setShowModalRegister(true)
	}

	//Закрыть модальное окно
    const CloseWind = () => {
		setShowModalEditOlymp(false)
		setShowModalRegister(false)
		setShowModal(false)
	}
	
	

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getolympiadas')
		.then(res => {
			
			setOlymps(res.data)
		})
	}, [])

	//Редактирование олимпиады
	function SubmitEdit(event){
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

	function RegisterSubmit(event){
		event.preventDefault()

		var url = "http://localhost:8000/api/getolympiada/";
    }

	//Вывод таблицы
	const DisplayData = olymps.map((olymp, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td><a href='#' onClick={ShowWindEditOlymp} id={olymp.id}>{olymp.olymp_name}</a></td>
				<td>{olymp.olymp_date_start}</td>
			    <td>{olymp.olymp_time}</td>
			    <td><Button variant='primary' onClick={ShowModalRegister} id={olymp.id}>Записаться</Button></td>
				
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
                    <th>Время начала</th>
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

		{/* модальное окно Добавление */}
        <Modal show={showModal} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить олимпиаду</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" 
                            onChange={e => setInputData({...inputData, olymp_name: e.target.value})} 
                             required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='datefield'  name="olymp_date_start"
                         onChange={e => setInputData({...inputData, olymp_date_start: e.target.value})}
                          required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="olymp_time"
                         onChange={e => setInputData({...inputData, olymp_time: e.target.value})} 
                         required/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" >Добавить</Button>
                </Form>
            </Modal.Body>
        </Modal>		


		{/* Модальное окно редактирования олимпиады */}
		<Modal show={showModalEditOlymp} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить олимпиаду</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" 
                            defaultValue={editOlymp.olymp_name} onChange={e => 
                            setInputData({...inputData, olymp_name: e.target.value})}  
                            required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='datefield'  name="olymp_date_start" 
                        defaultValue={editOlymp.olymp_date_start} onChange={e =>
                         setInputData({...inputData, olymp_date_start: e.target.value})} 
                         required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="olymp_time"
                        defaultValue={editOlymp.olymp_time} onChange={e =>
                         setInputData({...inputData, olymp_time: e.target.value})}
                          required/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" onClick={SubmitEdit}>Обновить</Button>
					<Button variant='danger' className='ms-2 mt-3' type='submit' onClick={DeleteSubmit}>Удалить</Button>
                </Form>
            </Modal.Body>
        </Modal>

		{/* Модальное окно записи */}
		<Modal show={showModalRegister} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Подать заявку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>ФИО</Form.Label>
                            <Form.Control type='text' name="stud_name" onChange={e => setInputData({...inputData, stud_name: e.target.value})}  required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Школа</Form.Label>
                        <Form.Control type='text'  name="stud_school" onChange={e => setInputData({...inputData, stud_school: e.target.value})} required/>
                    </Form.Group>
					<Form.Group>
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control type='datefield'  name="stud_birthday" onChange={e => setInputData({...inputData, stud_birthday: e.target.value})} required/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" onClick={RegisterSubmit}>Записаться</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
	)
}

export default JsonDataDisplay;