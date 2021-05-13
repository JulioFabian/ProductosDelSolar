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
  const baseUrl="http://localhost/apiInventario/indexComp.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [compradoresSeleccionado, setCompradoresSeleccionado]=useState({
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipo: '',
    direccion: '',
    fecha: '',
    hora: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setCompradoresSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(compradoresSeleccionado);
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
    f.append("nombre", compradoresSeleccionado.nombre);
    f.append("apellido", compradoresSeleccionado.apellido);
    f.append("telefono", compradoresSeleccionado.telefono);
    f.append("tipo", compradoresSeleccionado.tipo);
    f.append("direccion", compradoresSeleccionado.direccion);
    f.append("fecha", compradoresSeleccionado.fecha);
    f.append("hora", compradoresSeleccionado.hora);
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
    f.append("nombre", compradoresSeleccionado.nombre);
    f.append("appellido", compradoresSeleccionado.apellido);
    f.append("telefono", compradoresSeleccionado.telefono);
    f.append("tipo", compradoresSeleccionado.tipo);
    f.append("direccion", compradoresSeleccionado.direccion);
    f.append("fecha", compradoresSeleccionado.fecha);
    f.append("hora", compradoresSeleccionado.hora);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: compradoresSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(compradores=>{
        if(compradores.id===compradoresSeleccionado.id){
          compradores.nombre=compradoresSeleccionado.nombre;
          compradores.apellido=compradoresSeleccionado.apellido;
          compradores.telefono=compradoresSeleccionado.telefono;
          compradores.tipo=compradoresSeleccionado.tipo;
          compradores.direccion=compradoresSeleccionado.direccion;
          compradores.fecha=compradoresSeleccionado.fecha;
          compradores.hora=compradoresSeleccionado.hora;
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
    await axios.post(baseUrl, f, {params: {id: compradoresSeleccionado.id}})
    .then(response=>{
      setData(data.filter(compradores=>compradores.id!==compradoresSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCompradores=(compradores, caso)=>{
    setCompradoresSeleccionado(compradores);

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
      marginTop: "20px",
      marginLeft: "230px",
      marginRight: "190px",
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
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(compradores=>(
                <tr key={compradores.id}>
                    <td>{compradores.id}</td>
                    <td>{compradores.nombre}</td>
                    <td>{compradores.apellido}</td>
                    <td>{compradores.telefono}</td>
                    <td>{compradores.tipo}</td>
                    <td>{compradores.direccion}</td>
                    <td>{compradores.fecha}</td>
                    <td>{compradores.hora}</td>
                <td>

                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarCompradores(compradores, "Editar")
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
                        ()=>seleccionarCompradores(compradores, "Eliminar")
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
                    <label>Fecha: </label>
                    <input type="date" className="form-control" name="fecha" onChange={handleChange}/>
                    <label>Hora: </label>
                    <input type="time" className="form-control" name="hora" onChange={handleChange}/>
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
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.nombre}/>
                <label>Apellido: </label>
                <input type="text" className="form-control" name="apellido" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.apellido}/>
                <label>telefono: </label>
                <input type="text" className="form-control" name="telefono" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.telefono}/>
                <label>Tipo: </label>
                <input type="text" className="form-control" name="tipo" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.tipo}/>
                <label>Dirección: </label>
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.direccion}/>
                <label>Fecha: </label>
                <input type="date" className="form-control" name="fecha" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.fecha}/>
                <label>Hora: </label>
                <input type="time" className="form-control" name="hora" onChange={handleChange} value={compradoresSeleccionado && compradoresSeleccionado.hora}/>
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
                ¿Estás seguro que deseas eliminar el Cliente {compradoresSeleccionado && compradoresSeleccionado.nombre}?
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