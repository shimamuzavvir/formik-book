import React from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';
import Create from './Create';

const App = () => {
  return (
    <div>
      <BrowserRouter>
     
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/create' element={<Create />} />
          </Routes>
          </BrowserRouter>
      
    </div>
  );
};

export default App;