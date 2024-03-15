import React, {useState} from 'react';
import { Button, Form, Modal, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './gg.css';

export default function NaviBar(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
    <>
    <Navbar collapseOnSelect  expand="lg" bg="fon" variant="light">
        <Navbar.Brand>Olymp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link><Link to="/">Список олимпиад</Link></Nav.Link>
                <Nav.Link><Link to="/Record">Записаться</Link></Nav.Link>
            </Nav>
            <Nav>
                <Button variant='primary' className='me-2' onClick={handleShow}>Войти</Button>
                <Button variant='primary' onClick={handleShow}>Зарегистрироваться</Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="fromBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Введите email' />
                </Form.Group>
                <Form.Group controlId="fromBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' placeholder='Введите пароль' />
                </Form.Group>

            </Form>
        </Modal.Body>
    </Modal>
    </>
    )
}