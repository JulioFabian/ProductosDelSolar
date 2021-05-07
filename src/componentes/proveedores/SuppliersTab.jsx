import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const SuppliersTab = (props) => {

    console.log(props.suppliers)

    return(
        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                {
                    props.suppliers.length > 0 ?
                    props.suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.nombre}</td>
                            <td>{supplier.direccion}</td>
                            <td>{supplier.telefono}</td>
                            <td>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    fontsize="small"
                                    onClick={
                                        () => {props.editRow(supplier)}
                                    }
                                    aria-label="create"
                                >
                                    <CreateIcon fontSize="small" 
                                />
                                </IconButton>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    onClick = {() => {props.deleteSupplier(supplier.id)}}
                                    aria-label="delete"
                                >
                                    <DeleteIcon fontSize="small" 
                                />
                                </IconButton>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4}>No hay proveedores</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default SuppliersTab