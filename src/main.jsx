import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import LandingPage from './PAGES/LandingPage.jsx';
import Header from './components/Headers.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Header/>
    <BrowserRouter>
  <Routes>
  <Route path='/' element={<LandingPage/>}/>

  </Routes>
   
    <App />
    </BrowserRouter>

  </React.StrictMode>,
)
