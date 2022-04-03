<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo-groupomania.png">-->
    <HelloWorld :msg="msg" :voila="voila" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data (){
    return {
      voila : [
        {id:1, name: 'nous'},
        {id:2, name: 'vous'}
      ],
      msg : "Réseau social interne"
    }

  }
}
</script>
