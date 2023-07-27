// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import EmpAdd from './component/EmpAdd';
import EmpAll from './component/EmpAll';
import EmpDel from './component/EmpDel';
import EmpUpd from './component/EmpUpd';
import JobAll from './component/JobAll';

import EmpAllSorted from './component/EmpAllSorted';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<EmpAll />} /> */}
          <Route path='/' element={<EmpAllSorted />} />
          <Route path='/add' element={<EmpAdd />} />
          <Route path='/upd/:id' element={<EmpUpd />} />
          <Route path='/del' element={<EmpDel />} />
          <Route path='/job/all' element={<JobAll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
