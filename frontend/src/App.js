import './App.css';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import NavBar from "./components/layout/NavBar"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className='min-h-screen w-full font-mono bg-gray-800 overflow-hidden'>
        <NavBar/>
        <Routes>
          <Route 
          path="/"
          element={<Dashboard/>}
          ></Route>

          <Route 
          path="/menu"
          element={<Menu/>}
          ></Route>
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
