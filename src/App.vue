<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Dropdown de Libros -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarLibros"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Libros
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarLibros">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'ListaLibros' }">
                  Lista de Libros
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{ name: 'NuevoLibro' }">
                  Nuevo Libro
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Dropdown de Autores -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarAutores"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Autores
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarAutores">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'ListaAutores' }">
                  Lista Autores
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Dropdown de Graficas -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarGraficos"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Graficas
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarGraficos">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'Graficos' }">
                  Ver Estadísticas
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="contanier-fluid mt-3">
    <router-view/>
  </div>
</template>
