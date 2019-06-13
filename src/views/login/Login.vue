<template lang="pug">
  .container
    .login_head_bg
    .login_page
      .head
        .logo
          .content
            .icon
            span Milligramm
        .submit
          .content(@click="onSubmitClick")
            span Next
            .icon-next-submit
      .form
        .content
          h3 Sign in
          p Please choose your country and enter your full phone number.
          //- .country-input-group
          .phone-input-group
            input(placeholder="Username" v-model="username")
      .footer
        span Welcome to the non-official test task 4 Lifehacker;)
        span by Vadim Kushnir aka Vagiz Magdeev
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  .login_head_bg {
    width: 100%;
    height: 226px;
    background: #56a382;
  }

  .login_page {
    margin: -131px auto 90px;
    max-width: 404px;

    width: 404px;
    height: 480px;
    // background: chartreuse;

    display: flex;
    flex-direction: column;

    .head {
      height: 75px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      

      .logo {
        height: 100%;
        width: 140px;
        // background: crimson;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: fit-content;

          .icon {
            width: 30px;
            height: 30px;
            background: url("../../assets/General.png");
            background-repeat: no-repeat;
            background-position: -5px -10px;
            margin-right: 18px;
          }

          span {
            font-size: 13px;
            font-weight: 400;
            color: #fff;
          }
        }
      }

      .submit {
        height: 100%;
        width: 80px;
        // background: crimson;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: fit-content;
          cursor: pointer;

          span {
            font-size: 13px;
            font-weight: 700;
            color: #fff;
          }

          .icon-next-submit {
            width: 7px;
            height: 12px;
            margin-left: 12px;
            background: url("../../assets/General.png");
            background-repeat: no-repeat;
            background-position: -18px -50px;
          }
        }
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      flex-grow: 1;
      background: #ffffff;

      .content {
        width: 274px;
        height: 250px;
        // background: #ffffff;

        h3 {
          text-align: left;
        }
        p {
          text-align: left;
        }
      }
    }

    .footer {
      width: 100%;
      height: 42px;
      margin-top: 25px;
      background: #e7f0eb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span:nth-child(2) {
        font-weight: 700;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ""
    }
  },
  methods: {
    onSubmitClick() {
      this.$store.dispatch("logIn", this.username).then(() => {
        this.$router.push({ path: 'im' })
      })
      // this.$store.dispatch("createSocket")
      // this.$store.state.socket.emit("setUsername", this.username)
      // this.$store.dispatch("getUsersList")
      // this.$router.push({ path: 'im' })
    }
  },
  watch: {
    username(payload) {
      this.$store.dispatch("setUsername", payload)
    }
  }
}
</script>
