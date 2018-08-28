<template>
  <section class="editpost">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
          <h5 class="card-title">Edit post</h5>
            <div class="form-group">
              <input v-model="title" type="text" class="form-control" placeholder="Title">
            </div>
            <div class="form-group">
              <wysiwyg v-model="content" />
            </div>
            <div class="form-group">
              <input v-model="tags" type="text" class="form-control" placeholder="Add tags (separate by space)">
            </div>
            <div class="form-group">
              <button @click="editPost" class="btn btn-primary">Edit post</button>
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
      baseUrl: 'http://35.240.129.41',
      param: this.$route.params.id
    }
  },
  created () {
    let token = localStorage.getItem('blog-token')
    let self = this
    axios({
      method: 'get',
      url: `${self.baseUrl}/articles/${self.param}`,
    })
    .then(({ data }) => {
      // console.log(data)
      self.title = data.title
      self.content = data.content
      self.tags = data.tags.join(' ')
    })
    .catch(({ response }) => {
      console.log(response)
    })
  },
  methods: {
    editPost () {
      let self = this
      let token = localStorage.getItem('blog-token')
      axios({
        method: 'put',
        url: `${self.baseUrl}/articles/${self.param}`,
        headers: { token },
        data: {
          title: self.title,
          content: self.content,
          tags: self.tags.split(' ')
        }
      })
      .then(({ data }) => {
        this.$router.push(`/${self.param}`)
      })
      .catch(({ response }) => {
        console.log(response)
      })
    }
  }
}
</script>