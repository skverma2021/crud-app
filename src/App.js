// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import EmpAdd from './component/EmpAdd';
import EmpAll from './component/EmpAll';
import EmpDel from './component/EmpDel';
import EmpUpd from './component/EmpUpd';
import JobAll from './component/JobAll';
import JobUpd from './component/JobUpd';
import JobExPlan from './component/JobExPlan';
import JobExPlanAdd from './component/JobExPlanAdd';

import EmpAllSorted from './component/EmpAllSorted';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookHead from './component/BookHead';

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
          <Route path='/job/upd/:id' element={<JobUpd />} />
          <Route path='/book/:id/:m/:y' element={<BookHead />} />
          <Route path='/job/ex/:id' element={<JobExPlan />} />
          <Route path='/job/exAdd/:id' element={<JobExPlanAdd />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
