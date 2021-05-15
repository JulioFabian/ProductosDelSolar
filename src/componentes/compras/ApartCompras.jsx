import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, DropdownItem, DropdownMenu, Dropdown} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './Compras.css'; 
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';

const ApartCompras = () => {
  const baseUrl="http://localhost/apiProductosDelSolar/indexCompras.php";
  const baseUrlProveedor="http://localhost/apiProductosDelSolar/indexProv.php";
  const baseUrlInv="http://localhost/apiProductosDelSolar/indexInv.php";
  const [proveedores, setProveedores]=useState([]);
  const [inventario, setInventario]=useState([]);
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
//   const [modalEntregado, setModalEntregado]= useState(false);
  const [compraSeleccionada, setCompraSeleccionada]=useState({
    id: '',
    id_proveedor: '',
    id_producto: '',
    cantidad: '',
    fecha_de_compra: '',
  });

  const handleChangeSelect=e=>{
    const options = e.target;
    const {name}=e.target;
    const value = options[options.selectedIndex].value;
    setCompraSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(compraSeleccionada);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setCompraSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(compraSeleccionada);
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

//   const abrirCerrarModalEntregado=()=>{
//     setModalEntregado(!modalEntregado);
//   }

  const peticionGetProveedor=async()=>{
    await axios.get(baseUrlProveedor)
    .then(response=>{
      setProveedores(response.data);
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
    console.log(compraSeleccionada);
    var f = new FormData();
    f.append("cantidad", compraSeleccionada.cantidad);
    f.append("id_producto", compraSeleccionada.id_producto);
    f.append("id_cliente", compraSeleccionada.id_cliente);
    // f.append("fecha_de_compra", compraSeleccionada.fecha_de_compra);
    f.append("fecha_de_compra", compraSeleccionada.fecha_de_compra);
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
    f.append("id_producto", compraSeleccionada.id_producto);
    f.append("id_cliente", compraSeleccionada.id_cliente);
    f.append("cantidad", compraSeleccionada.cantidad);
    // f.append("fecha_de_compra", compraSeleccionada.fecha_de_compra);
    f.append("fecha_de_compra", compraSeleccionada.fecha_de_compra);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: compraSeleccionada.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(compra=>{
        if(compra.id===compraSeleccionada.id){
          Object.assign(compra, response.data);
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
    peticionGet();
  }

//   const peticionEntregado=async()=>{
//     var f = new FormData();
//     f.append("METHOD", "PUT");
//     await axios.post(baseUrl, f, {params: {id: compraSeleccionada.id, entregado: 1}})
//     .then(response=>{
//       setData(data.filter(compra=>compra.id!==compraSeleccionada.id));
//       abrirCerrarModalEntregado();
//     }).catch(error=>{
//       console.log(error);
//     })
//   }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: compraSeleccionada.id}})
    .then(response=>{
      setData(data.filter(compra=>compra.id!==compraSeleccionada.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCompra=(compra, caso)=>{
    setCompraSeleccionada(compra);

    if(caso==="Editar"){
      abrirCerrarModalEditar()
    }else{
      if(caso === "Eliminar"){
        abrirCerrarModalEliminar()
      }
    //   else{
    //     if(caso === "Entregado"){
    //       abrirCerrarModalEntregado()
    //     }
    //   }
    }
  }

  useEffect(()=>{
    peticionGet();
    peticionGetProveedor();
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
            <h1>Compras</h1>
            {/* <IconButton 
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
                </IconButton> */}
            {/* <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button> */}
            <br />
            
            <div className="flex-large">

            <table className="Compras-center">
            <thead>
                <tr>
                  <th></th>
                <th>Proveedor</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha de Compra</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(compra=>(
                <tr key={compra.id}>
                  <td>
                  </td>
                    <td>{compra.id_proveedor}</td>
                    <td>{compra.id_producto}</td>
                    <td>{compra.cantidad}</td>
                    <td>{compra.fecha_de_compra}</td>
                <td>

                {/* <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarCompra(compra, "Editar")
                    }
                    aria-label="create"
                >
                    <CreateIcon fontSize="small" 
                />
                </IconButton> */}
                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    onClick = {
                        ()=>seleccionarCompra(compra, "Eliminar")
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
            <ModalHeader>Insertar Compra</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                    <label>Proveedor: </label>
                    <select type="select" name="id_proveedor" id="id_proveedor" onChange={handleChangeSelect}>
                    <option selected disabled hidden>selecciona un proveedor</option>
                          {proveedores.map(proveedor => {
                            return (
                      <option value={proveedor.id}>{proveedor.nombre + " " + proveedor.apellido}</option>
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
                    <input type="text" className="form-control" name="fecha_de_compra" onChange={handleChange}/> */}
                    <label>Fecha de entrega: </label>
                    <input type="date" className="form-control" name="fecha_de_compra" onChange={handleChange}/>
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
            <ModalHeader>Editar Compra</ModalHeader>
            <ModalBody>
                <div className="form-group">

                  

                <label>Cliente: </label>
                    <select disabled type="select" name="id_cliente" id="id_cliente" onChange={handleChangeSelect}>
                          {proveedores.map(proveedor => {
                            if(proveedor.id === compraSeleccionada.id_cliente){
                              return (
                                <option selected value={proveedor.id}>{proveedor.nombre + " " + proveedor.apellido}</option>
                              );
                            }
                          })}
                    </select>
                          
                    <label>Producto: </label>
                    <select disabled type="select" name="id_producto" id="id_producto" onChange={handleChangeSelect}>
                          {inventario.map(producto => {
                              if(producto.id === compraSeleccionada.id_producto){
                                return (
                                  <option selected value={producto.id}>{producto.producto}</option>
                                );
                              }
                          })}
                    </select>
                
                <label>Cantidad: </label>
                <input type="number" className="form-control" name="cantidad" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.cantidad}/>
                <label>Fecha de entrega: </label>
                <input type="date" className="form-control" name="fecha_de_compra" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.fecha_de_compra}/>
                <label>Hora de entrega: </label>
                <input type="time" className="form-control" name="hora_de_entrega" onChange={handleChange} value={compraSeleccionada && compraSeleccionada.hora_de_entrega}/>
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
                ¿Estás seguro que deseas eliminar la Compra de {compraSeleccionada && compraSeleccionada.nombre}?
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

            {/* <Modal isOpen={modalEntregado}>
                <ModalBody>
                <br />
                <br />
                ¿Estás seguro que se realizó la entrega de {compraSeleccionada && compraSeleccionada.nombre}?
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
            </Modal> */}
            </div>
      </div>
    </div>
  );
}

export default ApartCompras;