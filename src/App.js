 
import './App.css';
import { Patientlist } from './Components/Patientlist';
import { PatientRegistration } from './Components/PatientRegistration';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <button className="btn btn-primary">Click me</button>
    //   </header>
    // </div>
 <div className='container'>
    <BrowserRouter>
      <Routes>
          <Route exact path="" element={<Patientlist />}></Route>
          <Route exact path="/Registration" element={<PatientRegistration />}></Route>
          <Route exact path="/Update" element={<PatientRegistration />}></Route>
      </Routes>
    </BrowserRouter>
    </div> 
  );
}

export default App;
