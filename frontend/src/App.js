import './components/Design.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import React from 'react';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import JsonDataDisplay from './components/Tables/Table_olymp';
import AppliList from './components/Tables/Table_Application';
import EmployeeList from './components/Tables/Table_employee';
import StudentList from './components/Tables/Table_students';
import SchoolList from './components/Tables/Table_school';
import SubdivisionList from './components/Tables/Table_subdivision';
import CountryList from './components/Tables/Table_countries';
import ParticipantsList from './components/Tables/Table_Participants';

function App() {
  return (
    <>
    <NaviBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JsonDataDisplay />}></Route>
        <Route path='/application' element={<AppliList />}></Route>
        <Route path='/employees' element={<EmployeeList />}></Route>
        <Route path='/students' element={<StudentList />}></Route>
        <Route path='/schools' element={<SchoolList />}></Route>
        <Route path='/subdivisions' element={<SubdivisionList />}></Route>
        <Route path='/countries' element={<CountryList />}></Route>
        <Route path='/participants/:id' element={<ParticipantsList />}></Route>
      </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;