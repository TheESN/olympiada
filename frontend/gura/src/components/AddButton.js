import React, {useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios"
import './gg.css';

const data = require("../data/olymp_list.json")

export default function ListTable(){
    const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)
    const CloseWind = () => setShowModal(false)

    const [inputData, setInputData] = useState({name:''})

    // function handleSubmit(event){
    //     event.preventDefault()
    //     fetch('http://localhost:8000/api/getolympiadas',
    //         {
    //             method: 'POST',
    //             body: {
    //                 "name": this.Name.value,
    //                 "beg_date": this.begdate.value,
    //                 "olymp_dura": this.dura
    //             }
    //         })
    //     };

    function handleSubmit(event){
        event.preventDefault()

        axios.post('http://localhost:8000/api/getolympiadas', inputData)
    .then(res => {
            alert("Data added");

        }).catch(err => console.log(err))
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
                <Form onSubmit={handleSubmit} method="POST">
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                            <Form.Control type='text' name="olymp_name" onChange={e => setInputData({...inputData, name: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='date'  name="beg_date" onChange={e => setInputData({...inputData, beg_date: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time'  name="duration" onChange={e => setInputData({...inputData, duration: e.target.value})}/>
                    </Form.Group>
                    <Button className='mt-3' type="submit">Добавить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}