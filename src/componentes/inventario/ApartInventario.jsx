import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './Inventario.css';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const ApartInventario = () => {
  const baseUrl="http://localhost/apiProductosDelSolar/indexInv.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [inventarioSeleccionado, setInventarioSeleccionado]=useState({
    id: '',
    producto: '',
    codigo: '',
    precioa: '',
    preciob: '',
    precioc: '',
    costo: '',
    cantidad: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setInventarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(inventarioSeleccionado);
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
    f.append("producto", inventarioSeleccionado.producto);
    f.append("codigo", inventarioSeleccionado.codigo);
    f.append("precioa", inventarioSeleccionado.precioa);
    f.append("preciob", inventarioSeleccionado.preciob);
    f.append("precioc", inventarioSeleccionado.precioc);
    f.append("costo", inventarioSeleccionado.costo);
    f.append("cantidad", inventarioSeleccionado.cantidad);
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
    f.append("producto", inventarioSeleccionado.producto);
    f.append("codigo", inventarioSeleccionado.codigo);
    f.append("precioa", inventarioSeleccionado.precioa);
    f.append("preciob", inventarioSeleccionado.preciob);
    f.append("precioc", inventarioSeleccionado.precioc);
    f.append("costo", inventarioSeleccionado.costo);
    f.append("cantidad", inventarioSeleccionado.cantidad);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: inventarioSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(inventario=>{
        if(inventario.id===inventarioSeleccionado.id){
          inventario.producto=inventarioSeleccionado.producto;
          inventario.codigo=inventarioSeleccionado.codigo;
          inventario.precioa=inventarioSeleccionado.precioa;
          inventario.preciob=inventarioSeleccionado.preciob;
          inventario.precioc=inventarioSeleccionado.precioc;
          inventario.costo=inventarioSeleccionado.costo;
          inventario.cantidad=inventarioSeleccionado.cantidad;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
    peticionGet();
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: inventarioSeleccionado.id}})
    .then(response=>{
      console.log(response.status);
      setData(data.filter(inventario=>inventario.id!==inventarioSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarInventario=(inventario, caso)=>{
    setInventarioSeleccionado(inventario);

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
    <div
      className= "Inventario-center"
      // style={{
      //   alignItems: "center",
      //   textAlign: "center",
      //   display: "flex",
      //   justifyContent: "flex-end",
      //   marginTop: "20px",
      //   marginLeft: "310px",
      // }}
      >
            <div>
            <h1>Inventario</h1>
            <IconButton 
                    style={style2}
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
            <table>
            <thead>
                <tr>
                <th>Producto</th>
                <th>Código</th>
                <th>precioA</th>
                <th>precioB</th>
                <th>precioC</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(inventario=>(
                <tr key={inventario.id}>
                    <td>{inventario.producto}</td>
                    <td>{inventario.codigo}</td>
                    <td>${inventario.precioa}</td>
                    <td>${inventario.preciob}</td>
                    <td>${inventario.precioc}</td>
                    <td>${inventario.costo}</td>
                    <td>{inventario.cantidad}</td>
                <td>

                <IconButton 
                    color="inherit"
                    className="button muted-button"
                    fontsize="small"
                    onClick={
                        ()=>seleccionarInventario(inventario, "Editar")
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
                        ()=>seleccionarInventario(inventario, "Eliminar")
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
            <ModalHeader>Insertar Producto</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Producto: </label>
                <input type="text" className="form-control" name="producto" onChange={handleChange}/>
                <label>Código: </label>
                <input type="text" className="form-control" name="codigo" onChange={handleChange}/>
                <label>precioA: </label>
                <input type="text" className="form-control" name="precioa" onChange={handleChange}/>
                <label>precioB: </label>
                <input type="text" className="form-control" name="preciob" onChange={handleChange}/>
                <label>precioC: </label>
                <input type="text" className="form-control" name="precioc" onChange={handleChange}/>
                <label>Costo: </label>
                <input type="text" className="form-control" name="costo" onChange={handleChange}/>
                <label>Cantidad: </label>
                <input type="text" className="form-control" name="cantidad" onChange={handleChange}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <button style={{backgroundColor: '#203769', color: '#ffffff'}} className="btn" onClick={()=>peticionPost()}>Insertar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
            </Modal>


            
            <Modal isOpen={modalEditar}>
            <br />
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalBody>
                <div className="form-group">
                <label>Producto: </label>
                <input type="text" className="form-control" name="producto" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.producto}/>
                <label>Código: </label>
                <input type="text" className="form-control" name="codigo" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.codigo}/>
                <label>precioA: </label>
                <input type="text" className="form-control" name="precioa" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.precioa}/>
                <label>precioB: </label>
                <input type="text" className="form-control" name="preciob" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.preciob}/>
                <label>precioC: </label>
                <input type="text" className="form-control" name="precioc" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.precioc}/>
                <label>Costo: </label>
                <input type="text" className="form-control" name="costo" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.costo}/>
                <label>Cantidad: </label>
                <input type="text" className="form-control" name="cantidad" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.cantidad}/>
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
                ¿Estás seguro que deseas eliminar el Producto {inventarioSeleccionado && inventarioSeleccionado.producto}?
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
  );
}

export default ApartInventario;
