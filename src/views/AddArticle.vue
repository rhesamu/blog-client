<template>
  <section class="addpost">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
          <h5 class="card-title">Add new post</h5>
            <div class="form-group">
              <input v-model="title" type="text" class="form-control" placeholder="Title">
            </div>
            <div class="form-group">
              <textarea v-model="content" rows="3" class="form-control" placeholder="Say what you need to say...">
              </textarea>
            </div>
            <div class="form-group">
              <input v-model="tags" type="text" class="form-control" placeholder="Add tags (separate by space)">
            </div>
            <div class="form-group">
              <button @click="addPost" class="btn btn-primary">Add post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      content: '',
      tags: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    addPost () {
      let self = this
      let token = localStorage.getItem('blog-token')
      axios({
        method: 'post',
        url: `${self.baseUrl}/articles`,
        headers: { token },
        data: {
          title: self.title,
          content: self.content,
          tags: self.tags.split(' ')
        }
      })
      .then(({ data }) => {
        this.$router.push('/')
      })
      .catch(({ response }) => {
        console.log(response)
      })
    }
  }
}
</script>

