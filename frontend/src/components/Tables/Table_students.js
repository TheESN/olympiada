import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { Component } from 'react'

function JsonDataDisplay(id) {
    const [showModalEditStud, setShowModalEditStud] = useState(false);

    const [showModalRegister, setShowModalRegister] = useState(false);

    const [students, setStudents] = useState([])
    
    const [genders, setGenders] = useState([]);
    const genderSelect = Object.entries(genders).map(([key, value]) => {
        return <option value={key}>{value}</option>;
    });

    const [specNeeds] = useState(
        {
            "true": "Есть",
            "false": "Нет"
        }
    )

    const specN = [ "yes", "no"]
    const specNeedsSelect = Object.entries(specNeeds).map(([key, value]) => {
        return <option value={key}>{value}</option>;
    });
 

    const [editStudent, setEditStudent] = useState({
        "id": -1,
        "name": "",
        "birthday": "",
        "course_study": -1,
        "special_needs": false,
        "contact_phone": "-1",
        "sex": -1,
        "country": ""
    }
    );

    const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)

    const [inputData, setInputData] = useState({ applied_olymp_id: '' })

    //Показ модальное окно редактирования
    const ShowWindEditStud = (event) => {
        event.preventDefault();

        id = event.target.id;
        let v = findStudById(id);
        setEditStudent(v);
        setShowModalEditStud(true)
    }

    //Закрыть модальное окно
    const CloseWind = () => {
        setShowModalEditStud(false)
        setShowModalRegister(false)
        setShowModal(false)
    }
    
    //Запрос списка олимпиады
    useEffect(() => {
        axios.get('http://localhost:8000/api/getstudents')
        .then(res => {
            setStudents(res.data)
        })
    }, [])

    console.log(specNeeds)

    //get genders
    useEffect(() => {
        axios.get("http://localhost:8000/api/getgenders").then((res) => {
          setGenders(res.data);
          
        });
    }, []);

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

    //Вывод таблицы
    const DisplayData = students.map((stud, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td><a href='#' onClick={ShowWindEditStud} id={stud.if}>{stud.name}</a></td>
                <td>{stud.birthday}</td>
                <td>{stud.course_study}</td>
                <td>{specN[index]}</td>
                <td>{stud.contact_phone}</td>
                <td>{genders[index]}</td>
                <td>{stud.country}</td>
            </tr>
        )
    })

    //Поиск олимпиады по айди
    function findStudById(ID) {
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == ID) {
                return students[i];
            }
        }
    }

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
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
            </Container>

            <div className="AddButton">
                <Button onClick={ShowWind}>Добавить</Button>
            </div>

            <Modal show={showModal} onHide={CloseWind}>
                <Modal.Header closeButton>
                    <Modal.Title>asd</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                            required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type='date' placeholder='YYYY-MM-DD'
                                onChange={e => setInputData({...inputData, birthday: e.target.value})}
                                required/>
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
                                onChange={e => setInputData({...inputData, course_study: e.target.value})}
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
                                onChange={e => setInputData({...inputData, contact_phone: e.target.value})}
                                required />
                        </Form.Group>

                        
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showModalEditStud} onHide={CloseWind}>
                <Modal.Header closeButton>
                    <Modal.Title>asd</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                            required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type='date' placeholder='YYYY-MM-DD'
                                onChange={e => setInputData({...inputData, birthday: e.target.value})}
                                required/>
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
                                onChange={e => setInputData({...inputData, course_study: e.target.value})}
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
                                onChange={e => setInputData({...inputData, contact_phone: e.target.value})}
                                required />
                        </Form.Group>

                        
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JsonDataDisplay;