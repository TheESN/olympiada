import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import db from "./data/olymp_list.json";
import schema from "./data/schema.json";
import Table from "./components/Table_new";

import {
  BrowserRouter as Router
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Button, Tab } from 'react-bootstrap';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(db);
      }, 1000);
    }).then(result => {
      setData(result);
    });
  });
  return (
    <>
    <Router>
    <NaviBar/>
    <div className="container p-2">
      <div className="row">
        <div className="col">
          <Table headers={Object.keys(schema)} rows={data} />
        </div>
      </div>
    </div>
    </Router>
    </>
  );
  }

export default App;
