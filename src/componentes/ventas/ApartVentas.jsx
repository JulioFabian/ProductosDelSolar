import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, DropdownItem, DropdownMenu, Dropdown} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './Ventas.css'; 
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';

const ApartVentas = () => {
  const baseUrl="http://localhost/apiInventario/indexVent.php";
  const baseUrlClient="http://localhost/apiInventario/indexComp.php";
  const baseUrlInv="http://localhost/apiInventario/index.php";
  const [clientes, setClientes]=useState([]);
  const [inventario, setInventario]=useState([]);
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [modalEntregado, setModalEntregado]= useState(false);
  const [ventaSeleccionado, setVentaSeleccionado]=useState({
    id: '',
    id_cliente: '',
    id_producto: '',
    cantidad: '',
    fecha_de_entrega: '',
    hora_de_entrega: '',
  });

  const handleChangeSelect=e=>{
    const options = e.target;
    const {name}=e.target;
    const value = options[options.selectedIndex].value;
    setVentaSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(ventaSeleccionado);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setVentaSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(ventaSeleccionado);
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

  const abrirCerrarModalEntregado=()=>{
    setModalEntregado(!modalEntregado);
  }

  const peticionGetClients=async()=>{
    await axios.get(baseUrlClient)
    .then(response=>{
      setClientes(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionGetInventario=async()=>{
    await axios.get(baseUrlInv)
    .then(response=>{
      setInventario(response.data);
    }).catch(error=>{
      console.log(error);
    })
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
    console.log(ventaSeleccionado);
    var f = new FormData();
    f.append("cantidad", ventaSeleccionado.cantidad);
    f.append("id_producto", ventaSeleccionado.id_producto);
    f.append("id_cliente", ventaSeleccionado.id_cliente);
    // f.append("fecha_de_pedido", ventaSeleccionado.fecha_de_pedido);
    f.append("fecha_de_entrega", ventaSeleccionado.fecha_de_entrega);
    f.append("hora_de_entrega", ventaSeleccionado.hora_de_entrega);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
    peticionGet();
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("id_producto", ventaSeleccionado.id_producto);
    f.append("id_cliente", ventaSeleccionado.id_cliente);
    f.append("cantidad", ventaSeleccionado.cantidad);
    // f.append("fecha_de_pedido", ventaSeleccionado.fecha_de_pedido);
    f.append("fecha_de_entrega", ventaSeleccionado.fecha_de_entrega);
    f.append("hora_de_entrega", ventaSeleccionado.hora_de_entrega);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: ventaSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(venta=>{
        if(venta.id===ventaSeleccionado.id){
          Object.assign(venta, response.data);
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
    peticionGet();
  }

  // const peticionEntregado=async()=>{
  //   console.log(ventaSeleccionado);
  //   var f = new FormData();
  //   f.append("METHOD", "PUT");
  //   await axios.post(baseUrl, f, {params: {id: ventaSeleccionado.id, entregado: '1'}})
  //     // abrirCerrarModalEditar();
  //   peticionGet();
  // }

  const peticionEntregado=async()=>{
    var f = new FormData();
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: ventaSeleccionado.id, entregado: 1}})
    .then(response=>{
      setData(data.filter(venta=>venta.id!==ventaSeleccionado.id));
      abrirCerrarModalEntregado();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: ventaSeleccionado.id}})
    .then(response=>{
      setData(data.filter(venta=>venta.id!==ventaSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarVenta=(venta, caso)=>{
    setVentaSeleccionado(venta);

    if(caso==="Editar"){
      abrirCerrarModalEditar()
    }else{
      if(caso === "Eliminar"){
        abrirCerrarModalEliminar()
      }else{
        if(caso === "Entregado"){
          abrirCerrarModalEntregado()
        }
      }
    }
  }

  useEffect(()=>{
    peticionGet();
    peticionGetClients();
    peticionGetInventario();
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
    //   marginTop: "20px",
      marginLeft: "100px",
      color: "black",
    }}>
        <div>
            <div>
            <h1>Ventas</h1>
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
                  <th></th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha de pedido</th>
                <th>Fecha de entrega</th>
                <th>Hora de entrega</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(venta=>(
                <tr key={venta.id}>
                  <td>
                  <IconButton 
                    color="inherit"
                    className="button muted-button"
                    onClick = {
                        ()=>seleccionarVenta(venta, "Entregado")
                    }
                    aria-label="delete"
                >
                    <DoneIcon fontSize="medium" 
                />
                </IconButton>
                  </td>
                    <td>{venta.nombre + " " + venta.apellido}</td>
                    <td>{venta.direccion}</td>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>{venta.fecha_de_pedido}</td>
                    <td>{venta.fecha_de_entrega}</td>
                    <td>{venta.hora_de_entrega}</td>
                <td>

                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarVenta(venta, "Editar")
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
                        ()=>seleccionarVenta(venta, "Eliminar")
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
            <ModalHeader>Insertar Venta</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                    <label>Cliente: </label>
                    <select type="select" name="id_cliente" id="id_cliente" onChange={handleChangeSelect}>
                    <option selected disabled hidden>selecciona un cliente</option>
                          {clientes.map(cliente => {
                            return (
                      <option value={cliente.id}>{cliente.nombre + " " + cliente.apellido}</option>
                            );
                          })}
                    </select>
                    <label>Producto: </label>
                    <select type="select" name="id_producto" id="id_producto" onChange={handleChangeSelect}>
                    <option selected disabled hidden>selecciona un producto</option>
                          {inventario.map(producto => {
                            return (
                      <option value={producto.id}>{producto.producto}</option>
                            );
                          })}
                    </select>
                    <label>Cantidad: </label>
                    <input type="number" className="form-control" name="cantidad" onChange={handleChange}/>
                    {/* <label>Fecha de pedido: </label>
                    <input type="text" className="form-control" name="fecha_de_pedido" onChange={handleChange}/> */}
                    <label>Fecha de entrega: </label>
                    <input type="date" className="form-control" name="fecha_de_entrega" onChange={handleChange}/>
                    <label>Hora de entrega: </label>
                    <input type="time" className="form-control" name="hora_de_entrega" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769', color: '#ffffff'}} className="btn" onClick={()=>peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
            </Modal>


            <Modal isOpen={modalEditar}>
            <br />
            <ModalHeader>Editar Venta</ModalHeader>
            <ModalBody>
                <div className="form-group">

                  

                <label>Cliente: </label>
                    <select disabled type="select" name="id_cliente" id="id_cliente" onChange={handleChangeSelect}>
                          {clientes.map(cliente => {
                            if(cliente.id === ventaSeleccionado.id_cliente){
                              return (
                                <option selected value={cliente.id}>{cliente.nombre + " " + cliente.apellido}</option>
                              );
                            }
                          })}
                    </select>
                          
                    <label>Producto: </label>
                    <select disabled type="select" name="id_producto" id="id_producto" onChange={handleChangeSelect}>
                          {inventario.map(producto => {
                              if(producto.id === ventaSeleccionado.id_producto){
                                return (
                                  <option selected value={producto.id}>{producto.producto}</option>
                                );
                              }
                          })}
                    </select>

                {/* <label>Cliente: </label>
                <input disabled type="text" className="form-control" name="id_cliente" onChange={handleChange} value={ventaSeleccionado && ventaSeleccionado.id_cliente}/>
                <label>Producto: </label>
                <input disabled type="text" className="form-control" name="id_producto" onChange={handleChange} value={ventaSeleccionado && ventaSeleccionado.id_producto}/> */}
                
                <label>Cantidad: </label>
                <input type="number" className="form-control" name="cantidad" onChange={handleChange} value={ventaSeleccionado && ventaSeleccionado.cantidad}/>
                <label>Fecha de entrega: </label>
                <input type="date" className="form-control" name="fecha_de_entrega" onChange={handleChange} value={ventaSeleccionado && ventaSeleccionado.fecha_de_entrega}/>
                <label>Hora de entrega: </label>
                <input type="time" className="form-control" name="hora_de_entrega" onChange={handleChange} value={ventaSeleccionado && ventaSeleccionado.hora_de_entrega}/>
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
                ¿Estás seguro que deseas eliminar la Venta de {ventaSeleccionado && ventaSeleccionado.nombre}?
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

            <Modal isOpen={modalEntregado}>
                <ModalBody>
                <br />
                <br />
                ¿Estás seguro que se realizó la entrega de {ventaSeleccionado && ventaSeleccionado.nombre}?
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-danger" onClick={()=>peticionEntregado()}>
                    Sí
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={()=>abrirCerrarModalEntregado()}
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

export default ApartVentas;

// import React, {useState, useEffect} from 'react';

// const ApartVentas = () => {
//     return(
//         <div style={{alignItems: "center"}}>
//             <h1>
//                 Hola
//             </h1>
//         </div>
//     );
// }

// export default ApartVentas;