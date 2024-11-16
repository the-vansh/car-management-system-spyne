import './App.css';
import React from 'react'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Navigates from './Navbar/navigate';
import Login from './Authentication/login'
import Signup from './Authentication/Signup'
import Createcar from './Components/createcar';
import Showcars from './Components/Showcars';
import Searchcar from './Components/Searchcarcompo';

function App() {
  return (
    <Router>
     <Navigates/>
          <Routes>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/createcar" element={<Createcar/>}/>
            <Route exact path="/showcars" element={<Showcars/>}/>
            <Route exact path="/searchcar" element={<Searchcar/>}/>
          </Routes>
     </Router>
  )
}

export default App;
