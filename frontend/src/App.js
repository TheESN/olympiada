import './components/Design.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import React from 'react';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import JsonDataDisplay from './components/Tables/Table_olymp';
import Appli_list from './components/Tables/Table_Application';
import Employee_list from './components/Tables/Table_employee';
import Student_list from './components/Tables/Table_students';
import School_list from './components/Tables/Table_school';
import Subdivision_list from './components/Tables/Table_subdivision';
import Country_list from './components/Tables/Table_countries';

function App() {
  return (
    <>
    <NaviBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JsonDataDisplay />}></Route>
        <Route path='/application' element={<Appli_list />}></Route>
        <Route path='/employees' element={<Employee_list />}></Route>
        <Route path='/students' element={<Student_list />}></Route>
        <Route path='/schools' element={<School_list />}></Route>
        <Route path='/subdivisions' element={<Subdivision_list />}></Route>
        <Route path='/countries' element={<Country_list />}></Route>
      </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;