
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route desde react-router-dom
import './App.css';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Example from './components/example';
import UserList from './components/user/user';

function App() {
  return (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Example />} /> {/* Ruta para la página de inicio */}
          <Route path="/userlist" element={<UserList />} /> {/* Ruta para la lista de usuarios */}
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
