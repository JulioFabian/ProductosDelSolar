import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const Inventary = (props) => {

    console.log(props.products)


    return(
        <table>
            <thead>
            <tr>
                <th>Producto</th>
                <th>Codigo</th>
                <th>PrecioA</th>
                <th>PrecioB</th>
                <th>PrecioC</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                {
                    props.products.length > 0 ?
                    props.products.map(product => (
                        <tr key={product.id}>
                            <td>{product.producto}</td>
                            <td>#{product.codigo}</td>
                            <td>${product.precioA}</td>
                            <td>${product.precioB}</td>
                            <td>${product.precioC}</td>
                            <td>${product.costo}</td>
                            <td>{product.cantidad}</td>
                            <td>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    fontsize="small"
                                    onClick={
                                        () => {props.editRow(product)}
                                    }
                                    aria-label="create"
                                >
                                    <CreateIcon fontSize="small" 
                                />
                                </IconButton>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    onClick = {() => {props.deleteProduct(product.id)}}
                                    aria-label="delete"
                                >
                                    <DeleteIcon fontSize="small" 
                                />
                                </IconButton>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4}>No hay productos</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default Inventary