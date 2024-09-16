import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco=''){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:mensaje,
        icon:icono,
        customClass: {confirmButton: 'btn btn-primary', popup: 'animated zoomIn'},
        buttonsStyling: false
    });
}

export function confirmarBorrado(id, name){
    let url = 'http://127.0.0.1:8000/api/Libros/' + id + '/';

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger'},
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Seguro de eliminar el libro ' + name,
        text: 'Se perderá la información del libro',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class= "fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class= "fa-solid fa-ban"></i> Cancelar'
    })
    .then((ressult) =>{
        if(ressult.isConfirmed){
            enviarSolicitud('DELETE', {id:id}, url, 'Libro eliminado')
        }else{
            show_alerta('Operación cancelada', 'info');
        }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje){
    let axiosConfig = { method: metodo, url: url };
    
    if (metodo !== 'DELETE') {
        axiosConfig.data = parametros; // Solo agrega parametros si no es DELETE
    }
    
    axios(axiosConfig)
    .then(function(respuesta){
        console.info('Salida del metodo: ' + metodo);
        console.log(respuesta);
        let cod = respuesta.status;
        let estado = respuesta.statusText;
        if (cod === 200 && estado === 'OK') {
            show_alerta(mensaje, status);
            window.setTimeout(function(){
                window.location.href= '/Libro/ListaLibros';
            }, 1600);
        }
        else if (cod === 201 && estado === 'Created') {
            show_alerta(mensaje, status);
            window.setTimeout(function(){
                window.location.href= '/Libro/ListaLibros';
            }, 1600);
        } else if (cod === 204 && metodo === 'DELETE') {
            // Si es una eliminación (DELETE) y el código es 204 (No Content)
            show_alerta('El libro fue eliminado', 'success');
            window.setTimeout(function() {
                window.location.href = '/Libro/ListaLibros';
            }, 1600);
        } else {
            // Manejo de errores cuando la respuesta tiene formato esperado
            let listado = '';
            let errores = respuesta.data.errors || [];  // Asegura que errores exista

            Object.keys(errores).forEach(key => listado += errores[key][0] + ".");
            show_alerta(listado, 'error');
        }
    }).catch(function(error){
        // Muestra el error completo para depuración
        console.error('Error en la solicitud:', error);
        show_alerta('Error en la solicitud: ' + error.message, 'error');
    });
}
