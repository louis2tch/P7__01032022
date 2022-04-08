<template>
<div style='padding-left:-40px;'><img alt="Vue logo" src="@/assets/logo-groupomania.png"></div>
  <nav>  
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Se connecter</router-link> |
    <router-link to="/share-gifs">Partage de gifs</router-link> |
    <router-link to="/share-articles">Partage d'articles</router-link>
  </nav>
  <router-view/>
  <nav>  
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login">Se connecter</router-link> |
    <router-link to="/share-gifs">Partage de gifs</router-link> |
    <router-link to="/share-articles">Partage d'articles</router-link>
  </nav>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 0 10px;

    &.router-link-exact-active {
      color: #c30;
    }
  }
}
</style>
