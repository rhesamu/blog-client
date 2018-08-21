<template>
  <section class="blog-content">
    <h1 class="title">{{ article.title }}</h1>
    <p>Published at: {{ article.createdAt }}</p>
    <p>Author: {{ article.author.name }}</p>
    <div>
      <p>{{ article.content }}</p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      param: this.$route.params.id,
      article: {}
    }
  },
  created() {
    let self = this
    axios({
      method: 'get',
      url: `http://localhost:3000/articles/${self.$route.params.id}`
    })
    .then(({ data }) => {
      self.article = data
    })
    .catch(err => {
      console.log(err.response)
    })
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      console.log('hehe')
      this.param = this.$route.params.id

      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${self.param}`
      })
      .then(({ data }) => {
        self.article = data
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Roboto Slab', serif;
}

p {
  line-height: 2em;
}
</style>


