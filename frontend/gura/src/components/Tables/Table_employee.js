import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"


function Employee_list(id){
	const [employees, setEmployees] = useState([])

	const [showModalAddEmployee, setShowModalAddEmployee] = useState(false);

	const [showModalEditEmployee, setShowModalEditEmployee] = useState(false);

	const [editEmployee, setEditEmployee] = useState({
		"id":-1,
		"name":"a",
		"sex":-1,
		"role":-1,
		"user": -1
	}
	);

	function findEmployeeById(ID) {
		for(var i=0;i<employees.length;i++){
			if (employees[i].id == ID){		
				return employees[i];
			}
	    } 
	}

	//Добавление
	function handleSubmit(event){
		inputData["user"] = 1
		console.log(inputData)

        axios.post('http://localhost:8000/api/employee', inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные добавлены");
                console.log(res.data)
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }

	//Показ модальное окно добавления
	const ShowModalAddEmployee = (event) => {
		event.preventDefault();
		
		setShowModalAddEmployee(true)
	}

	//Закрыть модальное окно
    const CloseWind = () => {
		setShowModalAddEmployee(false)
		setShowModalEditEmployee(false)
	}

	//Показ модальное окно редактирования
    const ShowWindEditOlymp = (event) => {
		event.preventDefault();
		
		id = event.target.id;
		let v = findEmployeeById(id);
		setEditEmployee(v);
		setShowModalEditEmployee(true)
	}

	const [inputData, setInputData] = useState({})

	//Редактирование ответсвенного
	function SubmitEdit(event){
		event.preventDefault()

		console.log(inputData)

		var url = "http://localhost:8000/api/getemployee/" + editEmployee.id.toString();

        axios.put(url, inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные обновлены");
                console.log(res.data)
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }

	//Удаление ответственного
	function DeleteSubmit(event){

		var url = "http://localhost:8000/api/getemployee/" + editEmployee.id.toString();

        axios.delete(url)
        .then(res => {
                alert("Удалено");
        })
    }

	//Запрос списка ответственного
	useEffect(() => {
		axios.get('http://localhost:8000/api/getemployees')
		.then(res => {
			setEmployees(res.data)
		})
	}, [])

	//Вывод таблицы
	const DisplayData = employees.map((emp, index) => {
		return(
			<tr>
				<td>{index + 1}</td>
				<td>{emp.name}</td>
				<td>{emp.sex}</td>
			    <td>{emp.role}</td>
				<td>{emp.user}</td>
			    <td><Button variant='primary' onClick={ShowWindEditOlymp} id={emp.id}>Изменить</Button></td>
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
					<th>Пол</th>
                    <th>Роль</th>
					<th>Логин</th>
					</tr>
				</thead>
				<tbody>
					{DisplayData}
				</tbody>
			</Table>
        </Container>

		
		<div className='AddButton'>
			<Button onClick={ShowModalAddEmployee}>Добавить</Button>
		</div>

        {/* Модальное окно добваления ответственных */}
		<Modal show={showModalAddEmployee} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить ответсвенного</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ФИО</Form.Label>
                            <Form.Control type='text' name="name" onChange={e => setInputData({...inputData, name: e.target.value})}  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пол</Form.Label>
						<Form.Check
							type="radio"
							label="Мужской"
							name="radioGroup"
							id="option1"
							value="Мужской"
							onChange={e => setInputData({...inputData, sex: e.target.value})}
						/>
						<Form.Check
							type="radio"
							label="Женский"
							name="radioGroup"
							id="option2"
							value="Женский"
							onChange={e => setInputData({...inputData, sex: e.target.value})}
						/>
                    </Form.Group>
					<Form.Group>
                        <Form.Label>Роль</Form.Label>
						<Form.Check
							type="radio"
							label="Ответственный"
							name="roleGroup"
							id="option1"
							value="Ответственный"
							onChange={e => setInputData({...inputData, role: e.target.value})}
						/>
						<Form.Check
							type="radio"
							label="Представитель муниципалитета"
							name="roleGroup"
							id="option2"
							value="Представитель муниципалитета"
							onChange={e => setInputData({...inputData, role: e.target.value})}
						/>
                    </Form.Group>
					<Form.Group>
						<Form.Control type='hidden' name='user' value={"1"} onChange={e => setInputData({...inputData, user: e.target.value})}/>
					</Form.Group>
					<Button className='mt-3' type="submit" >Добавить</Button>
                </Form>
            </Modal.Body>
        </Modal>

		{/* Модальное окно редактриованния ответственных */}
		<Modal show={showModalEditEmployee} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить ответсвенного</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>ФИО</Form.Label>
                            <Form.Control type='text' name="name" defaultValue={editEmployee.name} onChange={e => setInputData({...inputData, name: e.target.value})}  required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пол</Form.Label>
						<Form.Check
							type="radio"
							label="Мужской"
							name="radioGroup"
							id="option1"
							value={0}
							onChange={e => setInputData({...inputData, sex: e.target.value})}
						/>
						<Form.Check
							type="radio"
							label="Женский"
							name="radioGroup"
							id="option2"
							value={1}
							onChange={e => setInputData({...inputData, sex: e.target.value})}
						/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Роль</Form.Label>
                        <Form.Control type='text'  name="role" defaultValue={editEmployee.role} onChange={e => setInputData({...inputData, role: e.target.value})} required/>
                    </Form.Group>
					<Form.Group>
						<Form.Control type='hidden' name='user' value={1} onChange={e => setInputData({...inputData, user: e.target.value})}/>
					</Form.Group>
					<Button className='mt-3' type="submit" onClick={SubmitEdit}>Обновить</Button>
					<Button variant='danger' className='ms-2 mt-3' type='submit' onClick={DeleteSubmit}>Удалить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </> 



	)
}

export default Employee_list;