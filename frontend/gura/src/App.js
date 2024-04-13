import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import schema from "./data/schema.json";
import TableNew from "./components/Table_new";
import AddButton from "./components/AddButton";

import data from "./data/olymp_list.json"
import JsonDataDisplay from './components/Table_three';

function App() {
  return (
    <>
    <NaviBar/>
    {/* способ номер 2 */}
    {/* <div className="container p-2">
      <div className="row">
        <div className="col">
          <TableNew headers={Object.keys(schema)} rows={data} />
        </div>
      </div>
    </div> */}
    
    {/* способ номер 3 */}
    <div>
      <JsonDataDisplay />
    </div>
    <AddButton/>
    </>
  );
}

export default App;
