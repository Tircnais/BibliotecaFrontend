<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Para revisar la <a href="http://127.0.0.1:8000/docs/" target="_blank" rel="noopener">documentación</a> del API, construida en Django dirijase a al link proporcionado.

    </p>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
