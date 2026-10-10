import { useState } from 'react'
import Navbar from './components/navbar'
import Home from './pages/home'
import Details from './pages/details'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/details/:slug' element={<Details/>} />
      </Routes>
    </>
  )
}

export default App;
