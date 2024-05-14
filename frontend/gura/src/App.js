import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import React from 'react';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import JsonDataDisplay from './components/Table_olymp';
import Appli_list from './components/Table_Application';
import Employee_list from './components/Table_employee';

function App() {
  return (
    <>
    <NaviBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JsonDataDisplay />}></Route>
        <Route path='/application' element={<Appli_list />}></Route>
        <Route path='/employees' element={<Employee_list />}></Route>
      </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;