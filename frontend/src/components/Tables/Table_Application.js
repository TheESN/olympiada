import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function Appli_list(id){
	const [applications, setApplications] = useState([])
	const [editAppli, setEditAppli] = useState({
		"id": -1,
        "application_status": -1
		
	})

	const appli_statuses = [
		"В ожидании", "Принято","Отказано"
	]

	const [showModalEditAppli, setShowModalEditAppli] = useState(false);

	function Refresh() {
		axios.get('http://localhost:8000/api/getapplications')
		.then(res => {
			setApplications(res.data)
		})
	  }
	

	//Запрос списка заявок
	useEffect(() => {
		axios.get('http://localhost:8000/api/getapplications')
		.then(res => {
			setApplications(res.data)
		})
	}, [])

	const CloseWind = () => {
		setShowModalEditAppli(false)
	}

	//Редактирование олимпиады
	function SubmitEdit(event){
		event.preventDefault()
        
        console.log(editAppli)

		var url = "http://localhost:8000/api/applicationstatus/" + editAppli.id.toString()

        axios.put(url, editAppli)
        .then(res => {
                alert("Статус изменён");
				Refresh();
                console.log(res.data)
				setShowModalEditAppli(false)
        })
    }

	//Поиск заявки по айди
	function findAppliById(ID) {
		for(var i=0;i<applications.length;i++){
			if (applications[i].id == ID){
				let new_appli = applications.map(({id, application_status}) => ({id, application_status}))
				return new_appli[i]

				// return applications[i].application_status
			}
	    } 
	}

	const ShowWindEditOlymp = (event) => {
		event.preventDefault();

		console.log()
	
		id = event.target.id;
		let v = findAppliById(id);

		setEditAppli(v);
		setShowModalEditAppli(true);
	}

	//Вывод таблицы
	const DisplayData = applications.map((app, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td>{app.applied_student.name}</td>
				<td>{app.applied_olymp.olymp_name}</td>
			    <td>{app.application_date}</td>
				<td>{app.application_employee}</td>
				<td>{appli_statuses[app.application_status]}</td>
				<td><Button onClick={ShowWindEditOlymp} id={app.id}>Изменить статус</Button></td>
				
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
                    <th>Дата заявки</th>
					<th>Оргнизатор</th>
					<th>Application status</th>
					</tr>
				</thead>
				<tbody>
					{DisplayData}
				</tbody>
			</Table>
        </Container>

		<Modal show={showModalEditAppli} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить олимпиаду</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
					<Form.Select defaultValue={editAppli.application_status} onChange={e =>
                            setEditAppli({...editAppli, application_status: e.target.value})}>
						<option value={0}>В ожидании</option>
						<option value={1}>Принять</option>
						<option value={2} >Отказать</option>
					</Form.Select>
                    </Form.Group>
                    <Button className='mt-3' type="submit" onClick={SubmitEdit}>Обновить</Button>
                </Form>
            </Modal.Body>
        </Modal>

        </>	
	)
}

export default Appli_list;