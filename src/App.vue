<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-grow: 1;
  height: 100vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  width: 100%;
  background: #e7f0eb;
}
</style>
