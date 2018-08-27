<template>
  <section class="comments">
    <div class="row">
      <div class="col-sm-12">
        <h6>Comments</h6>
        <!-- Add comment -->
        <div class="card" style="margin-bottom: 1em">
          <div v-if="isComment" class="card-body">
            <div class="form-group">
              <input v-model="content" type="text" class="form-control" placeholder="Type your comment...">
            </div>
            <button @click="addComment" class="btn btn-primary">Add comment</button>
          </div>
          <div v-else class="card-body">
            <h5>Login to post comment.</h5>
          </div>
        </div>
        <!-- Comments -->
        <div class="list-group">
          <li v-if="comments.length == 0" class="list-group-item">
            <p class="mb-1">No comments yet.</p>
          </li>
          <li v-else v-for="(comment, idx) in comments" :key="idx" class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
              <p class="mb-1">{{ comment.content }}</p>
              <small>{{ comment.createdAt | filterDate }}</small>
            </div>
            <small>{{ comment.userId.name }}</small><br>
            <div v-if="comment.userId._id == currentUserId">
              <button @click="deleteComment(comment._id)" class="btn btn-danger">Delete</button>
            </div>
          </li>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['comments', 'currentUserId'],
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      isComment: false,
      content: ''
    }
  },
  created () {
    let token = localStorage.getItem('blog-token')
    if (token) {
      this.isComment = true
    } else {
      this.isComment = false
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
      return `${day}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
    }
  },
  methods: {
    addComment (event) {
      this.$emit('add-comment', {
        content: this.content
      })
    },
    deleteComment (commentId) {
      this.$emit('delete-comment', {
        commentId
      })
    }
  }
}
</script>
