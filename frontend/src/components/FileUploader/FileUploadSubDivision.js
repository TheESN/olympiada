import { useState, axios, Button } from '../container/imports.js';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('file', file);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
            console.log("qweqwe", pair[1])
        }

        console.log(file['name'])

        try {
            const response = await axios.put('http://localhost:8000/uploadsubdivision/' + file['name'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <Button type="submit">Загрузить</Button>
        </form>
    );
};

export default FileUpload;
