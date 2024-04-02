import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import schema from "./data/schema.json";
import Table from "./components/Table_new";
import AddButton from "./components/AddButton";

import data from "./data/olymp_list.json"

import { Button } from 'react-bootstrap';

function App() {
  return (
    <>
    <NaviBar/>

    <div className="container p-2">
      <div className="row">
        <div className="col">
          <Table headers={Object.keys(schema)} rows={data} />
        </div>
      </div>
    </div>
    <AddButton/>
    </>
  );
}

export default App;
