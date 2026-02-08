import './App.css';
import Dashboard from './pages/Dashboard';
import NavBar from "./components/ui/NavBar"


function App() {
  return (
    <div className='h-screen bg-gray-950 font-mono '>
      <NavBar/>
      <Dashboard/>  
    </div>
  );
}

export default App;
