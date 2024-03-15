import React from "react";
import { Table } from "react-bootstrap";
import './gg.css';

export default function ListTable(){
    return (
        <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th scope="col">Олимпиада</th>
                <th scope="col">Дата</th>
                <th scope="col">Организаторы</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>СВОШ по информатике</td>
                    <td>23/04/25</td>
                    <td>СОШ №5</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>СВОШ по информатике</td>
                    <td>23/04/25</td>
                    <td>СОШ №5</td>
                </tr>
            </tbody>
        </Table>
    )
}