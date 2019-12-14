<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img id="timg" crossorigin="anonymous" src="/allsky174.jpg" width="400" height="400">
    <!-- <img id="timg" crossorigin="anonymous" src="weather/xmoon/img/xmoon1gaoyazi/allsky174.jpg" width="400" height="400"> -->
  </div>
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
