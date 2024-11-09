import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";

function Employee_list(id) {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([])
  const [inputData, setInputData] = useState({});

  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false);
  const [showModalEditEmployee, setShowModalEditEmployee] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);

  const [editEmployee, setEditEmployee] = useState({
    id: -1,
    name: "a",
    sex: -1,
    role: -1,
    user: -1,
  });

  const [editUser, setEditUser] = useState({
    id: -1,
    username: "",
    email: ""
  })

  function findEmployeeById(ID) {
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].id == ID) {
        return employees[i];
      }
    }
  }

  function findUserById(ID) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == ID) {
        return users[i];
      }
    }
  }

  //Показ модальное окно добавления
  const ShowModalAddEmployee = (event) => {
    event.preventDefault();

    setShowModalAddEmployee(true);
  };

  //Закрыть модальное окно
  const CloseWind = () => {
    setShowModalAddEmployee(false)
    setShowModalEditEmployee(false)
  };

  const BackToEmployee = () => {
    setShowModalEditEmployee(true)
    setShowModalEditUser(false)
  }

  //Показ модальное окно редактирования
  const ShowWindEditEmployeeOlymp = (event) => {
    event.preventDefault();

    id = event.target.id;
    let v = findEmployeeById(id)

    setEditEmployee(v);
    setShowModalEditEmployee(true);
  };

  //Показ модальное окно редактирования user
  const ShowWindEditUserOlymp = (event) => {
    event.preventDefault();

    id = event.target.id;
    let v = findUserById(id);

    console.log("after search function - ", v)

    setEditUser(v);
    setShowModalEditEmployee(false)
    setShowModalEditUser(true)
  };

  //Добавление
  function handleSubmit(event) {
    event.preventDefault();

    console.log(inputData);

    axios.post("http://localhost:8000/api/adduser", inputData).then((res) => {
      if (res.data.valid === true) {
        alert("Юзер добавлен");
        console.log(res.data);

        inputData["user"] = res.data.user_id

        axios.post("http://localhost:8000/api/employee", inputData).then((res) => {
          if (res.data.valid === true) {
            alert("Ответсвенный добавлен");
            console.log(res.data);
            setShowModalAddEmployee(false);
            Refresh()
          } else {
            alert("Ответсвенный не добавлен");
          }
        });

      } else {
        alert("Юзер не добавлен");
      }
    });
  }

  //Редактирование ответсвенного
  function SubmitEmployeeEdit(event) {
    event.preventDefault();

    var url =
      "http://localhost:8000/api/getemployee/" + editEmployee.id.toString();

    console.log("avaible roles - ", roles)

    axios.put(url, editEmployee).then((res) => {
      if (res.data.valid === true) {
        alert("Данные обновлены");
        console.log("after update - ", editEmployee);
        
        Refresh();
      } else {
        alert("Неправильно введены данные");
      }
    });
  }

  function SubmitUserEdit(event) {
    event.preventDefault();

    var url =
      "http://localhost:8000/api/getuser/" + editUser.id.toString();

    axios.put(url, editUser).then((res) => {
      if (res.data.valid === true) {
        alert("Данные обновлены");
        console.log("after update - ", editUser);
        
        Refresh();
      } else {
        alert("Неправильно введены данные");
      }
    });
  }

  //Удаление ответственного
  function DeleteSubmit(event) {
    event.preventDefault();

    var url = "http://localhost:8000/api/getemployee/" + editEmployee.id.toString();

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

  //Запрос списка ответственного
  useEffect(() => {
    axios.get("http://localhost:8000/api/getemployees").then((res) => {
      setEmployees(res.data);
      
    });
  }, []);

  //Запрос списка ролей
  useEffect(() => {
    axios.get("http://localhost:8000/api/getroles").then((res) => {
      setRoles(res.data);
    });
  }, []);

  //Запрос списка user
  useEffect(() => {
    axios.get("http://localhost:8000/api/getusers").then((res) => {
      setUsers(res.data);
    });
  }, []);

  //Вывод таблицы
  const DisplayData = employees.map((emp, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{emp.name}</td>
        <td>{roles[emp.role]}</td>
        <td>
          <Button variant="primary" onClick={ShowWindEditEmployeeOlymp} id={emp.id}>
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
        <Table striped>
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

      {/* Модальное окно добваления ответственных */}
      <Modal show={showModalAddEmployee} onHide={CloseWind}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить ответсвенного</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Роль</Form.Label>
              <Form.Select onChange={(e) => setInputData({ ...inputData, role: e.target.value })}>
                <option>Выберите роль</option>
                {rolesSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })}
              />
            </Form.Group>

            <Form.Label>email</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })}
            />

            <Button className="mt-3" type="submit">
              Добавить
            </Button>
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
              <Form.Control
                type="text"
                name="name"
                defaultValue={editEmployee.name}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Роль</Form.Label>
              <Form.Select
                defaultValue={editEmployee.role}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, role: e.target.value })}>
                <option>Выберите роль</option>
                {rolesSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editEmployee.user}
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })
                }
              />
              <Button className="mt-2" onClick={ShowWindEditUserOlymp} id={editEmployee.user}>Edit user</Button>
            </Form.Group>

            <Button className="mt-3" type="submit" onClick={SubmitEmployeeEdit}>
              Обновить
            </Button>
            <Button variant="danger" className="ms-2 mt-3" type="submit" onClick={DeleteSubmit}>
              Удалить
            </Button>

          </Form>
        </Modal.Body>
      </Modal>

      {/* Модальное окно редактриованния user */}
      <Modal show={showModalEditUser} onHide={BackToEmployee}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить ответсвенного</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editUser.username}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button className="mt-3" type="submit" onClick={SubmitUserEdit}>
              Обновить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Employee_list;
