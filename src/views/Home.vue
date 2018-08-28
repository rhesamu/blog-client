<template>
  <section class="blog">
  <!-- blog list -->
    <div v-if="articles.length == 0" class="row">
      <div class="col-sm-12 text-center">
        <h5>No articles yet.</h5>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-sm-4">
        <div class="list-group">
          <router-link v-for="(article, index) in articles" :key="index" :to='article._id' class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ article.title }}</h5>
              <small>{{ article.createdAt | filterDate }}</small>
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
  filters: {
    filterDate (value) {
      let date = new Date(value)
      let day = date.getDay()
      switch (day) {
        case 0: { day = "Sunday"; break; }
        case 1: { day = "Monday"; break; }
        case 2: { day = "Tuesday"; break; }
        case 3: { day = "Wednesday"; break; }
        case 4: { day = "Thursday"; break; }
        case 5: { day = "Friday"; break; }
        case 6: { day = "Saturday"; break; }
      }
      return `${day}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: 'http://35.240.129.41/articles'
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
