<template lang="pug">
  .message
    .icons
      .container
        .selection-marker
        .img
    .content
      .sender
        span {{senderUsername}}
      .text
        p {{text}}
    .time
</template>

<style lang="scss" scoped>
$selection_marker_diameter: 26px;
$selection_marker_side_offset: 23px;
$message_body_width: 560px;

.message {
  display: flex;
  flex-direction: row;
  background-color: chocolate;
  $message_right_offset: calc((100% - #{$message_body_width}) / 2);
  padding-right: $message_right_offset;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0px;
  }

  .icons {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 16px;
    width: fit-content;

    .container {
      height: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: fit-content;

      .selection-marker {
        height: $selection_marker_diameter;
        width: $selection_marker_diameter;
        border-radius: 100%;
        background-color: #ffffff;
        // margin-right: 23px;
        margin-right: $selection_marker_side_offset;
        margin-left: $selection_marker_side_offset;
      }

      .img {
        height: 42px;
        width: 42px;
        border-radius: 100%;
        background: #ffffff;
      }
    }
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .sender {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 4px;
      margin-top: 4px;

      span {
        color: #3a996d;
        font-weight: 700;
        font-size: 12px;
      }
    }

    .text {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      p {
        padding: 0;
        margin: 0;
        font-size: 13px;
        text-align: left;
        word-wrap: break-word;
        line-height: 150%;
        white-space: pre-wrap;
      }
    }
  }
}
</style>

<script>
export default {
  name: "Message",
  props: {
    sender: String,
    text: String
  },
  computed: {
    senderUsername() {
      return this.$store.getters.usersList.filter(user => user.socketId === this.sender)[0].username
    }
  }
}
</script>
