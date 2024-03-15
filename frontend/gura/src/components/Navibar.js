import React from 'react';
import { Button, Nav, Navbar, Link } from 'react-bootstrap'
import './gg.css'

export default function NaviBar(){
    return(
    <>
    <Navbar collapseOnSelect expand="lg" bg="fon" variant="light">
        <Navbar.Brand>Olymp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link>Список олимпиад</Nav.Link>
                <Nav.Link>Записаться</Nav.Link>
                <Nav.Link>Организаторы</Nav.Link>
            </Nav>
            <Nav>
                <Button variant='primary' className='me-2'>Войти</Button>
                <Button variant='primary'>Зарегистрироваться</Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}