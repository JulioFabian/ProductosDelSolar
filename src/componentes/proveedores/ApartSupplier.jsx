import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddSupplierForm from './AddSupplierForm';
import EditSupplierForm from './EditSupplierForm';
import SuppliersTab from './SuppliersTab';

const ApartSupplier = () => {

    const suppliersData = [
        { id: uuidv4(), nombre: 'Julio', direccion: '16 de septiembre #414', telefono: '9513268765' },
        { id: uuidv4(), nombre: 'Jorge', direccion: 'Guerrero #315', telefono: '9512739854'},
        { id: uuidv4(), nombre: 'Sebastian', direccion: 'Independencia #512', telefono: '9512853764' },
      ]

      //state
      const [suppliers, setSuppliers] = useState(suppliersData)

      //Agregar productos

      const addSupplier = (supplier) => {
          supplier.id=uuidv4()
          setSuppliers([
              ...suppliers,
              supplier
          ])
      }

      //Eliminar Productos
      const deleteSupplier = (id) => {
          const arrayFiltrado = suppliers.filter(supplier => supplier.id !== id);
        setSuppliers(arrayFiltrado)
      }

      //Editar Usuarios
      const [editingS, setEditingSupplier] = useState(false)

      const [currentSupplier, setCurrentSupplier] = useState({
        id: null, nombre: '', direccion: '', telefono: ''
      });

      const editRow = (supplier) => {
        setEditingSupplier(true);
          setCurrentSupplier({
            id: supplier.id, nombre: supplier.nombre, 
            direccion: supplier.direccion, telefono: supplier.telefono
          })
      }

      const updateSupplier = (id, updateSupplier) => {
        setEditingSupplier(false);
        setSuppliers(suppliers.map(supplier => (supplier.id === id ? updateSupplier : supplier)))
      }

    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-large">
                    <div>
                    {
                        editingS ? (
                            <div>
                                <h2>Editar Proveedor</h2>
                                <EditSupplierForm 
                                    setEditingSupplier={setEditingSupplier}
                                    currentSupplier={currentSupplier}
                                    updateSupplier={updateSupplier}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Agregar Proveedor</h2>
                                <AddSupplierForm addSupplier={addSupplier}/>
                            </div>
                        )
                    }
                    </div>
                </div>
                <div className="flex-large">
                <h2>Proveedores</h2>
                <SuppliersTab 
                    suppliers={suppliers} 
                    deleteSupplier={deleteSupplier} 
                    editRow={editRow}
                />
                </div>
            </div>
        </div>
    )
}

export default ApartSupplier