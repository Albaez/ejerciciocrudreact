import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Swal from "sweetalert2";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [usuarioEditadoId, setUsuarioEditadoId] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await axios.get(
        "https://api.escuelajs.co/api/v1/users"
      );
      const usuariosFiltrados = respuesta.data.map((usuario) => {
        const { id, creationAt, updatedAt, ...usuarioFiltrado } = usuario;
        return usuarioFiltrado;
      });
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      Swal.fire("Error", "Error al obtener los usuarios", "error");
    }
  };

  const crearUsuario = async () => {
    try {
      const nuevoUsuario = {
        name,
        email,
        password,
        role,
        avatar,
      };

      const respuesta = await axios.post(
        "https://api.escuelajs.co/api/v1/users",
        nuevoUsuario
      );
      setUsuarios([...usuarios, respuesta.data]);

      Swal.fire("Éxito", "Usuario creado exitosamente", "success");
      setShowCrearModal(false);
    } catch (error) {
      Swal.fire("Error", "Error al crear el usuario", "error");
    }
  };

  const editarUsuario = async (id) => {
    try {
      const usuarioEditado = {
        name,
        email,
        password,
        role,
        avatar,
      };
  
      await axios.put(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        usuarioEditado
      );
  
      const usuariosActualizados = usuarios.map((usuario) => {
        if (usuario.id === id) {
          return { ...usuario, ...usuarioEditado };
        }
        return usuario;
      });
  
      setUsuarios(usuariosActualizados);
  
      Swal.fire("Éxito", "Usuario editado exitosamente", "success");
      setShowEditarModal(false);
    } catch (error) {
      Swal.fire("Error", "Error al editar el usuario", "error");
    }
  };
  
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);

      const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(usuariosFiltrados);

      Swal.fire("Éxito", "Usuario eliminado exitosamente", "success");
      setShowEliminarModal(false);
    } catch (error) {
      Swal.fire("Error", "Error al eliminar el usuario", "error");
    }
  };

  return (
    <Container>


      {/* Sección Crear Usuario */}
      <Row className= "mt-5">

      <Button className="btn btn-success mt-4 w-100" onClick={() => setShowCrearModal(true)}>Crear Usuario</Button>
        
      </Row>
      

      {/* Sección Listado de Usuarios */}
      <Row className="mt-5">
        {usuarios.map((usuario) => (
          <Col key={usuario.id} sm={6} md={4} lg={3} mt-5>
            <Card style={{ width: "15rem", marginBottom: "1rem" }}>
              <Card.Img
                className="card-image"
                variant="top"
                src={usuario.avatar || "default-avatar.png"}
              />
              <Card.Body>
                <Card.Title>{usuario.name}</Card.Title>
                <Card.Text>{usuario.email}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{usuario.password}</ListGroup.Item>
                <ListGroup.Item>{usuario.role}</ListGroup.Item>
              </ListGroup>
              <Button
                className="btn btn-outline-info"
                onClick={() => {
                  setUsuarioEditadoId(usuario.id);
                  setShowEditarModal(true);
                }}
              >
                Editar
              </Button>
              <Button
                className="btn btn-outline-danger"
                onClick={() => {
                  setUsuarioEditadoId(usuario.id);
                  setShowEliminarModal(true);
                }}
              >
                Eliminar
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Crear Usuario */}
      <Modal show={showCrearModal} onHide={() => setShowCrearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Rol:</label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Avatar:</label>
            <input
              type="text"
              className="form-control"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-outline-secondary"
            onClick={() => setShowCrearModal(false)}
          >
            Cancelar
          </Button>
          <Button className="btn btn-outline-primary" onClick={crearUsuario}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar Usuario */}
      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Id:</label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Rol:</label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Avatar:</label>
            <input
              type="text"
              className="form-control"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => editarUsuario(usuarioEditadoId)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Eliminar Usuario */}
      <Modal
        show={showEliminarModal}
        onHide={() => setShowEliminarModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              className="form-control"
              value={usuarioEditadoId}
              onChange={(e) => setUsuarioEditadoId(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEliminarModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarUsuario(usuarioEditadoId)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListaUsuarios;
