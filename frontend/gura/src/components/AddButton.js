import React, {useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import './gg.css';

const data = require("../data/olymp_list.json")

export default function ListTable(){
    const [showModal, setShowModal] = useState(false);

    const ShowWind = () => setShowModal(true)
    const CloseWind = () => setShowModal(false)

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
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control type='text'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type='date' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Длительность</Form.Label>
                        <Form.Control type='time' />
                    </Form.Group>
                    <Button className='mt-3'>Добавить</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}