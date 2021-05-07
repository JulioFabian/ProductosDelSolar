import React from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const AddClientForm = (props) => {

  const initialFormState = {
    id: null, nombre: '', apellido: '', telefono: '',
    tipo: '', direccion: '', fecha: '', hora: ''
  }
  const [client, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setUser({ ...client, [name]: value })
  }

  const classes = useStyles();

  return (
    <form
    className={classes.root}
    onSubmit={(event) => {
      event.preventDefault()
      if (!client.nombre || !client.apellido || !client.telefono || !client.tipo || !client.direccion
        || !client.fecha || !client.hora || client.tipo<'A' || client.tipo>'C' || (client.telefono).length!==10){
          return
      }

      props.addClient(client)
      setUser(initialFormState)
    }}
  >
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Nombre</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="nombre"
      value={client.nombre}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Apellido</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="apellido"
      value={client.apellido}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Telefono</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="telefono"
      value={client.telefono}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Tipo</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="tipo"
      value={client.tipo}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Dirección</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="direccion"
      value={client.direccion}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    </div>
    <div>
     <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        name="fecha"
        format="yyyy/MM/dd"
        value={client.fecha}
        className={clsx(classes.margin, classes.textField)}
        InputLabelProps={{
          shrink: true,
        }}
        helperText="Fecha"
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-adornment-amount"
        type="time"
        name="hora"
        value={client.hora}
        className={clsx(classes.margin, classes.textField)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        helperText="Hora"
        onChange={handleInputChange}
      />
      </form>
    </div>
    <div>
    <button 
      variant="contained"
    >Agregar Cliente</button>
    </div>
    </div>
  </form> 
  )
}

export default AddClientForm

/*<form
    className={classes.root}
    onSubmit={(event) => {
      event.preventDefault()
      if (!client.nombre || !client.apellido || !client.telefono || !client.tipo || !client.direccion){
          return
      }

      props.addClient(client)
      setUser(initialFormState)
    }}
  >
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Nombre</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="nombre"
      value={client.nombre}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Apellido</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="apellido"
      value={client.apellido}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Telefono</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="telefono"
      value={client.telefono}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Tipo</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="tipo"
      value={client.tipo}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Dirección</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="direccion"
      value={client.direccion}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    </div>
    </div>
    <div>
    <button 
      variant="contained"
    >Agregar Cliente</button>
    </div>
  </form> */