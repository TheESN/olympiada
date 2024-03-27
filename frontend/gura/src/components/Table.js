import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import './gg.css';

export default function ListTable(){
    return (
        <Container>
        <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th scope="col">Олимпиада</th>
                <th scope="col">Дата</th>
                <th scope="col">Организаторы</th>
                <th scope="col">Длительность</th>
                <th scope="col">Запись</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td><a href="#">СВОШ по информатике</a></td>
                    <td>23/04/25</td>
                    <td>СОШ №5</td>
                    <td>2 часа</td>
                    <div>
                        <Button variant="outline-primary" size="sm" className="TabList">Записаться</Button>
                    </div>
                    
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>СВОШ по информатике</td>
                    <td>23/04/25</td>
                    <td>СОШ №5</td>
                    <td>2 часа 55 минут</td>
                    <div>
                        <Button variant="outline-primary" size="sm" className="TabList">Записаться</Button>
                    </div>
                </tr>
            </tbody>
        </Table>
        </Container>
    )
}