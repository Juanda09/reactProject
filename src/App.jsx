/* eslint-disable react/prop-types */
import { useState } from 'react';
import './App.css';
import Footer from'./components/footer'
// eslint-disable-next-line react/prop-types
function Profile({ users }) {
  return (
    <div className="profile">
      {users.map((user, index) => (
        <div key={index}>
          <h1>Hello {user.name}</h1>
          <img src={user.imageUrl} className="profile-image" alt={user.name} height={90} width={90} />
        </div>
      ))}
    </div>
  );
}

function App() {
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
      <button onClick={saludar}>Enviar</button>
      <input type="text" onChange={mostrarTexto} onKeyUp={handleKeyUp} />
      <button onClick={handleIncrement}>Sumar</button>
      <button onClick={handleDecrement}>Restar</button>
      <p>El contador va en {count}</p>
      <Footer/>
    </div>
  );
}

export default App;
