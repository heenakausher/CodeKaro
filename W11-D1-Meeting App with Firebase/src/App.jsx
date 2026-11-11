import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home"
import Navbar from "./components/navbar"
import Previous from './pages/previous'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/error" element={<Error/>} /> */}
        <Route path="/previous" element={<Previous/>} />
      </Routes>
    </>
  )
}

export default App;