import React, { useEffect, useState } from "react";
import {Container, Table } from "react-bootstrap";
import axios from "axios";
import FileUpload from "../FileUploadSubDivision";


function JsonDataDisplay(id) {
  const [subdivisions, setSubdivisions] = useState([]);

  //Запрос списка олимпиады
  useEffect(() => {
    axios.get("http://localhost:8000/api/getsubdivisions").then((res) => {
      setSubdivisions(res.data);
    });
  }, []);

  //Вывод таблицы
  const DisplayData = subdivisions.map((sub, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{sub.subdivision_name}</td>
      </tr>
    );
  });

  return (
    <>
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </Table>

      </Container>

      <div className="fileUploadField AddButton">
        <FileUpload />
      </div>
    </>
  );
}

export default JsonDataDisplay;
