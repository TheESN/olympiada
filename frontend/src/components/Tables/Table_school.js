import { useState, axios, Container, Table, useEffect, Form, Modal, Button } from '../container/imports.js';
import FileUpload from "../FileUploader/FileUploadSchool";

function JsonDataDisplay(id) {
  const [schools, setSchools] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEditSchool, setShowModalEditSchool] = useState(false);

  const handleModalToggle = (modalType) => {
    if (modalType === 'edit')
      setShowModalEditSchool(!showModalEditSchool);
    else setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [schoolsRes, subdRes] = await Promise.all([
        axios.get('http://localhost:8000/api/getschools'),
        axios.get("http://localhost:8000/api/getsubdivisions")
      ])
      setSchools(schoolsRes.data)
      setSubdivisions(subdRes.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:8000/api/school", inputData);
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
    await axios.delete(`http://localhost:8000/api/getschool/${inputData.id}`);
    alert("Удалено");
    handleModalToggle('edit');
    Refresh();
  };

  const handleSchoolSelect = (id) => {
    const school = schools.find(o => o.id === id);
    setInputData(school)
  };

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
  const DisplayData = schools.map((school, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{school.school_name}</td>
      <td>{subdivisionsSelect[school.school_subdivision - 1]}</td>
      <td>
        <Button variant="primary" onClick={() => {handleSchoolSelect(school.id); handleModalToggle('edit');}} >Редактировать</Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Район</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>
      </Container>

      <div className="AddButton">
        <Button onClick={() => handleModalToggle()}>Добавить</Button>
      </div>

      <Modal show={showModal} onHide={() => handleModalToggle()}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить школу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setInputData({ ...inputData, school_name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Район</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setInputData({...inputData, school_subdivision: e.target.value,
                  })
                }
              >
                <option>Выберите район</option>
                {subdivisionsSelect}
              </Form.Select>
            </Form.Group>

            <Button onClick={handleSubmit} className="mt-3">
              Добавить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalEditSchool} onHide={() => handleModalToggle('edit')}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать школу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                defaultValue={inputData.school_name}
                onChange={(e) => setInputData({ ...inputData, school_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Район школы</Form.Label>
              <Form.Select
                type="text"
                defaultValue={inputData.school_subdivision}
                onChange={(e) => setInputData({ ...inputData, school_subdivision: e.target.value })}
              >
                {subdivisionsSelect}
              </Form.Select>
            </Form.Group>
          </Form>
          <Button className="mt-3" type="submit">Редактировать</Button>
          <Button type="submit" onClick={handleDelete} className="ms-2 mt-3">Удалить</Button>
        </Modal.Body>
      </Modal>

      <div className="fileUploadField AddButton">
        <FileUpload />
      </div>
    </>
  );
}

export default JsonDataDisplay;
