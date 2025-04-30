import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function Appli_list(id) {
	const [applications, setApplications] = useState([])
	const [employees, setEmployees] = useState([])
	const [schools, setSchools] = useState([])
	const [editAppli, setEditAppli] = useState({ id: -1, application_status: -1, participate: -1 })
	const appli_statuses = ["В ожидании", "Принято", "Отказано"]
	const [showModalEditAppli, setShowModalEditAppli] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleModalToggle = (modalType) => {
		if (modalType === 'edit')
			setShowModalEditAppli(!showModalEditAppli);
		else setShowModal(!showModal);
	};

	function Refresh() {
		axios.get('http://localhost:8000/api/getapplications')
			.then(res => {
				setApplications(res.data)
			})
	}

	//Запрос списков
	useEffect(() => {
		const fetchData = async () => {
			const [appliRes, schoolRes, employeeRes] = await Promise.all([
				axios.get("http://localhost:8000/api/getapplications"),
				axios.get("http://localhost:8000/api/getschools"),
				axios.get("http://localhost:8000/api/getemployees"),
			])
			setApplications(appliRes.data);
			setSchools(schoolRes.data);
			setEmployees(employeeRes.data);
		};
		fetchData();
	}, []);

	// const CloseWind = () => {
	// 	setShowModalEditAppli(false)
	// }

	const handleStatusEditSubmit = async (event) => {
		event.preventDefault()

		editAppli.id = event.target.id
		editAppli.status = event.target.value

		const res = await axios.put(`http://localhost:8000/api/applicationstatus/${editAppli.id}`, editAppli)

		alert("Статус изменён");
		Refresh()
	}

	//Редактирование олимпиады
	const handleEditSubmit = async (event) => {
		event.preventDefault();
		const res = await axios.put(`http://localhost:8000/api/getapplication/${editAppli.id}`, editAppli);
		alert(res.data.valid ? "Данные обновлены" : "Неправильно введены данные");
		if (res.data.valid) {
			handleModalToggle('edit');
			Refresh();
		}
	};

	const handleDelete = async (event) => {
		event.preventDefault();
		await axios.delete(`http://localhost:8000/api/getapplication/${editAppli.id}`);
		alert("Удалено");
		handleModalToggle('edit');
		Refresh();
	};

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

		id = event.target.id;
		let v = findAppliById(id);

		setEditAppli(v);
		setShowModalEditAppli(true);
	}

	
	const employeesSelect = employees.map((employee) => {
		return <option value={employee.id}>{employee.name}</option>;
	});

	const schoolsSelect = schools.map((school, index) => {
		return <option value={index}>{school.school_name}</option>;
	});

	console.log("emp select", employeesSelect)

	//Вывод таблицы
	const DisplayData = applications.map((app, index) => (
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
			<td><Button value={1} id={app.id} onClick={handleStatusEditSubmit}>Принять</Button></td>
			<td><Button value={2} id={app.id} onClick={handleStatusEditSubmit}>Отказать</Button></td>
		</tr>
	))

	console.log(employees)

	return (
		<>
			<Container>
				<Table striped className="mt-3 table-borderless">
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
					<tbody>{DisplayData}</tbody>
				</Table>
			</Container>

			<Modal show={showModalEditAppli} onHide={() => handleModalToggle('edit')}>
				<Modal.Header closeButton>
					<Modal.Title>Изменить олимпиаду</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleEditSubmit}>
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
						<Button className='mt-3 ms-2' variant='success' type="submit">Обновить</Button>
						<Button className='mt-3 ms-2' variant='danger' onClick={handleDelete}>Delete</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Appli_list;