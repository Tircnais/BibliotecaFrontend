<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Nuevo libro
                </div>
                <div class="card-body">
                    <form @submit.prevent="guardar">
                        <div class="form-group">
                            <label for="intputTitulo">Titulo</label>
                            <input type="text" class="form-control" v-model="intputTitulo" id="intputTitulo" aria-describedby="tituloHelp" placeholder="Ingrese el titulo">
                            <small id="tituloHelp" class="form-text text-muted">Solo puede ingresar 255 caracteres.</small>
                        </div>
                        <div class="form-group">
                            <label for="intputAnio">Año</label>
                            <input type="number" class="form-control" v-model="intputAnio" id="intputAnio" aria-describedby="anioHelp" placeholder="Ingrese el año">
                            <small id="anioHelp" class="form-text text-muted">Solo se permite números.</small>
                        </div>
                        <div class="form-group">
                            <label for="intputGenero">Genero</label>
                            <input type="text" class="form-control" v-model="intputGenero" id="intputGenero" aria-describedby="generoHelp" placeholder="Ingrese el genero">
                            <small id="generoHelp" class="form-text text-muted">Solo puede ingresar 100 caracteres.</small>
                        </div>
                        <div class="form-group">
                            <label for="intputIdioma">Idioma</label>
                            <input type="text" class="form-control" v-model="intputIdioma" id="intputIdioma" aria-describedby="idiomaHelp" placeholder="Ingrese el idioma">
                            <small id="idiomaHelp" class="form-text text-muted">Solo puede ingresar 50 caracteres.</small>
                        </div>
                        <div class="form-group">
                            <label for="intputDescp">Descripción</label>
                            <input type="text" class="form-control" v-model="intputDescp" id="intputDescp" aria-describedby="descpHelp" placeholder="Ingrese la descripcion">
                            <small id="descpHelp" class="form-text text-muted">Ingrese la descripción del libro.</small>
                        </div>
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { show_alerta, enviarSolicitud } from '../../funciones';

    export default{
        data(){
            return{
                intputTitulo: '', intputAnio: '', intputGenero: '', intputIdioma: '', intputDescp: '', url: 'http://localhost:8000/api/Libros/'
            }
        },
        methods:{
            guardar(){
                event.preventDefault();
                if(this.intputTitulo.trim() === ''){
                    show_alerta('Debe ingresar el titulo', 'warning', 'nombre');
                }
                else if(this.intputAnio === ''){
                    show_alerta('Debe ingresar el año', 'warning', 'año');
                }
                else if(this.intputTitulo.length > 255){
                    show_alerta('El titulo tiene más de 255 caracteres', 'warning', 'titulo');
                }
                else if(this.intputAnio < 1000){
                    show_alerta('El año debería ser mayor a 1000', 'warning', 'año');
                }
                else if(this.intputGenero.length > 100){
                    show_alerta('El genero tiene más de 100 caracteres', 'warning', 'genero');
                }
                else if(this.intputIdioma.length > 50){
                    show_alerta('El idioma tiene más de 50 caracteres', 'warning', 'idioma');
                }
                else {
                    let params = { 
                        titulo: this.intputTitulo.trim(),
                        anio: this.intputAnio,
                        genero: this.intputGenero.trim(),
                        idioma: this.intputIdioma.trim(),
                        descripcion: this.intputDescp.trim()
                    }
                    enviarSolicitud('POST', params, this.url, 'Libro guardado');
                }
            }
        }
    }
</script>