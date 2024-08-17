import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login"
import Client from "./pages/Client/Client"
import Admin from "./pages/Admin/Admin";
import Map from "./components/Map"
import Trains from "./components/Trains";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Client />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Register />}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/track-trains' element={<Trains />}/>
        <Route path='/track-trains/:id' element={<Map />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
