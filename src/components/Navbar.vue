<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link to="/" class="navbar-brand">Blog</router-link>
    <div class="collapse navbar-collapse">
      <div class="ml-auto">
        <input @keyup.enter="search" type="text" class="form-control" placeholder="Search">
      </div>
      <div class="ml-2" v-if="!isLogin">
        <button class="btn btn-primary" @click="redirectLogin">Login</button>
      </div>
      <div class="ml-2" v-else>
        <button class="btn btn-primary" @click="redirectAddArticle">Add post</button>
        <button class="btn btn-primary ml-2" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['isLogin'],
  methods: {
    logout () {
      this.$emit('logout')
    },
    redirectLogin () {
      this.$router.push('/user/login')
    },
    redirectAddArticle () {
      this.$router.push('/article/add')
    },
    search () {
      console.log('search')
    }
  }
}
</script>

