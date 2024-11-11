import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function Appli_list(id){
	const [applications, setApplications] = useState([])
	const [editAppli, setEditAppli] = useState({
		"id": -1,
        "application_status": -1,
		"participate": -1
		
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
	function SubmitStatusEdit(event){
		event.preventDefault()
        
        console.log(editAppli)

		var url = "http://localhost:8000/api/applicationstatus/" + editAppli.id.toString()

        axios.put(url, editAppli)
        .then(res => {
                alert("Статус изменён");
				Refresh();
                console.log("status edit - ", res.data)
				setShowModalEditAppli(false)
        })
    }


	function SubmitEdit(event) {
		event.preventDefault();
	
		var url =
		  "http://localhost:8000/api/getapplication/" + editAppli.id.toString();
	
		console.log("application edit - ", editAppli)
	
		axios.put(url, editAppli).then((res) => {
		  if (res.data.valid === true) {
			alert("Данные обновлены");
			console.log("after update - ", editAppli);
			
			Refresh();
		  } else {
			alert("Неправильно введены данные");
		  }
		});
	  }

	function DeleteApp(event){
		event.preventDefault()

		var url = "http://localhost:8000/api/getapplication/" + editAppli.id.toString()

		axios.delete(url).then((res) => {
			setShowModalEditAppli(false);
			Refresh()
			alert("Удалено");
		  });
	}

	//Поиск заявки по айди
	function findAppliById(ID) {
		for(var i=0;i<applications.length;i++){
			if (applications[i].id == ID){
				// let new_appli = applications.map(({id, application_status}) => ({id, application_status}))
				// return new_appli[i]

				return applications[i]
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
				<td>{app.student.name}</td>
				<td>{app.olymp.olymp_name}</td>
				<td>{app.date}</td>
				{/* организатор / админ */}
				<td>{app.employee}</td>
				<td>{appli_statuses[app.status]}</td>
				<td>{app.participate}</td>
				<td>{app.school.school_name}</td>
				{/* учит ребёнка */}
				<td>{app.teacher}</td>
				<td>{app.subdivision.subdivision_name}</td>
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
					<th>participate</th>
					<th>School</th>
					<th>teacher</th>
					<th>Subdivision</th>
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
					<Form.Select defaultValue={editAppli.status} onChange={e =>
                            setEditAppli({...editAppli, status: e.target.value})}>
						<option value={0}>В ожидании</option>
						<option value={1}>Принять</option>
						<option value={2} >Отказать</option>
					</Form.Select>
                    </Form.Group>

					<Form.Group>
						<Form.Label>participate</Form.Label>
						<Form.Control type='text'
							defaultValue={editAppli.participate}
							onChange={(e) =>
							setEditAppli({ ...editAppli, participate: e.target.value })
							}
							required
						/>
					</Form.Group>

                    <Button className='mt-3' variant='success' type="submit" onClick={SubmitStatusEdit}>Обновить status</Button>
					<Button className='mt-3 ms-2' variant='success' type="submit" onClick={SubmitEdit}>Обновить</Button>
					<Button className='mt-3 ms-2' variant='danger' type='submit' onClick={DeleteApp}>Delete</Button>
                </Form>
            </Modal.Body>
        </Modal>

        </>	
	)
}

export default Appli_list;