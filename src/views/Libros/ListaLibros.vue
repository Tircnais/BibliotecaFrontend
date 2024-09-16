<template>
    <h1>Lista de libros registrados</h1>

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
                    <th scope="col">Titulo</th>
                    <th scope="col">Año</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Idioma</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="libro in listalibros" :key="libro.id">
                    <!-- <th scope="row">{{ libro ? libro.id : 'N/A' }}</th> -->
                    <td>{{ libro ? libro.titulo : 'N/A' }}</td>
                    <td>{{ libro ? libro.anio : 'N/A' }}</td>
                    <td>{{ libro ? libro.genero : 'N/A' }}</td>
                    <td>{{ libro ? libro.idioma : 'N/A' }}</td>
                    <td>
                        <router-link
                            class="btn btn-light text-info" 
                            title="Editar libro" :to="{ name: 'EditarLibro', params: { id: libro.id } }">🔍
                        </router-link>
                        <button class="btn btn-danger" v-on:click="eliminar(libro.id, libro.titulo)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5 class="text-left total">Total libros encontrados: {{ listalibros.length }} </h5>

    </section>
</template>

<script>
    import axios from 'axios';
    import { confirmarBorrado } from '../../funciones';
    // se llama a la lib de la paginacion
    export default {
        data(){
            return {
                listalibros: [], // Inicializar como arreglo vacío
                huboerror: false, // Asegúrate de tener esto en data
                cargando: true, // Asegúrate de tener esto en data
            }
        },

        mounted(){
            this.getListLibros();
        },
        methods: {
            getListLibros(){
                axios.get('http://127.0.0.1:8000/api/Libros/')
                .then(response => {
                    // Verifica que response.data sea un array
                    // console.info("Salida API:");
                    // console.info(response);
                    // let books = response.data.results; 
                    let books = response.data; 
                    // console.info(books);
                    if (Array.isArray(books)) {
                        this.listalibros = books;
                    } else {
                        console.error('La respuesta de la API no es un array');
                        this.listalibros = [];
                    }
                    this.cargando = false;
                })
                .catch(error =>{
                    console.log(error);
                    this.huboerror = true; // Cambiar el estado de error
                    this.cargando = false; // Cambiar el estado de cargando
                });
            },

            eliminar(id, name){
                confirmarBorrado(id, name);
            }
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