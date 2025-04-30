import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom'

function JsonDataDisplay() {
  const [showModalEditOlymp, setShowModalEditOlymp] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [olymps, setOlymps] = useState([]);
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schools, setSchools] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState({});
  const [inputAppData, setInputAppData] = useState({});
  const navigate = useNavigate();

  const handleOlympSelect = (id) => {
    const olymp = olymps.find(o => o.id === id);
    setInputData(olymp);
    setInputAppData({ olymp_id: olymp.id });
  };

  const handleModalToggle = (modalType) => {
    if (modalType === 'edit')
      setShowModalEditOlymp(!showModalEditOlymp);
    else if (modalType === 'register')
      setShowModalRegister(!showModalRegister);
    else setShowModal(!showModal);
  };

  // Запрос данных
  useEffect(() => {
    const fetchData = async () => {
      const [olympRes, studentRes, employeeRes, schoolRes, subdivisionRes] = await Promise.all([
        axios.get("http://localhost:8000/api/getolympiadas"),
        axios.get("http://localhost:8000/api/getstudents"),
        axios.get("http://localhost:8000/api/getemployees"),
        axios.get("http://localhost:8000/api/getschools"),
        axios.get("http://localhost:8000/api/getsubdivisions"),
      ]);
      setOlymps(olympRes.data);
      setStudents(studentRes.data);
      setEmployees(employeeRes.data);
      setTeachers(employeeRes.data)
      setSchools(schoolRes.data);
      setSubdivisions(subdivisionRes.data);
    };
    fetchData();
  }, []);

  const renderSelectOptions = (data, key) => {
    return data.map((item, index) => <option key={item.id} value={item.id}>{item[key]}</option>);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:8000/api/olympiada", inputData);
    alert(res.data.valid ? "Данные добавлены" : "Неправильно введены данные");
    if (res.data.valid) {
      handleModalToggle();
      Refresh();
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.put(`http://localhost:8000/api/getolympiada/${inputData.id}`, inputData);
    alert(res.data.valid ? "Данные обновлены" : "Неправильно введены данные");
    if (res.data.valid) {
      handleModalToggle('edit');
      Refresh();
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:8000/api/getolympiada/${inputData.id}`);
    alert("Удалено");
    handleModalToggle('edit');
    Refresh();
  };

  const fetchStudentFromOlymp = async (id) => {
    try {
      const url = "http://localhost:8000/api/getstudentfromolymp/" + id.toString();
      const res = await axios.get(url);

      console.log("API response: ", res.data);

      navigate(`/participants/${id}`, {
        state: {
          data: res.data // Передаем данные в состояние
        }
      });
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    inputAppData.status = 0;
    const res = await axios.post("http://localhost:8000/api/application", inputAppData);
    alert(res.data.valid ? "Данные добавлены" : res.data.msg);
    if (res.data.valid) handleModalToggle('register');
  };

  //Вывод таблицы
  const DisplayData = olymps.map((olymp, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{olymp.olymp_name}</td>
      <td>{olymp.olymp_date_start}</td>
      <td>{olymp.olymp_time}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle>
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { handleOlympSelect(olymp.id); handleModalToggle('register') }}>Записаться</Dropdown.Item>
            <Dropdown.Item onClick={() => { handleOlympSelect(olymp.id); handleModalToggle('edit'); }}>Редактировать</Dropdown.Item>
            <Dropdown.Item>Результаты</Dropdown.Item>
            <Dropdown.Item onClick={() => fetchStudentFromOlymp(olymp.id)}>Участники</Dropdown.Item>
            <Dropdown.Item>Заявки</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  ));

  const Refresh = async () => {
    const res = await axios.get("http://localhost:8000/api/getolympiadas");
    setOlymps(res.data);
  };

  return (
    <>
      <Container>
        <Table striped className="mt-3 table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Дата проведения</th>
              <th>Время начала</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </Container>

      <div className="AddButton">
        <Button onClick={() => handleModalToggle()}>
          Добавить
        </Button>
      </div>

      {/* модальное окно Добавление */}
      <Modal show={showModal} onHide={() => handleModalToggle()}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить олимпиаду</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control type="text" onChange={(e) => setInputData({ ...inputData, olymp_name: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Дата начала</Form.Label>
              <Form.Control type="date" onChange={(e) => setInputData({ ...inputData, olymp_date_start: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Время начала</Form.Label>
              <Form.Control type="time" onChange={(e) => setInputData({ ...inputData, olymp_time: e.target.value })} required />
            </Form.Group>
            <Button className="mt-3" type="submit">Добавить</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalEditOlymp} onHide={() => handleModalToggle('edit')}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить олимпиаду</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control type="text" defaultValue={inputData.olymp_name} onChange={(e) => setInputData({ ...inputData, olymp_name: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Дата начала</Form.Label>
              <Form.Control type="date" defaultValue={inputData.olymp_date_start} onChange={(e) => setInputData({ ...inputData, olymp_date_start: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Длительность</Form.Label>
              <Form.Control type="time" defaultValue={inputData.olymp_time} onChange={(e) => setInputData({ ...inputData, olymp_time: e.target.value })} required />
            </Form.Group>
            <Button className="mt-3" type="submit">Обновить</Button>
            <Button className="ms-2 mt-3" onClick={handleDelete}>Удалить</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalRegister} onHide={() => handleModalToggle('register')}>
        <Modal.Header closeButton>
          <Modal.Title>Подать заявку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group>
              <Form.Label>Student</Form.Label>
              <Form.Select onChange={(e) => setInputAppData({ ...inputAppData, student_id: e.target.value })}>
                <option>Select a student</option>
                {renderSelectOptions(students, 'name')}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>School</Form.Label>
              <Form.Select onChange={(e) => setInputAppData({ ...inputAppData, school_id: e.target.value })}>
                <option>Select a school</option>
                {renderSelectOptions(schools, 'school_name')}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Subdivision</Form.Label>
              <Form.Select onChange={(e) => setInputAppData({ ...inputAppData, subdivision_id: e.target.value })}>
                <option>Select a subdivision</option>
                {renderSelectOptions(subdivisions, 'subdivision_name')}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Teacher</Form.Label>
              <Form.Select onChange={(e) => setInputAppData({ ...inputAppData, teacher: e.target.value })}>
                <option>Select a teacher</option>
                {renderSelectOptions(teachers, 'name')}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee</Form.Label>
              <Form.Select onChange={(e) => setInputAppData({ ...inputAppData, employee: e.target.value })}>
                <option>Select an employee</option>
                {renderSelectOptions(employees, 'name')}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Participate</Form.Label>
              <Form.Control type="number" onChange={(e) => setInputAppData({ ...inputAppData, participate: e.target.value })} />
            </Form.Group>
            <Button className="mt-3" type="submit">Записаться</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default JsonDataDisplay;