import React, {useState} from 'react';
import { Button, Container, Form, Modal, Nav, Navbar} from 'react-bootstrap';

import './Design.css';

export default function NaviBar(){

    const [showLog, setShowLog] = useState(false);

    const handleClose = () => {
        setShowLog(false);
        setShowSign(false)
    } 
    const handleShowLogin = () => setShowLog(true);

    const [showSign, setShowSign] = useState(false);

    const handleShowSign = () => setShowSign(true);

    const [inputData, setInputData] = useState({name:''})

    return(
    <>
    <Navbar collapseOnSelect  expand="lg" bg="fon">
        <Container>
            <Navbar.Brand className='mb-1'>Olymp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" variant="underline">
                    <Nav.Link href="/">Список олимпиад</Nav.Link>
                    <Nav.Link href="/application">Список заявок</Nav.Link>
                    <Nav.Link href="/employees">Список ответсвенных</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant='light' className='me-2' onClick={handleShowLogin}>Войти</Button>
                    <Button variant='light' onClick={handleShowSign}>Зарегистрироваться</Button>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

    {/* Модальное окно логина */}
    <Modal show={showLog} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='user_email' placeholder='Введите email' onChange={e => setInputData({...inputData, user_email: e.target.value})}  required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' name='user_password' placeholder='Введите пароль' onChange={e => setInputData({...inputData, user_password: e.target.value})}  required/>
                </Form.Group>
                <Button className='mt-3'>Войти</Button>
            </Form>
        </Modal.Body>
    </Modal>

    {/* Модальное окно реги */}
    <Modal show={showSign} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Фамлилия</Form.Label>
                    <Form.Control type='text' name='user_surname' placeholder='Введите фамилию' onChange={e => setInputData({...inputData, user_surname: e.target.value})}  required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type='text' name='user_name' placeholder='Введите имя' onChange={e => setInputData({...inputData, user_name: e.target.value})}  required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='user_email' placeholder='Введите email' onChange={e => setInputData({...inputData, user_email: e.target.value})}  required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' name='user_password' placeholder='Введите пароль' onChange={e => setInputData({...inputData, user_password: e.target.value})}  required/>
                </Form.Group>
                <Form.Group>
                    <Button className='mt-3'>Зарегистрироваться</Button>
                </Form.Group> 
            </Form>
        </Modal.Body>
    </Modal>
    
    </>
    )
}