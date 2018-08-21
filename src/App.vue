<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <router-link to="/" class="navbar-brand">Blog</router-link>
      <div class="collapse navbar-collapse">
        <button class="btn btn-primary ml-auto">Add post</button>
        <button class="btn btn-primary ml-2">Login</button>
      </div>
    </nav>
    <div class="container-fluid" style="margin-top: 80px">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
