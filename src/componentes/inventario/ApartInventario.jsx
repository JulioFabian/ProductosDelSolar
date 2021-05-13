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
  const baseUrl="http://localhost/apiInventario/index.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [inventarioSeleccionado, setInventarioSeleccionado]=useState({
    id: '',
    producto: '',
    codigo: '',
    precioA: '',
    precioB: '',
    precioC: '',
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
    f.append("precioA", inventarioSeleccionado.precioA);
    f.append("precioB", inventarioSeleccionado.precioB);
    f.append("precioC", inventarioSeleccionado.precioC);
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
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("producto", inventarioSeleccionado.producto);
    f.append("codigo", inventarioSeleccionado.codigo);
    f.append("precioA", inventarioSeleccionado.precioA);
    f.append("precioB", inventarioSeleccionado.precioB);
    f.append("precioC", inventarioSeleccionado.precioC);
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
          inventario.precioA=inventarioSeleccionado.precioA;
          inventario.precioB=inventarioSeleccionado.precioB;
          inventario.precioC=inventarioSeleccionado.precioC;
          inventario.costo=inventarioSeleccionado.costo;
          inventario.cantidad=inventarioSeleccionado.cantidad;
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
    await axios.post(baseUrl, f, {params: {id: inventarioSeleccionado.id}})
    .then(response=>{
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
      style={{
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
        marginLeft: "310px",
        marginRight: "280px",
        color: "black",
      }}
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
                <th>ID</th>
                <th>Producto</th>
                <th>Código</th>
                <th>PrecioA</th>
                <th>PrecioB</th>
                <th>PrecioC</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(inventario=>(
                <tr key={inventario.id}>
                    <td>{inventario.id}</td>
                    <td>{inventario.producto}</td>
                    <td>{inventario.codigo}</td>
                    <td>${inventario.precioA}</td>
                    <td>${inventario.precioB}</td>
                    <td>${inventario.precioC}</td>
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
                <label>PrecioA: </label>
                <input type="text" className="form-control" name="precioA" onChange={handleChange}/>
                <label>PrecioB: </label>
                <input type="text" className="form-control" name="precioB" onChange={handleChange}/>
                <label>PrecioC: </label>
                <input type="text" className="form-control" name="precioC" onChange={handleChange}/>
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
                <label>PrecioA: </label>
                <input type="text" className="form-control" name="precioA" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.precioA}/>
                <label>PrecioB: </label>
                <input type="text" className="form-control" name="precioB" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.precioB}/>
                <label>PrecioC: </label>
                <input type="text" className="form-control" name="precioC" onChange={handleChange} value={inventarioSeleccionado && inventarioSeleccionado.precioC}/>
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


/*import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddProductForm from './AddProductForm';
import InventaryTab from './InventaryTab';
import EditProductForm from './EditProductForm'

const ApartInventario = () => {

    const productsData = [
        { id: uuidv4(), producto: 'Quesillo', codigo: '1f23', precioA: 4.5, precioB: 5.5, precioC: 6.5, costo: 3.5, cantidad: 10 },
        { id: uuidv4(), producto: 'Cafe', codigo: '1f24', precioA: 7.5, precioB: 8.5, precioC: 9.5, costo: 6.5, cantidad: 15 },
        { id: uuidv4(), producto: 'Queso', codigo: '1f25', precioA: 10.5, precioB: 11.5, precioC: 12.5, costo: 9.5, cantidad: 20 },
      ]

      //state
      const [products, setProducts] = useState(productsData)

      //Agregar productos

      const addProduct = (product) => {
          product.id=uuidv4()
          setProducts([
              ...products,
              product
          ])
      }

      //Eliminar Productos
      const deleteProduct = (id) => {
          const arrayFiltrado = products.filter(product => product.id !== id);
        setProducts(arrayFiltrado)
      }

      //Editar Usuarios
      const [editing, setEditing1] = useState(false)

      const [currentProduct, setCurrentProduct] = useState({
        id: null, producto: '', codigo: '', precioA: '', precioB: '', precioC: '', costo: '', cantidad: ''
      });

      const editRow = (product) => {
        setEditing1(true);
          setCurrentProduct({
            id: product.id, producto: product.producto, 
            codigo: product.codigo, precioA: product.precioA, 
            precioB: product.precioB, precioC: product.precioC, 
            costo: product.costo, cantidad: product.cantidad
          })
      }

      const updateProduct = (id, updateProduct) => {
        setEditing1(false);
        setProducts(products.map(product => (product.id === id ? updateProduct : product)))
      }

    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-large">

                    {
                        editing ? (
                            <div>
                                <h2>Editar Producto</h2>
                                <EditProductForm 
                                    setEditing1={setEditing1}
                                    currentProduct={currentProduct}
                                    updateProduct={updateProduct}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Agregar Producto</h2>
                                <AddProductForm addProduct={addProduct}/>
                            </div>
                        )
                    }
                </div>
                <div className="flex-large">
                <h2>Inventario</h2>
                <InventaryTab
                    products={products} 
                    deleteProduct={deleteProduct} 
                    editRow={editRow}
                />
                </div>
            </div>
        </div>
    )
}

export default ApartInventario*/