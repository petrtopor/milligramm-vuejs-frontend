<template lang="pug">
  .container
    router-view
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      testData: "Vagiz"
    };
  }
};
</script>
