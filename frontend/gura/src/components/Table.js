import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import './gg.css';

const data = require("../data/olymp_list.json")

export default function ListTable(){
    return (
        <Container>
        <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th scope="col">Олимпиада</th>
                <th scope="col">Дата</th>
                <th scope="col">Длительность</th>
                <th scope="col">Запись</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">{tablist.id}</th>
                    <td>{tablist.olymp_name}</td>
                    <td>{tablist.olymp_date_start}</td>
                    <td>{tablist.time}</td>
                    <div>
                        <Button variant="outline-primary" size="sm" className="TabList">Записаться</Button>
                    </div>
                </tr>
            </tbody>
        </Table>
        </Container>
    )
}