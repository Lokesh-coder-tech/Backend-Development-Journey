import {BrowserRouter, Route, Routes} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/home/pages/Home"

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
