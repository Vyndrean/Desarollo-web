import React, { Fragment, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';
import MaterialDatatable from 'material-datatable';
import './PersonaMaterial.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const PersonaMaterial = () => {
    const [accion, SetAccion] = useState("Guardar")
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])
    const [id,setId] = useState("");

    const handleInputChangeNombre = (event) => {
        setNombre(event.target.value)
    }
    
    const handleInputChangeApellido = (event) => {
        setApellido(event.target.value)

    }

    const enviarDatos = () => {
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)
        guardarPersona();
    }

    useEffect(()=>{

        getPersonas()
    },[])
    async function getPersonas() {
        try {
          const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=6');
          if(response.status == 200)
          {
            
            setPersonas(response.data.persona)
            console.log(response.data);


          }
         
        } catch (error) {
          console.error(error);
        }
      }
    
      function guardarPersona()
      {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:6
          })
          .then(function (response) {

                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                  )
                if(response.status==200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      function regPersona()
      {
        axios.put('http://192.99.144.232:5000/api/personas/' + id, {
            name: nombre,
            apellido: apellido,
            grupo:6
          })
          .then(function (response) {

                if(response.status==200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const columns = [
        {
         name: "Nombre",
         field: "nombre",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Apellido",
         field: "apellido",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
        name: "User_Id",
        field: "_id",
        options: {
            filter: true,
            sort: false,
        }
        }
       ];

    const data = [
        { name: "Name 1", title: "Title 1", location: "Location 1", age: 30, salary: 10 },
        { name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11 },
    ];

    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData.name)
    };
    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };
    return (

        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Personas
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} fullWidth>
                    <TextField name="nombre" label="Nombre" variant="outlined" fullWidth onChange={handleInputChangeNombre} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name="apellido" label="Apellido" variant="outlined" fullWidth onChange={handleInputChangeApellido} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="primary" fullWidth>{enviarDatos}Guardar</Button>

                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="secondary" fullWidth
                    >Eliminar</Button>
                </Grid>
            </Grid>

      
            <Grid item xs={12} md={12} className="tabla">
            <MaterialDatatable
                title={"Lista de Personas"}
                data={personas}
                columns={columns}
                options={options}
            />
            
        </Grid>
      

        </Container>
    )
}
export default PersonaMaterial