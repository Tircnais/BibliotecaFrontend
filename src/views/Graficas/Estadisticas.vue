<template>
    <h1>Graficas API Newsapi</h1>

    <div class="row">
        <div class="col-6">
            <h3>Gráfica Cantidad de articulos por día</h3>
            <div class="row">
                <canvas id="graficaArticulos" width="400" height="200"></canvas>
            </div>
        </div>
        <div class="col-6">
            <h3>Gráfica de Artículos por Autor</h3>
            <div class="row">
                <canvas id="graficaAutores" width="400" height="200"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

export default {
    data() {
        return {
            listaArticulos: [], // Inicializar como arreglo vacío
            huboError: false, // Asegúrate de tener esto en data
            cargando: true, // Asegúrate de tener esto en data
        }
    },

    mounted() {
        this.getGraficoA();
        this.getGraficoAutores();
    },

    methods: {
        getGraficoA() {
            axios.get('https://newsapi.org/v2/everything?q=Vida&from=2024-09-15&sortBy=popularity&apiKey=3b5003a406ef45308404b455e9310ebb')
                .then(response => {
                    console.info(response);
                    this.listaArticulos = response.data.articles;  // Asignar los artículos a listaArticulos
                    this.cargando = false;
                    this.generarGrafica();
                })
                .catch(error => {
                    console.log(error);
                    this.huboError = true;
                    this.cargando = false;
                });
        },

        contarArticulosPorDia(articulos) {
            const conteo = {};
            articulos.forEach(articulo => {
                const fecha = articulo.publishedAt.split('T')[0];  // Extrae solo la fecha
                conteo[fecha] = (conteo[fecha] || 0) + 1;
            });
            return conteo;
        },

        generarGrafica() {
            const conteo = this.contarArticulosPorDia(this.listaArticulos);
            const etiquetas = Object.keys(conteo);  // Fechas
            const valores = Object.values(conteo);  // Cantidades

            const ctx = document.getElementById('graficaArticulos').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: 'Cantidad de artículos por día',
                        data: valores,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        // grafico 2
        getGraficoAutores() {
            axios.get('https://newsapi.org/v2/everything?q=Vida&from=2024-09-15&sortBy=popularity&apiKey=3b5003a406ef45308404b455e9310ebb')
                .then(response => {
                    console.info(response);
                    this.listaArticulos = response.data.articles;  // Asignar los artículos a listaArticulos
                    this.cargando = false;
                    this.generarGraficaAutores();
                })
                .catch(error => {
                    console.log(error);
                    this.huboError = true;
                    this.cargando = false;
                });
        },

        contarArticulosPorAutor(articulos) {
            const conteo = {};
            articulos.forEach(articulo => {
                const autor = articulo.author || 'Desconocido';  // Usar 'Desconocido' si no hay autor
                conteo[autor] = (conteo[autor] || 0) + 1;
            });
            return conteo;
        },

        generarGraficaAutores() {
            const conteo = this.contarArticulosPorAutor(this.listaArticulos);
            const etiquetas = Object.keys(conteo);  // Autores
            const valores = Object.values(conteo);  // Cantidades

            const ctx = document.getElementById('graficaAutores').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: 'Cantidad de artículos por autor',
                        data: valores,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                maxRotation: 90,
                                minRotation: 45
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
}
</script>
