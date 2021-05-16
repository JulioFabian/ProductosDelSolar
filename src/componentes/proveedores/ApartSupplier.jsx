import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './Proveedores.css'

const ApartSupplier = () => {
  const baseUrl="http://localhost/apiProductosDelSolar/indexProv.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado]=useState({
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setProveedorSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(proveedorSeleccionado);
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
    f.append("nombre", proveedorSeleccionado.nombre);
    f.append("direccion", proveedorSeleccionado.direccion);
    f.append("telefono", proveedorSeleccionado.telefono);
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
    f.append("nombre", proveedorSeleccionado.nombre);
    f.append("direccion", proveedorSeleccionado.direccion);
    f.append("telefono", proveedorSeleccionado.telefono);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: proveedorSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(proveedor=>{
        if(proveedor.id===proveedorSeleccionado.id){
          proveedor.nombre=proveedorSeleccionado.nombre;
          proveedor.direccion=proveedorSeleccionado.direccion;
          proveedor.telefono=proveedorSeleccionado.telefono;
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
    await axios.post(baseUrl, f, {params: {id: proveedorSeleccionado.id}})
    .then(response=>{
      setData(data.filter(proveedor=>proveedor.id!==proveedorSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarProveedor=(proveedor, caso)=>{
    setProveedorSeleccionado(proveedor);

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
      marginLeft: "410px",
      color: "black",
    }}>
        <div className="felx-large">
            <div>
            <h1>Proveedores</h1>
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
            <table className="Proveedores-center">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(proveedor=>(
                <tr key={proveedor.id}>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.direccion}</td>
                    <td>{proveedor.telefono}</td>
                <td>

                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarProveedor(proveedor, "Editar")
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
                        ()=>seleccionarProveedor(proveedor, "Eliminar")
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


            <Modal isOpen={modalInsertar}>
                <br />
            <ModalHeader>Insertar Proveedor</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Nombre: </label>
                    <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                    <label>Dirección: </label>
                    <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
                    <label>Telefono: </label>
                    <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769', color: '#ffffff'}} className="btn" onClick={()=>peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
            </Modal>


            
            <Modal isOpen={modalEditar}>
            <br />
            <ModalHeader>Editar Proveedor</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Nombre: </label>
                <input type="text" className="form-control" name="nombre" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.nombre}/>
                <label>Dirección: </label>
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.direccion}/>
                <label>Telefono: </label>
                <input type="text" className="form-control" name="telefono" onChange={handleChange} value={proveedorSeleccionado && proveedorSeleccionado.telefono}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769'}} className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                <br />
                <br />
                ¿Estás seguro que deseas eliminar el Proveedor {proveedorSeleccionado && proveedorSeleccionado.nombre}?
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

export default ApartSupplier;