import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';
import AddButton from "./components/AddButton";

import data from "./data/olymp_list.json"
import JsonDataDisplay from './components/Table_three';

function App() {
  return (
    <>
    <NaviBar/>
    
    {/* способ номер 3 */}
    <div>
      <JsonDataDisplay />
    </div>
    <AddButton/>
    </>
  );
}

export default App;
