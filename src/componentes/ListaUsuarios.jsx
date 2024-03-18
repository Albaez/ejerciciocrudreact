import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

  const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      const obtenerUsuarios = async () => {
        try {
          const respuesta = await axios.get('https://api.escuelajs.co/api/v1/users');
          setUsuarios(respuesta.data);
        } catch (error) {
          Swal.fire('Error', 'Error al obtener los usuarios', 'error');
        }
      };

      obtenerUsuarios();
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
      background: '#f5f5f5', padding: '1rem' }}>
        <h1>Lista de Usuarios</h1>
        {usuarios.map((usuario) => (
          <Card key={usuario.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={usuario.avatar || 'default-avatar.png'} tyle={{ height: '100px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{usuario.name}</Card.Title>
              <Card.Text>{usuario.email}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{usuario.phone}</ListGroup.Item>
              <ListGroup.Item>{usuario.website}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
    );
  };

  export default ListaUsuarios;
