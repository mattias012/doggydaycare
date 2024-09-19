import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx'
import CatalogOfDogs from './components/CatalogOfDogs.jsx';
import Dog from './components/Dog.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
 
  return (

     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogOfDogs" element={<CatalogOfDogs />} />
        <Route path="/dog/:chipNumber" element={<Dog />} />
      </Routes>
    </Router>
  );
}

export default App