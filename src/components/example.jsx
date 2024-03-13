/* eslint-disable react/prop-types */
import { useState } from "react";

// Componente de botón reutilizable
const Button = ({ onClick, color, children }) => {
    return (
      <button
        className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  // Componente de entrada de texto reutilizable
  const Input = ({ onChange, onKeyUp }) => {
    return (
      <input
        type="text"
        className="border rounded py-2 px-4"
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    );
  }
  
  function Profile({ users }) {
    return (
      <div className="flex flex-wrap justify-center">
        {users.map((user, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md m-2">
            <h1 className="text-xl font-bold mb-2">Hello {user.name}</h1>
            <img
              src={user.imageUrl}
              alt={user.name}
              className="profile-image rounded-full mx-auto"
              height={90}
              width={90}
            />
          </div>
        ))}
      </div>
    );
  }
  
  export default function Example() {
    const [count, setCount] = useState(0);
  
    const saludar = () => {
      alert("Hola");
    };
  
    const mostrarTexto = (e) => {
      console.log(e.target.value);
    };
  
    const handleKeyUp = () => {
      console.log("Soltó una tecla");
    };
  
    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      setCount(count - 1);
    };
  
    const users = [{
      name: 'Elvis Presley',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/singer-elvis-presley-news-photo-1590531497.jpg',
      imageSize: 90,
    },
    {
      name: 'Brad Pitt',
      imageUrl: 'https://goldenglobes.com/wp-content/uploads/2023/10/brad-pitt_03_paramount-pictures.jpg',
      imageSize: 90,
    },
    {
      name: 'Madonna',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVATslgVY87n3lp3XHUlxF8Edc6jubIVkmbg&usqp=CAU',
      imageSize: 90,
    }];
  
    return (
      <div className="App">
        <Profile users={users} />
        
        {/* Botón para saludar */}
        <Button onClick={saludar} color="blue">Enviar</Button>
        
        {/* Entrada de texto */}
        <Input onChange={mostrarTexto} onKeyUp={handleKeyUp} />
  
        <br />
  
        {/* Botones de incremento y decremento */}
        <Button onClick={handleIncrement} color="green">Sumar</Button>
        <Button onClick={handleDecrement} color="red">Restar</Button>
        
        {/* Contador */}
        <p className="text-xl">El contador va en {count}</p>
      </div>
    );
  }