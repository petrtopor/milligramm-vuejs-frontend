<template lang="pug">
  .dialog-container(@click="onDialogSelect" :class="{ selected: selected }")
    .content
      .icon
      .message
        .caption
          span {{caption}}
        .last-message
          span {{lastMessage}}
      .time
        span {{time}}
</template>

<style lang="scss" scoped>
.dialog-container {
  max-height: 62px;
  height: 62px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  background: #ffffff;
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0px;
  }
  &:hover {
    background: #f2faf6;
  }
  &.selected {
    background: #64b190;
  }

  .content {
    height: 48px;
    width: 90%;
    display: flex;
    flex-direction: row;

    .icon {
      height: 48px;
      width: 48px;
      flex-shrink: 0;
      border-radius: 100%;
      margin-right: 8px;
      background: #0b9e6d;
    }

    .message {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .caption {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        span {
          color: #222222;
          font-weight: 700;
          font-size: 13px;
        }
      }
      .last-message {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 8px;

        span {
          color: #222222;
          font-weight: 400;
          font-size: 13px;
        }
      }
    }

    .time {
      height: 100%;
      width: 15%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      span {
        color: #222222;
        font-weight: 400;
        font-size: 13px;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      testData: false
    }
  },
  props: {
    dialog: Object,
    selected: Boolean
  },
  computed: {
    caption() {
      return this.dialog.usersList.map(userId => this.$store.getters.usersList.filter(user => user.socketId === userId)[0].username).reduce((acc, curr) => acc + ' - ' + curr)
    },
    lastMessage() {
      const latestMessage = this.$store.getters.messagesOfDialog(this.dialog.dialogId).filter(message => message.timestamp === Math.max(...this.$store.getters.messagesOfDialog(this.dialog.dialogId).map(message => message.timestamp)))[0].text
      // console.log("The latest message date:\n", Math.max(...this.$store.getters.messagesOfDialog(this.dialog.dialogId).map(message => message.timestamp)))
      // console.log("The latest message:\n", latestMessage)
      return latestMessage.length > 22 ? latestMessage.substring(0, 16) + "..." : latestMessage
    },
    time() {
      // console.log("Dialog::time()::this.dialog:\n", this.$store.getters.messagesOfDialog(this.dialog.dialogId).map(message => message.timestamp))
      const latestMessageDate = new Date(Math.max(...this.$store.getters.messagesOfDialog(this.dialog.dialogId).map(message => message.timestamp)))
      // console.log("latestMessageDate.getMinutes().toString().length === 1: ", latestMessageDate.getMinutes().toString().length === 1 ? "0" + latestMessageDate.getMinutes() : latestMessageDate.getMinutes())
      return latestMessageDate.getHours() + ":" + (latestMessageDate.getMinutes().toString().length === 1 ? "0" + latestMessageDate.getMinutes() : latestMessageDate.getMinutes()) + ":" + latestMessageDate.getSeconds()
    }
  },
  methods: {
    onDialogSelect() {
      // this.$store.dispatch("setCurrentDialogId", dialog.id)
      console.log("Dialog::onDialogSelect(" + this.dialog.dialogId + ")")
      this.$emit("select", this.dialog.dialogId)
    }
  }
}
</script>
