<template>
  <section class="blog">
  <!-- blog list -->
    <div class="row">
      <div class="col-sm-4">
        <div class="list-group">
          <router-link v-for="(article, index) in articles" :key="index" :to='article._id' class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ article.title }}</h5>
              <small>{{ article.createdAt }}</small>
            </div>
            <small>Author: {{ article.author.name }}</small>
          </router-link>
        </div>
      </div>

      <div class="col-sm-8" style="padding-right: 2em">
        <!-- blog view -->
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      articles: []
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/articles'
    })
    .then(({ data }) => {
      self.articles = data
    })
    .catch(err => {
      console.log(err.response)
    })
  }
}
</script>
