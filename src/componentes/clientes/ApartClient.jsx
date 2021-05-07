import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddClientForm from './AddClientForm';
import EditClientForm from './EditClientForm';
import BuyersTab from './BuyersTab';

const ApartClient = () => {

    const clientsData = [
        { id: uuidv4(), nombre: 'Julio', apellido: 'Fabián', telefono: '9513268765', tipo: 'A', direccion: '16 de septiembre #414', fecha: '2021-11-05', hora: '07:30' },
        { id: uuidv4(), nombre: 'Jorge', apellido: 'Rios', telefono: '9512739854', tipo: 'B', direccion: 'Guerrero #315', fecha: '2021-12-06', hora: '08:40'},
        { id: uuidv4(), nombre: 'Sebastian', apellido: 'Pastrana', telefono: '9512853764', tipo: 'C', direccion: 'Independencia #512', fecha: '2021-13-07', hora: '09:50' },
      ]

      //state
      const [clients, setClients] = useState(clientsData)

      //Agregar productos

      const addClient = (client) => {
          client.id=uuidv4()
          setClients([
              ...clients,
              client
          ])
      }

      //Eliminar Productos
      const deleteClient = (id) => {
          const arrayFiltrado = clients.filter(client => client.id !== id);
        setClients(arrayFiltrado)
      }

      //Editar Usuarios
      const [editingC, setEditingClient] = useState(false)

      const [currentClient, setCurrentClient] = useState({
        id: null, nombre: '', apellido: '', telefono: '', tipo: '', 
        direccion: '', fecha: '', hora: ''
      });

      const editRow = (client) => {
        setEditingClient(true);
          setCurrentClient({
            id: client.id, nombre: client.nombre, 
            apellido: client.apellido, telefono: client.telefono, 
            tipo: client.tipo, direccion: client.direccion,
            fecha: client.fecha, hora: client.hora
          })
      }

      const updateClient = (id, updateClient) => {
        setEditingClient(false);
        setClients(clients.map(client => (client.id === id ? updateClient : client)))
      }

    return (
        <div className="container">
            <div className="flex-row">
                <div>
                <div className="flex-large">
                    <div>
                    {
                        editingC ? (
                            <div>
                                <h2>Editar Cliente</h2>
                                <EditClientForm 
                                    setEditingClient={setEditingClient}
                                    currentClient={currentClient}
                                    updateClient={updateClient}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Agregar Cliente</h2>
                                <AddClientForm addClient={addClient}/>
                            </div>
                        )
                    }
                    </div>
                </div>
                </div>
                <div className="flex-large">
                <h2>Clientes</h2>
                <BuyersTab 
                    clients={clients} 
                    deleteClient={deleteClient} 
                    editRow={editRow}
                />
                </div>
            </div>
        </div>
    )
}

export default ApartClient

/*{
                        editing ? (
                            <div>
                                <h2>Editar Cliente</h2>
                                <EditClientForm 
                                    setEditingClient={setEditingClient}
                                    currentClient={currentClient}
                                    updateClient={updateClient}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Agregar Cliente</h2>
                                <AddClientForm addClient={addClient}/>
                            </div>
                        )
                    } */