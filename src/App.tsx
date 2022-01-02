import React from 'react';

import Home from './views/home';
import Login from './views/login';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={ <Home /> } />
          
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
