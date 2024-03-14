import React, { useEffect, useState } from 'react';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderUsuario = () => {
    return usuarios.map((usuario) => (
      <div key={usuario.id} className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={usuario.avatar || '/default-avatar.jpg'} // Use default image if avatar is missing
              alt={`Avatar for ${usuario.name}`}
              className="img-fluid"
              style={{ width: '100px', height: '100px' }} // Ajusta el tamaño aquí
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{usuario.name}</h5>
              <p className="card-text">{usuario.email}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Usuarios</h1>
      {renderUsuario()}
    </div>
  );
};

export default ListaUsuarios;
