import './App.css';
import Dashboard from './components/Dashboard';
import { Route, Routes } from "react-router-dom"
import List from './components/List';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;