<template>
  <section class="login">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <h5 class="card-header">Login</h5>
          <div class="card-body">
            <div class="form-group">
              <input v-model="email" type="text" class="form-control" placeholder="Email address">
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <button @click="login" type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="form-group">
              <router-link to="/user/register">Don't have an account? Register here</router-link>
            </div>
            <div v-if="errorMsg !== ''" class="form-group">
              <small style="color: red">{{ errorMsg }}</small>
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
      email: '',
      password: '',
      errorMsg: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    login () {
      let self = this
      axios({
        method: 'post',
        url: `${self.baseUrl}/login`,
        data: {
          email: self.email,
          password: self.password
        }
      })
      .then(({ data }) => {
        console.log(data)
        localStorage.setItem('blog-token', data.token)
        this.$router.push('/')
      })
      .catch(({ response }) => {
        console.log(response)
        self.errorMsg = response.data.msg
      })
    }
  }
}
</script>

