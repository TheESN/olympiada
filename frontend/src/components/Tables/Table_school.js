import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Component } from "react";

function JsonDataDisplay(id) {
  const [schools, setSchools] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalEditSchool, setShowModalEditSchool] = useState(false);

  const ShowWindAdd = () => setShowModal(true);
  const ShowWindEdit = (event) => {
    event.preventDefault();

    id = event.target.id;
    let v = findSchoolById(id);
    setInputData(v);
    setShowModalEditSchool(true);
  };

  const CloseWind = () => {
    setShowModalEditSchool(false);
    setShowModal(false);
  };

  function findSchoolById(Id) {
    for (let i = 0; i < schools.length; i++) {
      if (schools[i].id == Id) {
        return schools[i];
      }
    }
  }

  //Запрос списка олимпиады
  useEffect(() => {
    axios.get("http://localhost:8000/api/getschools").then((res) => {
      setSchools(res.data);
    });

    console.log("wqe")
  }, []);

  //Запрос списка улусов
  useEffect(() => {
    axios.get("http://localhost:8000/api/getsubdivisions").then((res) => {
      setSubdivisions(res.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:8000/api/school", inputData).then((res) => {
      if (res.data.valid === true) {
        alert("Данные добавлены");
        setShowModal(false);
        Refresh();
      } else {
        console.log(inputData);
        alert("Неправильно введены данные");
      }
    });
  }

  function editSubmit(event){
    event.preventDefault()

    var url = "http://localhost:8000/api/getschool/" + inputData.id.toString();

    console.log("Edit clicked")

    axios.put(url, inputData).then((res) => {
      if (res.data.valid === true){
        alert("Данные обновлены");
        console.log(res.data);
        setShowModalEditSchool(false);
        Refresh();
      }else {
        alert("Неправильно введены данные");
        console.log(res.data);
      }
    })
  }

  function deleteSubmit(event) {
    event.preventDefault();

    var url = "http://localhost:8000/api/getschool/" + inputData.id.toString();

    console.log(inputData);

    axios.delete(url).then(() => {
      alert("Deleted");
      setShowModalEditSchool(false);
      Refresh();
    });
  }

  const subdivisionsSelect = subdivisions.map((subdivision) => {
    return (
      <option value={subdivision.id}>{subdivision.subdivision_name}</option>
    );
  });

  function Refresh() {
    axios.get("http://localhost:8000/api/getschools").then((res) => {
      setSchools(res.data);
    });
  }

  //Вывод таблицы
  const DisplayData = schools.map((school, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{school.school_name}</td>
        <td>{subdivisionsSelect[school.school_subdivision - 1]}</td>
        <td>
          <Button variant="primary" onClick={ShowWindEdit} id={school.id}>
            Edit
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>subdivision</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </Container>

      <div className="AddButton">
        <Button onClick={ShowWindAdd}>Добавить</Button>
      </div>

      <Modal show={showModal} onHide={CloseWind}>
        <Modal.Header closeButton>
          <Modal.Title>Add school</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, school_name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Subdivision</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    school_subdivision: e.target.value,
                  })
                }
              >
                <option>Select a subdivision</option>
                {subdivisionsSelect}
              </Form.Select>
            </Form.Group>

            <Button onClick={handleSubmit} className="mt-3">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalEditSchool} onHide={CloseWind}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
              type="text"
              defaultValue={inputData.school_name}
              onChange={(e) => setInputData({...inputData, school_name: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subdivision school</Form.Label>
              <Form.Select
              type="text"
              defaultValue={inputData.school_subdivision}
              onChange={(e) => setInputData({...inputData, school_subdivision: e.target.value})}
              >
                {subdivisionsSelect}
              </Form.Select>
            </Form.Group>
          </Form>
          <Button className="mt-3" onClick={editSubmit}>Edit</Button>
          <Button type="submit" onClick={deleteSubmit} className="ms-2 mt-3">
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default JsonDataDisplay;
