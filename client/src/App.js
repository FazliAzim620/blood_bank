import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donar from './pages/dashboard/Donar';
import Hospital from './pages/dashboard/Hospital';
import Organization from './pages/dashboard/Organization';
import Consumer from './pages/dashboard/Consumer';
import Donation from './pages/dashboard/Donation';
import Analytics from './pages/dashboard/Analytics';
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
        <Route exact path='/donar' element={
          <ProtectedRoute>
            <Donar />
          </ProtectedRoute>
        } />
        <Route exact path='/hospital' element={
          <ProtectedRoute>
            <Hospital />
          </ProtectedRoute>
        } />
        <Route exact path='/organization' element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        } />
        <Route exact path='/consumer' element={
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>
        } />
        <Route exact path='/donation' element={
          <ProtectedRoute>
            <Donation />
          </ProtectedRoute>
        } />
        <Route exact path='/analytics' element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route exact path='/login' element={
        <PublicRoute>
        <Login />
        </PublicRoute>
        } />
        <Route exact path='/register' element={
        <PublicRoute>
        <Register />
        </PublicRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
 
