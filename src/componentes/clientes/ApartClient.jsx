import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './Client.css'; 
import { Grid } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const ApartClient = () => {
  const baseUrl="http://localhost/apiProductosDelSolar/indexClientes.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [clienteSeleccionado, setClienteSeleccionado]=useState({
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipo: '',
    direccion: '',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setClienteSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(clienteSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", clienteSeleccionado.nombre);
    f.append("apellido", clienteSeleccionado.apellido);
    f.append("telefono", clienteSeleccionado.telefono);
    f.append("tipo", clienteSeleccionado.tipo);
    f.append("direccion", clienteSeleccionado.direccion);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", clienteSeleccionado.nombre);
    f.append("apellido", clienteSeleccionado.apellido);
    f.append("telefono", clienteSeleccionado.telefono);
    f.append("tipo", clienteSeleccionado.tipo);
    f.append("direccion", clienteSeleccionado.direccion);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: clienteSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(cliente=>{
        if(cliente.id===clienteSeleccionado.id){
          cliente.nombre=clienteSeleccionado.nombre;
          cliente.apellido=clienteSeleccionado.apellido;
          cliente.telefono=clienteSeleccionado.telefono;
          cliente.tipo=clienteSeleccionado.tipo;
          cliente.direccion=clienteSeleccionado.direccion;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: clienteSeleccionado.id}})
    .then(response=>{
      setData(data.filter(cliente=>cliente.id!==clienteSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCliente=(cliente, caso)=>{
    setClienteSeleccionado(cliente);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  const style2 = {
    color: "#203769",
    fontSize: "50",
  };

  return (
    <div style={{
      alignItems: "center",
      textAlign: "center",
      display: "flex",
      // marginTop: "20px",
      marginLeft: "300px",
      color: "black",
    }}>
        <div>
            <div>
            <h1>Clientes</h1>
            <IconButton 
                    style={style2}
                    color="primary"
                    className="button muted-button"
                    fontsize="large"
                    onClick={
                        ()=>abrirCerrarModalInsertar()
                    }
                    aria-label="create"
                >
                    <AddCircleOutlineOutlinedIcon style={style2}
                />
                </IconButton>
            {/* <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button> */}
            <br />
            
            <div className="flex-large">

            <table className="Client-center">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Tipo</th>
                <th>Dirección</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(cliente=>(
                <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.tipo}</td>
                    <td>{cliente.direccion}</td>
                <td>

                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarCliente(cliente, "Editar")
                    }
                    aria-label="create"
                >
                    <CreateIcon fontSize="small" 
                />
                </IconButton>
                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    onClick = {
                        ()=>seleccionarCliente(cliente, "Eliminar")
                    }
                    aria-label="delete"
                >
                    <DeleteIcon fontSize="small" 
                />
                </IconButton>

                {/* <button className="btn btn-primary" onClick={()=>seleccionarInventario(inventario, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>seleccionarInventario(inventario, "Eliminar")}>Eliminar</button> */}
                </td>
                </tr>
                ))}


            </tbody> 

            </table>

            </div>

            <Modal isOpen={modalInsertar}>
                <br />
            <ModalHeader>Insertar Cliente</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Nombre: </label>
                    <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                    <label>Apellido: </label>
                    <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
                    <label>Telefono: </label>
                    <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
                    <label>Tipo: </label>
                    <input type="text" className="form-control" name="tipo" onChange={handleChange}/>
                    <label>Dirección: </label>
                    <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769', color: '#ffffff'}} className="btn" onClick={()=>peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
            </Modal>


            
            <Modal isOpen={modalEditar}>
            <br />
            <ModalHeader>Editar Cliente</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre: </label>
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre}/>
                <label>Apellido: </label>
                <input type="text" className="form-control" name="apellido" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.apellido}/>
                <label>telefono: </label>
                <input type="text" className="form-control" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono}/>
                <label>Tipo: </label>
                <input type="text" className="form-control" name="tipo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.tipo}/>
                <label>Dirección: </label>
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769', color: '#ffffff'}} className="btn" onClick={()=>peticionPut()}>Editar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                <br />
                <br />
                ¿Estás seguro que deseas eliminar el Cliente {clienteSeleccionado && clienteSeleccionado.nombre}?
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-danger" onClick={()=>peticionDelete()}>
                    Sí
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={()=>abrirCerrarModalEliminar()}
                >
                    No
                </button>
                </ModalFooter>
            </Modal>
            </div>
      </div>
    </div>
  );
}

export default ApartClient;


// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import AddClientForm from './AddClientForm';
// import EditClientForm from './EditClientForm';
// import BuyersTab from './BuyersTab';

// const ApartClient = () => {

//     const clientsData = [
//         { id: uuidv4(), nombre: 'Julio', apellido: 'Fabián', telefono: '9513268765', tipo: 'A', direccion: '16 de septiembre #414', fecha: '2021-11-05', hora: '07:30' },
//         { id: uuidv4(), nombre: 'Jorge', apellido: 'Rios', telefono: '9512739854', tipo: 'B', direccion: 'Guerrero #315', fecha: '2021-12-06', hora: '08:40'},
//         { id: uuidv4(), nombre: 'Sebastian', apellido: 'Pastrana', telefono: '9512853764', tipo: 'C', direccion: 'Independencia #512', fecha: '2021-13-07', hora: '09:50' },
//       ]

//       //state
//       const [clients, setClients] = useState(clientsData)

//       //Agregar productos

//       const addClient = (client) => {
//           client.id=uuidv4()
//           setClients([
//               ...clients,
//               client
//           ])
//       }

//       //Eliminar Productos
//       const deleteClient = (id) => {
//           const arrayFiltrado = clients.filter(client => client.id !== id);
//         setClients(arrayFiltrado)
//       }

//       //Editar Usuarios
//       const [editingC, setEditingClient] = useState(false)

//       const [currentClient, setCurrentClient] = useState({
//         id: null, nombre: '', apellido: '', telefono: '', tipo: '', 
//         direccion: '', fecha: '', hora: ''
//       });

//       const editRow = (client) => {
//         setEditingClient(true);
//           setCurrentClient({
//             id: client.id, nombre: client.nombre, 
//             apellido: client.apellido, telefono: client.telefono, 
//             tipo: client.tipo, direccion: client.direccion,
//             fecha: client.fecha, hora: client.hora
//           })
//       }

//       const updateClient = (id, updateClient) => {
//         setEditingClient(false);
//         setClients(clients.map(client => (client.id === id ? updateClient : client)))
//       }

//     return (
//         <div className="container">
//             <div className="flex-row">
//                 <div>
//                 <div className="flex-large">
//                     <div>
//                     {
//                         editingC ? (
//                             <div>
//                                 <h2>Editar Cliente</h2>
//                                 <EditClientForm 
//                                     setEditingClient={setEditingClient}
//                                     currentClient={currentClient}
//                                     updateClient={updateClient}
//                                 />
//                             </div>
//                         ) : (
//                             <div>
//                                 <h2>Agregar Cliente</h2>
//                                 <AddClientForm addClient={addClient}/>
//                             </div>
//                         )
//                     }
//                     </div>
//                 </div>
//                 </div>
//                 <div className="flex-large">
//                 <h2>Clientes</h2>
//                 <BuyersTab 
//                     clients={clients} 
//                     deleteClient={deleteClient} 
//                     editRow={editRow}
//                 />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ApartClient

/*{
                        editing ? (
                            <div>
                                <h2>Editar Cliente</h2>
                                <EditClientForm 
                                    setEditingClient={setEditingClient}
                                    currentClient={currentClient}
                                    updateClient={updateClient}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Agregar Cliente</h2>
                                <AddClientForm addClient={addClient}/>
                            </div>
                        )
                    } */