import { useState, axios, Container, Table, useEffect, useLocation} from '../container/imports.js';


const ParticipantsData = () => {
    const location = useLocation();
    const studentData = location.state?.data;

    useEffect(() => {
        axios.get("http://localhost:8000/api/getgenders").then((res) => {
            setGenders(res.data);
        });
    }, []);

    console.log("Data from another page", studentData)

    const [genders, setGenders] = useState([]);

    const specN = ["yes", "no"]

    //Вывод таблицы
    const DisplayData = studentData.map((part, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{part.name}</td>
                <td>{part.birthday}</td>
                <td>{part.course_party}</td>
                <td>{specN[index]}</td>
                <td>{part.contact_phone}</td>
                <td>{genders[index]}</td>
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
                            <th>Огрпниченные возможности</th>
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