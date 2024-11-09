import React, { useEffect, useState, useRef } from 'react'
import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import axios from "axios"
import { Component } from 'react'

function JsonDataDisplay(id) {
    const [showModalEditStud, setShowModalEditStud] = useState(false);

    const [showModalRegister, setShowModalRegister] = useState(false);

    const [students, setStudents] = useState([])

    const [editStudent, setEditStudent] = useState({
        "id": -1,
        "name": "",
        "birthday": "",
        "course_study": -1,
        "course_participate": -1,
        "special_needs": false,
        "teacher": -1,
        "contact_phone": "-1"
    }
    );

    const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)

    const [inputData, setInputData] = useState({ applied_olymp_id: '' })
    const [inputAppData, setInputAppData] = useState({})

    //Показ модальное окно редактирования
    const ShowWindEditStud = (event) => {
        event.preventDefault();

        id = event.target.id;
        let v = findStudById(id);
        setEditStudent(v);
        setShowModalEditStud(true)
    }

    //Показ модальное окно записи
    const ShowModalRegister = (event) => {
        event.preventDefault();

        setShowModalRegister(true)
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

    //Добавление олимпиады
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

    //Удаление олимпиады
    function DeleteSubmit(event) {
        event.preventDefault()

        var url = "http://localhost:8000/api/getolympiada/" + editStudent.id.toString();

        axios.delete(url)
            .then(res => {
                alert("Удаленео");
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
                <td>{stud.course_participate}</td>
                <td>{stud.special_needs}</td>
                <td>{stud.teacher}</td>
                <td>{stud.contact_phone}</td>
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
                            <th>Класс участия</th>
                            <th>Инвалидность</th>
                            <th>Учитель</th>
                            <th>Телефон</th>
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
                            <Form.Control type='text' name='stud_name'
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                            required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JsonDataDisplay;