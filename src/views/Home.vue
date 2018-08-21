<template>
  <section class="blog">
  <!-- blog list -->
    <div class="row">
      <div class="col-sm-4">
        <div class="list-group">
          <router-link to="/123" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Blog title</h5>
              <small>28/01/2018</small>
            </div>
            <p class="mb-1">Summary.</p>
            <small>Author: Lorem ipsum</small>
          </router-link>
          <router-link to="/234" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
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
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
