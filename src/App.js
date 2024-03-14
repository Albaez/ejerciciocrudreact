import React, { useEffect, useState } from 'react';
import './App.css';
import ListaUsuarios from './componentes/ListaUsuarios';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/users')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}

export default App;
