import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import First from './views/First';
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
function App() {
  const logout=()=>{

    axios.post('http://localhost:8000/api/user/logout' ,{}, {withCredentials:true})
            .then(res=>{console.log(res)})
            .catch(err=>{console.log(err)})
  }

  return (
    <div className="App">
      <button onClick={logout}>Logout</button>
      <BrowserRouter>
        <Routes>
            <Route element={<First/>} path="/"/>
            <Route element={<Main/>} path="/people"/>
            <Route element={<Detail/>} path="/people/:id" />    
            <Route element={<Update/>} path="/people/edit/:id"/>
        </Routes>
      </BrowserRouter>                           
    </div>
  );
}
export default App;

