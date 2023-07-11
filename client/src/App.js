import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route exact path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
