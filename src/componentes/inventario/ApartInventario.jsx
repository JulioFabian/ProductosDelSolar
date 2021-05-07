import React, { useState } from 'react';
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

export default ApartInventario