<template>
  <section class="login">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <h5 class="card-header">Register an account</h5>
          <div class="card-body">
            <div class="form-group">
              <input v-model="name" type="text" class="form-control" placeholder="Full name">
            </div>
            <div class="form-group">
              <input v-model="email" type="text" class="form-control" placeholder="Email address">
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <button @click="register" type="submit" class="btn btn-primary">Register</button>
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
      name: '',
      email: '',
      password: '',
      errorMsg: '',
      baseUrl: 'http://localhost:3000'
    }
  },
  methods: {
    register () {
      let self = this
      axios({
        method: 'post',
        url: `${self.baseUrl}/signup`,
        data: {
          name: self.name,
          email: self.email,
          password: self.password
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.$router.push('/user/login')
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data.error.errors) {
          self.errorMsg = response.data.error.errors.name.message
        } else if (response.data.error.code == 11000) {
          self.errorMsg = 'Email already exists'
        } else {
          self.errorMsg = response.data.msg
        }
      })
    }
  }
}
</script>

