import './App.css';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Login from './pages/Login';
import NavBar from "./components/layout/NavBar"
import { AuthProvider, useAuth } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// Blocks a page until the user is logged in; otherwise sends them to /login.
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='min-h-screen w-full font-mono bg-gray-800 overflow-hidden'>
          <NavBar/>
          <Routes>
            <Route path="/login" element={<Login/>} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
