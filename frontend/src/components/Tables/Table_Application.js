import { useState, axios, Button, Container, Table, Form, Modal, useEffect } from '../container/imports.js';

function Appli_list() {
	const [applications, setApplications] = useState([])
	const [employees, setEmployees] = useState([])
	const [schools, setSchools] = useState([])
	const [editAppli, setEditAppli] = useState({ id: -1, application_status: -1, participate: -1 })
	const appli_statuses = ["В ожидании", "Принято", "Отказано"]
	const [showModalEditAppli, setShowModalEditAppli] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [subdivisions, setSubdivisions] = useState([]);

	const handleModalToggle = (modalType) => {
		if (modalType === 'edit')
			setShowModalEditAppli(!showModalEditAppli);
		else setShowModal(!showModal);
	};

	const handleAppliSelect = (id) => {
		const application = applications.find(o => o.id === id);
		const res = []
		res["participate"] = application.participate
		res["id"] = application.id
		res["student_id"] = application.student.id
		res["olymp_id"] = application.olymp.id
		res["school_id"] = application.school.id
		res["subdivision_id"] = application.subdivision.id
		setEditAppli(res);
		console.log(application)
	};


	const Refresh = async () => {
		const res = await axios.get("http://localhost:8000/api/getapplications");
		setApplications(res.data);
	};

	//Запрос списков
	useEffect(() => {
		const fetchData = async () => {
			const [appliRes, schoolRes, employeeRes, subdRes] = await Promise.all([
				axios.get("http://localhost:8000/api/getapplications"),
				axios.get("http://localhost:8000/api/getschools"),
				axios.get("http://localhost:8000/api/getemployees"),
				axios.get("http://localhost:8000/api/getsubdivisions"),
			])
			setApplications(appliRes.data);
			setSchools(schoolRes.data);
			setEmployees(employeeRes.data);
			setSubdivisions(subdRes.data)
		};
		fetchData();
	}, []);

	const handleStatusEditSubmit = async (event) => {
		event.preventDefault()

		editAppli.id = event.target.id
		editAppli.status = event.target.value

		const res = await axios.put(`http://localhost:8000/api/applicationstatus/${editAppli.id}`, editAppli)

		alert("Статус изменён");
		Refresh()
	}

	//Редактирование
	const handleEditSubmit = async (event) => {
		console.log("input data: ", editAppli)
		event.preventDefault();
		const res = await axios.put(`http://localhost:8000/api/getapplication/${editAppli.id}`, editAppli);
		console.log("input data: ", editAppli)
		console.log("res data", res.data)
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

	const employeesSelect = employees.map((employee) => {
		return <option value={employee.id}>{employee.name}</option>;
	});

	const schoolsSelect = schools.map((school, index) => {
		return <option value={index}>{school.school_name}</option>;
	});

	const subdivisionSelect = subdivisions.map((subd, index) => {
		return <option value={index}>{subd.subdivision_name}</option>;
	});

	//Вывод таблицы
	const DisplayData = applications.map((app, index) => (
		<tr>
			<td>{index + 1}</td>
			<td>
				<a href="#" onClick={() => { handleAppliSelect(app.id); handleModalToggle('edit') }}>
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
							<th>Организатор</th>
							<th>Статус заявки</th>
							<th>Класс участия</th>
							<th>Школа</th>
							<th>Учитель</th>
							<th>Район</th>
						</tr>
					</thead>
					<tbody>{DisplayData}</tbody>
				</Table>
			</Container>

			<Modal show={showModalEditAppli} onHide={() => handleModalToggle('edit')}>
				<Modal.Header closeButton>
					<Modal.Title>Редактировать заявку</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleEditSubmit}>
						<Form.Group>
							<Form.Label>Ответсвенный</Form.Label>
							<Form.Select
								onChange={(e) =>
									setEditAppli({...editAppli, employee: e.target.value
									})}
							>
								<option>Выберите ответсвенного</option>
								{employeesSelect}
							</Form.Select>
						</Form.Group>

						<Form.Group>
							<Form.Label>Класс участия</Form.Label>
							<Form.Control type='text'
								defaultValue={editAppli.participate}
								onChange={(e) =>
									setEditAppli({ ...editAppli, participate: e.target.value })
								}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Школа</Form.Label>
							<Form.Select
								onChange={(e) =>
									setEditAppli({...editAppli, school_id: schools[e.target.value].id,
									})
								}
							>
								<option>Выберите школу</option>
								{schoolsSelect}
							</Form.Select>
						</Form.Group>

						<Form.Group>
							<Form.Label>Район</Form.Label>
							<Form.Select
								onChange={(e) =>
									setEditAppli({...editAppli, subdivision_id: subdivisions[e.target.value].id,
									})
								}
							>
								<option>Выберите район</option>
								{subdivisionSelect}
							</Form.Select>
						</Form.Group>
						<Button className='mt-3 ms-2' variant='success' type="submit">Обновить</Button>
						<Button className='mt-3 ms-2' variant='danger' onClick={handleDelete}>Удалить</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Appli_list;