import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"

function JsonDataDisplay(id) {
    const [showModalEditStud, setShowModalEditStud] = useState(false);
    const [students, setStudents] = useState([])
    const [genders, setGenders] = useState([]);
    const [inputData, setInputData] = useState({ applied_olymp_id: '' })
    const [specNeeds] = useState(
        {
            "true": "Есть",
            "false": "Нет"
        }
    )
    const specN = ["yes", "no"]
    const [showModal, setShowModal] = useState(false);

    const genderSelect = Object.entries(genders).map(([key, value]) => {
        return <option value={key}>{value}</option>;
    });

    const specNeedsSelect = Object.entries(specNeeds).map(([key, value]) => {
        return <option value={key}>{value}</option>;
    });

    const handleModalToggle = (modalType) => {
        if (modalType === 'edit')
            setShowModalEditStud(!showModalEditStud);

        else setShowModal(!showModal);
        console.log(inputData)
    };

    const handleStudentSelect = (id) => {
        const student = students.find(o => o.id === id);
        setInputData(student)
        console.log(inputData)
    };

    useEffect(() => {
        const fetchData = async () => {
            const [studentRes, gednersRes] = await Promise.all([
                axios.get('http://localhost:8000/api/getstudents'),
                axios.get("http://localhost:8000/api/getgenders")
            ])
            setStudents(studentRes.data)
            setGenders(gednersRes.data)
        }
        fetchData()
    }, [])

    //Добавление
    function handleSubmit(event) {
        event.preventDefault()

        axios.post('http://localhost:8000/api/olympiada', inputData)
            .then(res => {
                if (res.data.valid === true) {
                    alert("Данные добавлены");
                    console.log(res.data.valid)
                }
                else {
                    alert("Неправильно введены данные");
                }
            })
    }
    console.log(specNeeds['false'])
    //Вывод таблицы
    const DisplayData = students.map((stud, index) => (
        <tr>
            <td>{index + 1}</td>
            <td><a href='#' onClick={() => { handleStudentSelect(stud.id); handleModalToggle('edit') }}>{stud.name}</a></td>
            <td>{stud.birthday}</td>
            <td>{stud.course_study}</td>
            <td>{specN[index]}</td>
            <td>{stud.contact_phone}</td>
            <td>{genders[index]}</td>
            <td>{stud.country}</td>
        </tr>
    ))
    console.log(genders)
    return (
        <>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Дата рождения</th>
                            <th>Класс обучения</th>
                            <th>Special needs</th>
                            <th>Телефон</th>
                            <th>Пол</th>
                            <th>Гражданство</th>
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
                    <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                onChange={e => setInputData({ ...inputData, name: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type='date' placeholder='YYYY-MM-DD'
                                onChange={e => setInputData({ ...inputData, birthday: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select onChange={(e) => setInputData({ ...inputData, sex: e.target.value })}>
                                <option>Выберите пол</option>
                                {genderSelect}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>course_study</Form.Label>
                            <Form.Control type='number'
                                onChange={e => setInputData({ ...inputData, course_study: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Special needs</Form.Label>
                            <Form.Select onChange={(e) => setInputData({ ...inputData, sex: e.target.value })}>
                                <option>Выберите пол</option>
                                {specNeedsSelect}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type='number'
                                onChange={e => setInputData({ ...inputData, contact_phone: e.target.value })}
                                required />
                        </Form.Group>
                        <Button className='mt-3' type='submit'>
                            Save
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showModalEditStud} onHide={() => handleModalToggle()}>
                <Modal.Header closeButton>
                    <Modal.Title>asd</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                defaultValue={inputData.name}
                                onChange={e => setInputData({ ...inputData, name: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type='date' placeholder='YYYY-MM-DD'
                                defaultValue={inputData.birthday}
                                onChange={e => setInputData({ ...inputData, birthday: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                onChange={(e) => setInputData({ ...inputData, sex: e.target.value })}>
                                <option>Выберите пол</option>
                                {genderSelect}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>course_study</Form.Label>
                            <Form.Control type='number'
                                onChange={e => setInputData({ ...inputData, course_study: e.target.value })}
                                required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Special needs</Form.Label>
                            <Form.Select
                                onChange={(e) => setInputData({ ...inputData, special_needs: e.target.value })}>
                                <option>Ограниченные возможности</option>
                                {specNeedsSelect}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type='number'
                                defaultValue={inputData.contact_phone}
                                onChange={e => setInputData({ ...inputData, contact_phone: e.target.value })}
                                required />
                        </Form.Group>
                        <Button className='mt-3' type='submit'>
                            Save
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JsonDataDisplay;