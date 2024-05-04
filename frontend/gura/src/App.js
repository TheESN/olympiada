import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import AddButton from "./components/AddButton";
import React from 'react';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';


import JsonDataDisplay from './components/Table_olymp';
import appli_list from './components/Table_Application';

function App() {
  return (
    <>
    <NaviBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<JsonDataDisplay />}></Route>
        <Route path='/application' element={<appli_list />}></Route>
      </Routes>
    </BrowserRouter>
    
    <AddButton/>
    </>
  );
}

export default App;
