
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
            <Link to="/userlist" className="text-white hover:text-gray-300">Lista de Usuarios</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
