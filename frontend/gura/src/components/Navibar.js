import React, {useState} from 'react';
import { Button, Form, Modal, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './gg.css';

export default function NaviBar(){

    const [showLog, setShowLog] = useState(false);

    const handleCloseLog = () => setShowLog(false);
    const handleShowLogin = () => setShowLog(true);

    const [showSign, setShowSign] = useState(false);

    const handleCloseSign = () => setShowSign(false);
    const handleShowSign = () => setShowSign(true);

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
                <Button variant='primary' className='me-2' onClick={handleShowLogin}>Войти</Button>
                <Button variant='primary' onClick={handleShowSign}>Зарегистрироваться</Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Modal show={showLog} onHide={handleCloseLog}>
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
    <Modal show={showSign} onHide={handleCloseSign}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="fromBasicEmail">
                    <Form.Label>Фамлилия</Form.Label>
                    <Form.Control type='text' placeholder='Введите фамилию' />
                </Form.Group>
                <Form.Group controlId="fromBasicEmail">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type='text' placeholder='Введите имя' />
                </Form.Group>
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