
import './App.css'
import LoginForm from './components/AuthComponents/Login';
import RegistrationForm from './components/AuthComponents/Register'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PageNotFound from './components/Common/PageNotFound';
import Ddashboard from './components/modules/Ddashboard';
function App() {
  

  return (
    <Router >
      <Routes>

         <Route path="/" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm/>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path='dashboard' element ={<Ddashboard/>}/>
      </Routes>

    </Router>
  )
}

export default App
