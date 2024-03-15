import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  NaviBar  from './components/Navibar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import {List} from './List';
import {Record} from './Record';

function App() {
  return (
    <>
    <Router>
    <NaviBar/>
    <Routes>
      <Route exact path="/" element={<List/>} />
      <Route path="/record" element={<Record />} />
    </Routes>
    </Router>
    </>
  );
  }

export default App;
