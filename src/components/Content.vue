<template>
  <section class="blog-content">
    <h1 class="title">{{ article.title }}</h1>
    <h6>Published at: {{ article.createdAt | filterDate }}</h6>
    <h6>Author: {{ article.author.name }}</h6>
    <div>
      <h6>Tags: 
        <a v-for="(tag, idx) in article.tags" :key="idx" href="#" class="badge badge-primary mr-1">{{ tag }}</a>
      </h6>
    </div>
    <hr>
    <div>
      <p>{{ article.content }}</p>
    </div>

    <Comments
      :comments="comments"
      @add-comment="addComment"
    />
  </section>
</template>

<script>
import axios from 'axios'
import Comments from '@/components/Comments.vue'

export default {
  components: {
    Comments
  },
  data () {
    return {
      param: this.$route.params.id,
      article: {},
      comments: null,
      baseUrl: 'http://localhost:3000'
    }
  },
  created () {
    let self = this
    axios({
      method: 'get',
      url: `${self.baseUrl}/articles/${self.$route.params.id}`
    })
    .then(({ data }) => {
      self.article = data
    })
    .catch(err => {
      console.log(err.response)
    })

    self.getComments()
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
  watch: {
    '$route' (to, from) {
      // react to route changes...
      // console.log('hehe')
      this.param = this.$route.params.id

      let self = this
      axios({
        method: 'get',
        url: `${self.baseUrl}/articles/${self.param}`
      })
      .then(({ data }) => {
        self.article = data
      })
      .catch(err => {
        console.log(err.response)
      })

      self.getComments()
    }
  },
  methods: {
    getComments () {
      let self = this
      axios({
        method: 'get',
        url: `${self.baseUrl}/comments/${self.param}`
      })
      .then(({ data }) => {
        console.log(data)
        self.comments = data.comments
      })
      .catch(({ response }) => {
        console.log('comments error -->', response)
      })
    },
    addComment (value) {
      let self = this
      let token = localStorage.getItem('blog-token')
      axios({
        method: 'post',
        url: `${self.baseUrl}/comments/`,
        headers: { token },
        data: {
          articleId: self.param,
          content: value.content
        }
      })
      .then(({ data }) => {
        self.getComments()
        console.log('add comment')
      })
      .catch(({ response }) => {
        console.log('error -->', response)
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


