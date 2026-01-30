<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <about />                       
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import about from '@/components/AboutComponent.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    about,
  }
}
</script>
