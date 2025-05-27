import { useState, axios, Container, Table, useEffect, useLocation} from '../container/imports.js';

const ParticipantsData = () => {
    const location = useLocation();
    const olympId = location.state?.data;
    
    const [genders, setGenders] = useState([]);
    const [studentData, setStudentData] = useState([]);

    console.log("studData", olympId)

    useEffect(() => {
    const fetchData = async () => {
      const [genders, studentData] = await Promise.all([
        axios.get("http://localhost:8000/api/getgenders"),
        axios.get(`http://localhost:8000/api/getstudentfromolymp/${olympId}`)
      ]);
      setGenders(genders.data);
      setStudentData(studentData.data);
    };
    fetchData();
  }, []);

    const specN = ["yes", "no"]

    const DisplayData = studentData.map((part, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{part.name}</td>
                <td>{part.birthday}</td>
                <td>{part.course_study}</td>
                <td>{part.special_needs.toString()}</td>
                <td>{part.contact_phone}</td>
                <td>{genders[part.sex]}</td>
                <td>{part.country}</td>
            </tr>
        )
    })

    return (
        <>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Дата рождения</th>
                            <th>Класс обучения</th>
                            <th>Ограниченные возможности</th>
                            <th>Телефон</th>
                            <th>Пол</th>
                            <th>Гражданство</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ParticipantsData;