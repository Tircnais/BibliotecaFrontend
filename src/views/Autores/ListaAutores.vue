<template>
    <h1>Lista de Autores registrados</h1>

    <section v-if="huboerror">
        <div class="alert alert-danger" role="alert">    
            <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde.</p>
        </div>        
    </section>

    <section v-else>
        <div v-if="cargando" class="spinner">
            Espere carga...
        </div>

        <table class="table striped text-left mi-table">
            <thead>
                <tr>
                    <!-- <th scope="col">Id</th> -->
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha de nacimiento</th>
                    <th scope="col">Libros</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="autor in listaAutores" :key="autor.id">
                    <td>{{ autor.nombre }}</td>
                    <td>{{ autor.fecha_nacimiento }}</td>
                    <td>
                        <!-- Lista de libros de cada autor -->
                        <ul class="list-group">
                            <li v-for="libro in autor.libros" :key="libro.id" class="list-group-item">
                                <strong>{{ libro.titulo }}</strong> ({{ libro.anio }})<br />
                                <small><em>{{ libro.genero }} - {{ libro.idioma }}</em></small><br />
                                <p>{{ libro.descripcion }}</p>
                            </li>
                        </ul>
                    </td>
                </tr>

            </tbody>
        </table>
        <h5 class="text-left total">Total autores encontrados: {{ listaAutores.length }} </h5>

    </section>
</template>

<script>
    import axios from 'axios';
    import { confirmarBorrado } from '../../funciones';
    
    export default {
        data(){
            return {
                listaAutores: [], // Inicializar como arreglo vacío
                huboerror: false, // Asegúrate de tener esto en data
                cargando: true, // Asegúrate de tener esto en data
            }
        },

        mounted(){
            this.getListAutores();
        },
        methods: {
            getListAutores(){
                axios.get('http://localhost:8000/api/Autores/')
                .then(response => {
                    // Verifica que response.data sea un array
                    // console.info("Salida API:");
                    console.info(response);
                    // let autores = response.data.results; 
                    let autores = response.data; 
                    // console.info(books);
                    if (Array.isArray(autores)) {
                        this.listaAutores = autores;
                    } else {
                        console.error('La respuesta de la API no es un array');
                        this.listaAutores = [];
                    }
                    this.cargando = false;
                })
                .catch(error =>{
                    console.log(error);
                    this.huboerror = true; // Cambiar el estado de error
                    this.cargando = false; // Cambiar el estado de cargando
                });
            },

            // Función para alternar el estado colapsado de una fila
            toggleCollapse(id) {
                if (this.collapsedRows.includes(id)) {
                    this.collapsedRows = this.collapsedRows.filter((rowId) => rowId !== id);
                } else {
                    this.collapsedRows.push(id);
                }
            },
            // Función que verifica si una fila está colapsada
            isCollapsed(id) {
                return this.collapsedRows.includes(id);
            },
        }
    }
</script>

<style scoped>
    .mi-table {
        border: 2px solid #FAFAFA;
        text-align: left;
    }
    .table-striped {
        border: 2px solid #FAFAFA;
    }
    .mi-table thead tr {
        color: #17A2B8;
        border: 2px solid #FAFAFA;
    }
    .mi-table>tbody>tr:nth-child(odd)>td,
    .mi-table>tbody>tr:nth-child(odd)>th {
        background-color: #F9F9F9;
    }
    .total {
        border-top: 2px solid #F5F5F5;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 13px;
    }
    .spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        height:100px;
        width:100px;
        margin:0px auto;
        -webkit-animation: rotation .6s infinite linear;
        -moz-animation: rotation .6s infinite linear;
        -o-animation: rotation .6s infinite linear;
        animation: rotation .6s infinite linear;
        border-left:6px solid rgba(0,174,239,.15);
        border-right:6px solid rgba(0,174,239,.15);
        border-bottom:6px solid rgba(0,174,239,.15);
        border-top:6px solid rgba(0,174,239,.8);
        border-radius:100%;
    }

    @-webkit-keyframes rotation {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(359deg);}
    }
    @keyframes rotation {
        from {-moz-transform: rotate(0deg);}
        to {-moz-transform: rotate(359deg);}
    }
    @-o-keyframes rotation {
        from {-o-transform: rotate(0deg);}
        to {-o-transform: rotate(359deg);}
    }
</style>