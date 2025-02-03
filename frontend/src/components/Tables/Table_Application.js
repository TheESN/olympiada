import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function Appli_list(id) {
	const [applications, setApplications] = useState([])
	const [employees, setEmployees] = useState([])
	const [schools, setSchools] = useState([])

	const [editAppli, setEditAppli] = useState({
		"id": -1,
		"application_status": -1,
		"participate": -1

	})

	const appli_statuses = [
		"В ожидании", "Принято", "Отказано"
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

	//Редактирование status олимпиады
	function statusAccept(event) {
		event.preventDefault()

		editAppli["id"] = event.target.id

		editAppli["status"] = event.target.value

		console.log(editAppli, event.target.value)

		var url = "http://localhost:8000/api/applicationstatus/" + editAppli.id.toString()

		axios.put(url, editAppli)
			.then(res => {
				alert("Статус изменён");
				Refresh();
				setShowModalEditAppli(false)
			})
	}

	//Редактирование олимпиады
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

	function DeleteApp(event) {
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
		for (var i = 0; i < applications.length; i++) {
			if (applications[i].id == ID) {
				return applications[i]
			}
		}
	}

	const ShowWindEditAppli = (event) => {
		event.preventDefault();

		console.log()

		id = event.target.id;
		let v = findAppliById(id);

		setEditAppli(v);
		setShowModalEditAppli(true);
	}

	//Запрос списка школ
	useEffect(() => {
		axios.get("http://localhost:8000/api/getschools").then((res) => {
			setSchools(res.data);
		});
	}, []);

	//Запрос списка учителей
	useEffect(() => {
		axios.get("http://localhost:8000/api/getemployees").then((res) => {
			setEmployees(res.data);
		});
	}, []);

	const employeesSelect = employees.map((employee, index) => {
		return <option value={employee.id}>{employee.name}</option>;
	});

	const schoolsSelect = schools.map((school, index) => {
		return <option value={index}>{school.school_name}</option>;
	});

	//Вывод таблицы
	const DisplayData = applications.map((app, index) => {
		return (
			<tr>
				<td>{index + 1}</td>
				<td>
					<a href="#" onClick={ShowWindEditAppli} id={app.id}>
						{app.student.name}
					</a>
				</td>
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
				<td><Button value={1} id = {app.id} onClick={statusAccept}>Принять</Button></td>
				<td><Button value={2} id = {app.id} onClick={statusAccept}>Отказать</Button></td>
			</tr>
		)
	})

	return (
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
							<Form.Label>Employee</Form.Label>
							<Form.Select
								onChange={(e) =>
									setEditAppli({
										...editAppli,
										employee: employees[e.target.value].id,
									})
								}
							>
								<option>Select an employee</option>
								{employeesSelect}
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

						<Form.Group>
							<Form.Label>School</Form.Label>
							<Form.Select
								onChange={(e) =>
									setEditAppli({
										...editAppli,
										school_id: employees[e.target.value].id,
									})
								}
							>
								<option>Select a school</option>
								{schoolsSelect}
							</Form.Select>
						</Form.Group>

						<Button className='mt-3 ms-2' variant='success' type="submit" onClick={SubmitEdit}>Обновить</Button>
						<Button className='mt-3 ms-2' variant='danger' type='submit' onClick={DeleteApp}>Delete</Button>
					</Form>
				</Modal.Body>
			</Modal>

		</>
	)
}

export default Appli_list;