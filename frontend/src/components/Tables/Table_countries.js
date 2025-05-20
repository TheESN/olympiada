import { useState, axios, Container, Table, useEffect } from '../container/imports.js';

function JsonDataDisplay(id) {
	const [countries, setCountries] = useState([])

	useEffect(() => {
		axios.get('http://localhost:8000/api/getcountries')
			.then(res => {
				setCountries(res.data)
			})
	}, [])

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

			{/* Добавить загрузчик файла */}
		</>
	)
}

export default JsonDataDisplay;