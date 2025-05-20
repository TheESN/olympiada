import { useState, axios, Button, Container, Table, Form, Modal, useEffect } from '../container/imports.js';

function Employee_list() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({});
  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false);
  const [showModalEditEmployee, setShowModalEditEmployee] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (modalType) => {
    if (modalType === 'edit')
      setShowModalEditEmployee(!showModalEditEmployee);
    else if (modalType === 'editUser') {
      setShowModalEditUser(!showModalEditUser);
      setShowModalEditEmployee(!showModalEditEmployee);
    }
    else setShowModal(!showModal);
  };

  const handleEmployeeSelect = (id) => {
    const emp = employees.find(o => o.id === id)
    const user = users.find(o => o.id === emp.user)
    emp['username'] = user.username
    emp['email'] = user.email
    console.log(emp)
    setInputData(emp)
  }

  const handleUserSelect = (id) => {
    const user = users.find(o => o.id === id)
    console.log(user)
    setInputData(user)
  }

  const ShowModalAddEmployee = (event) => {
    event.preventDefault();

    setShowModalAddEmployee(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = axios.post("http://localhost:8000/api/adduser", inputData)
    if (res.data.valid === true) {
      alert("Юзер добавлен");

      inputData["user"] = res.data.user_id;

      const res = axios.post("http://localhost:8000/api/employee", inputData)
      console.log(inputData)
      alert(res.data.valid ? "Ответсвенный добавлен" : "Неправильно введены данные");
      if (res.data.valid) {
        handleModalToggle();
        Refresh();
      }
    } else {
      alert("Юзер не добавлен");
    }
  }

  const handleEditEmployeeSubmit = async (event) => {
    event.preventDefault()
    const res = await axios.put(`http://localhost:8000/api/getemployee/${inputData.id}`, inputData)
    alert(res.data.valid ? "Данные добавлены" : "Неправильно введены данные");
    if (res.data.valid) {
      handleModalToggle('edit');
      Refresh();
    }
  }

  const SubmitUserEdit = async (event) => {
    event.preventDefault();
    const res = await axios.put(`http://localhost:8000/api/getuser/${inputData.id}`, inputData)
    alert(res.data.valid ? "Данные добавлены" : "Неправильно введены данные");
    if (res.data.valid) {
      handleModalToggle('edit');
      Refresh();
    }
  }

  function DeleteSubmit(event) {
    event.preventDefault();

    var url =
      "http://localhost:8000/api/getemployee/" + inputData.id.toString();

    axios.delete(url).then((res) => {
      setShowModalEditEmployee(false);
      alert("Удалено");
    });
  }

  function Refresh() {
    axios.get("http://localhost:8000/api/getemployees").then((res) => {
      setEmployees(res.data);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const [employeeRes, roleRes, userRes] = await Promise.all([
        axios.get("http://localhost:8000/api/getemployees"),
        axios.get("http://localhost:8000/api/getroles"),
        axios.get("http://localhost:8000/api/getusers"),
      ]);
      setEmployees(employeeRes.data);
      setRoles(roleRes.data)
      setUsers(userRes.data);
    };
    fetchData();
  }, []);

  const DisplayData = employees.map((emp, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{emp.name}</td>
        <td>{roles[emp.role]}</td>
        <td>
          <Button variant="primary" onClick={() => { handleEmployeeSelect(emp.id); handleModalToggle('edit') }}>
            Изменить
          </Button>
        </td>
      </tr>
    );
  });

  const rolesSelect = Object.entries(roles).map(([key, value]) => {
    return <option value={key}>{value}</option>;
  });

  return (
    <>
      <Container>
        <Table striped className="mt-3 table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>ФИО</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </Container>

      <div className="AddButton">
        <Button onClick={ShowModalAddEmployee}>Добавить</Button>
      </div>

      <Modal show={showModalAddEmployee} onHide={() => handleModalToggle()}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить ответсвенного</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Роль</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputData({ ...inputData, role: e.target.value })}
              >
                <option>Выберите роль</option>
                {rolesSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })}
              />
            </Form.Group>

            <Form.Label>Эл/почта</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })}
            />
            <Button className="mt-3" type="submit">Добавить</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalEditEmployee} onHide={() => handleModalToggle('edit')}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить ответсвенного</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditEmployeeSubmit}>
            <Form.Group>
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text" defaultValue={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })} required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Роль</Form.Label>
              <Form.Select
                defaultValue={inputData.role}
                onChange={(e) =>
                  setInputData({ ...inputData, role: e.target.value })}
              >
                <option>Выберите роль</option>
                {rolesSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Имя пользователя</Form.Label>
              <p className="ms-2">{inputData.username}</p>
              <Button
                className="mt-2"
                onClick={() => { handleUserSelect(inputData.user); handleModalToggle('editUser') }}
              >
                Редактировать пользователя
              </Button>
            </Form.Group>

            <Button className="mt-3" type="submit">Обновить</Button>
            <Button className="ms-2 mt-3" type="submit" onClick={DeleteSubmit}>Удалить</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalEditUser} onHide={() => handleModalToggle('editUser')}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить ответсвенного</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text" defaultValue={inputData.username}
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text" defaultValue={inputData.email}
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button className="mt-3" type="submit" onClick={SubmitUserEdit}>Обновить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Employee_list;