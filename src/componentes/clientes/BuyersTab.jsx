import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Button } from '@material-ui/core';

const Buyers = (props) => {

    console.log(props.clients)

    return(
        <table>
            <thead>
            <tr>
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
                {
                    props.clients.length > 0 ?
                    props.clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.nombre}</td>
                            <td>{client.apellido}</td>
                            <td>{client.telefono}</td>
                            <td>{client.tipo}</td>
                            <td>{client.direccion}</td>
                            <td>{client.fecha}</td>
                            <td>{client.hora}</td>
                            <td>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    fontsize="small"
                                    onClick={
                                        () => {props.editRow(client)}
                                    }
                                    aria-label="create"
                                >
                                    <CreateIcon fontSize="small" 
                                />
                                </IconButton>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    onClick = {() => {props.deleteClient(client.id)}}
                                    aria-label="delete"
                                >
                                    <DeleteIcon fontSize="small" 
                                />
                                </IconButton>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4}>No hay clientes</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default Buyers

/*<table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Tipo</th>
                <th>Dirección</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                {
                    props.clients.length > 0 ?
                    props.clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.nombre}</td>
                            <td>{client.apellido}</td>
                            <td>{client.telefono}</td>
                            <td>{client.tipo}</td>
                            <td>{client.direccion}</td>
                            <td>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    fontsize="small"
                                    onClick={
                                        () => {props.editRow(client)}
                                    }
                                    aria-label="create"
                                >
                                    <CreateIcon fontSize="small" 
                                />
                                </IconButton>
                                <IconButton 
                                    color="inherit"
                                    className="button muted-button"
                                    onClick = {() => {props.deleteClient(client.id)}}
                                    aria-label="delete"
                                >
                                    <DeleteIcon fontSize="small" 
                                />
                                </IconButton>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4}>No hay clientes</td>
                        </tr>
                    )
                }
            </tbody>
        </table> */

/*const Buyers = (props) => {
    return(
        <h1>Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</h1>

    )
}

export default Buyers*/