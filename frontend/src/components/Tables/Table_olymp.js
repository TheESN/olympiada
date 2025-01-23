import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Component } from "react";

function JsonDataDisplay(id) {
  const [showModalEditOlymp, setShowModalEditOlymp] = useState(false);

  const [showModalRegister, setShowModalRegister] = useState(false);

  const [olymps, setOlymps] = useState([]);
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [schools, setSchools] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);

  const [editOlymp, setEditOlymp] = useState({
    id: -1,
    olymp_name: "",
    olymp_date_start: "",
    olymp_time: "",
  });

  const [showModal, setShowModal] = useState(false);

  const ShowWind = () => setShowModal(true);

  const [inputData, setInputData] = useState({});
  const [inputAppData, setInputAppData] = useState({});

  //Показ модальное окно редактирования
  const ShowWindEditOlymp = (event) => {
    event.preventDefault();

    id = event.target.id;
    let v = findOlympById(id);
    setEditOlymp(v);
    setShowModalEditOlymp(true);
  };

  //Показ модальное окно записи
  const ShowModalRegister = (event) => {
    event.preventDefault();

    id = event.target.id;
    let v = findOlympById(id);
    setInputAppData({ olymp: v });
    setShowModalRegister(true);
  };

  //Закрыть модальное окно
  const CloseWind = () => {
    setShowModalEditOlymp(false);
    setShowModalRegister(false);
    setShowModal(false);
  };

  //Запрос списка олимпиады
  useEffect(() => {
    axios.get("http://localhost:8000/api/getolympiadas").then((res) => {
      setOlymps(res.data);
    });
  }, []);

  //Запрос списка студентов
  useEffect(() => {
    axios.get("http://localhost:8000/api/getstudents").then((res) => {
      setStudents(res.data);
    });
  }, []);

  //Запрос списка ответственных
  useEffect(() => {
    axios.get("http://localhost:8000/api/getemployees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  //Запрос списка школ
  useEffect(() => {
    axios.get("http://localhost:8000/api/getschools").then((res) => {
      setSchools(res.data);
    });
  }, []);

  //Запрос списка учителей
  useEffect(() => {
    axios.get("http://localhost:8000/api/getemployees").then((res) => {
      setTeachers(res.data);
    });
  }, []);

  //Запрос списка улусов
  useEffect(() => {
    axios.get("http://localhost:8000/api/getsubdivisions").then((res) => {
      setSubdivisions(res.data);
    });
  }, []);

  const studentsSelect = students.map((student, index) => {
    return <option value={index}>{student.name}</option>;
  });

  const employeesSelect = employees.map((employee, index) => {
    return <option value={employee.id}>{employee.name}</option>;
  });

  const schoolsSelect = schools.map((school, index) => {
    return <option value={index}>{school.school_name}</option>;
  });

  const teachersSelect = teachers.map((teacher, index) => {
    return <option value={teacher.id}>{teacher.name}</option>;
  });

  const subdivisionsSelect = subdivisions.map((subdivision, index) => {
    return <option value={index}>{subdivision.subdivision_name}</option>;
  });

  //Добавление олимпиады
  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:8000/api/olympiada", inputData).then((res) => {
      if (res.data.valid === true) {
        alert("Данные добавлены");
        console.log(res.data.valid);
        Refresh();
      } else {
        alert("Неправильно введены данные");
      }
    });
  }

  //Редактирование олимпиады
  function SubmitEdit(event) {
    event.preventDefault();

    console.log(editOlymp);

    var url =
      "http://localhost:8000/api/getolympiada/" + editOlymp.id.toString();

    axios.put(url, editOlymp).then((res) => {
      if (res.data.valid === true) {
        alert("Данные обновлены");
        console.log(res.data);
        Refresh();
      } else {
        alert("Неправильно введены данные");
        console.log(res.data);
      }
    });
  }

  //Удаление олимпиады
  function DeleteSubmit(event) {
    event.preventDefault();

    var url =
      "http://localhost:8000/api/getolympiada/" + editOlymp.id.toString();

    axios.delete(url).then((res) => {
      alert("Удаленео");
      Refresh();
    });
  }

  //Application register
  function RegisterSubmit(event) {
    event.preventDefault();

    inputAppData["status"] = 0;

    var url = "http://localhost:8000/api/application";

    axios.post(url, inputAppData).then((res) => {
      if (res.data.valid === true) {
        alert("Данные добавлены");
      } else {
        alert("Неправильно введены данные");
        console.log(inputAppData);
      }
    });
  }

  //Вывод таблицы
  const DisplayData = olymps.map((olymp, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>
          <a href="#" onClick={ShowWindEditOlymp} id={olymp.id}>
            {olymp.olymp_name}
          </a>
        </td>
        <td>{olymp.olymp_date_start}</td>
        <td>{olymp.olymp_time}</td>
        <td>
          <Button variant="primary" onClick={ShowModalRegister} id={olymp.id}>
            Записаться
          </Button>
        </td>
      </tr>
    );
  });

  //Поиск олимпиады по айди
  function findOlympById(ID) {
    for (var i = 0; i < olymps.length; i++) {
      if (olymps[i].id == ID) {
        return olymps[i];
      }
    }
  }

  function Refresh() {
    axios.get("http://localhost:8000/api/getolympiadas").then((res) => {
      setOlymps(res.data);
    });
  }

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
        <Button onClick={ShowWind} className="add_btn">
          Добавить
        </Button>
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
              <Form.Control
                type="text"
                name="olymp_name"
                onChange={(e) =>
                  setInputData({ ...inputData, olymp_name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Дата начала</Form.Label>
              <Form.Control
                type="datefield"
                name="olymp_date_start"
                placeholder="ГГГГ-ММ-ДД"
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    olymp_date_start: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Время начала</Form.Label>
              <Form.Control
                type="time"
                name="olymp_time"
                onChange={(e) =>
                  setInputData({ ...inputData, olymp_time: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button className="mt-3" type="submit">
              Добавить
            </Button>
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
              <Form.Control
                type="text"
                name="olymp_name"
                defaultValue={editOlymp.olymp_name}
                onChange={(e) =>
                  setEditOlymp({ ...editOlymp, olymp_name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Дата начала</Form.Label>
              <Form.Control
                type="datefield"
                name="olymp_date_start"
                defaultValue={editOlymp.olymp_date_start}
                onChange={(e) =>
                  setEditOlymp({
                    ...editOlymp,
                    olymp_date_start: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Длительность</Form.Label>
              <Form.Control
                type="time"
                name="olymp_time"
                defaultValue={editOlymp.olymp_time}
                onChange={(e) =>
                  setEditOlymp({ ...editOlymp, olymp_time: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button className="mt-3" type="submit" onClick={SubmitEdit}>
              Обновить
            </Button>
            <Button
              variant="danger"
              className="ms-2 mt-3"
              type="submit"
              onClick={DeleteSubmit}
            >
              Удалить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Модальное окно записи */}
      <Modal show={showModalRegister} onHide={CloseWind}>
        <Modal.Header closeButton>
          <Modal.Title>Подать заявку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={RegisterSubmit}>
            <Form.Group>
              <Form.Label>Student</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputAppData({
                    ...inputAppData,
                    student: students[e.target.value],
                  })
                }
              >
                <option>Select a student</option>
                {studentsSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>School</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputAppData({
                    ...inputAppData,
                    school: schools[e.target.value],
                  })
                }
              >
                <option>Select a school</option>
                {schoolsSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Subdivision</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputAppData({
                    ...inputAppData,
                    subdivision: subdivisions[e.target.value],
                  })
                }
              >
                <option>Select a subdivision</option>
                {subdivisionsSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Teacher</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputAppData({
                    ...inputAppData,
                    teacher: e.target.value,
                  })
                }
              >
                <option>Select a teacher</option>
                {teachersSelect}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Participate</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) =>
                  setInputAppData({
                    ...inputAppData,
                    participate: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Button className="mt-3" type="submit">
              Записаться
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default JsonDataDisplay;
