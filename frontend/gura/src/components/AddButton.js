import React, {useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios"
import './gg.css';

export default function ListTable(){
    const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)
    const CloseWind = () => setShowModal(false)

    const [inputData, setInputData] = useState({name:''})

    function handleSubmit(event){
        event.preventDefault()

        axios.post('http://localhost:8000/api/olympiada', inputData)
        .then(res => {
            if (res.data.valid === true){
                alert("Данные добавлены");
                console.log(res.data.valid)
            }
            else{
                alert("Неправильно введены данные");
            }
        })
    }

    return (
        <>
        <div className="AddButton">
            <Button onClick={ShowWind}>Добавить</Button>
        </div>
        <Modal show={showModal} onHide={CloseWind}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить олимпиаду</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" onChange={e => setInputData({...inputData, olymp_name: e.target.value})}  required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='datefield'  name="olymp_date_start" onChange={e => setInputData({...inputData, olymp_date_start: e.target.value})} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="olymp_time" onChange={e => setInputData({...inputData, olymp_time: e.target.value})} required/>
                    </Form.Group>
                    <Button className='mt-3' type="submit" >Добавить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}