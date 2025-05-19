import { useState, axios, Button, Container, Table, Form, useEffect } from '../container/imports.js';

function JsonDataDisplay(id) {
	const [countries, setCountries] = useState([])

	//Запрос списка олимпиады
	useEffect(() => {
		axios.get('http://localhost:8000/api/getcountries')
			.then(res => {
				setCountries(res.data)
			})
	}, [])

	//Вывод таблицы
	const DisplayData = countries.map((countrie, index) => {
		return (
			<tr>
				<td>{index + 1}</td>
				<td>{countrie.country_name}</td>
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
							<th>Название</th>
						</tr>
					</thead>
					<tbody>
						{DisplayData}
					</tbody>
				</Table>
			</Container>

			<div className="fileUploadField AddButton">
				<Form.Control type="file" />
				<Button className="mt-3">Загрузить</Button>
			</div>
		</>
	)
}

export default JsonDataDisplay;