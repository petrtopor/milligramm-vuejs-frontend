<template lang="pug">
  .container
    .centered
      .im-head
        .logo
          .btn
            .icon
              .bar
              .bar
              .bar
            .caption
              span Milligramm  === {{username}}
        .main
          .title
            .dialog_info
              span.dialog_name Telegram
              span.dialog_status service notifications
          .search-button
            .icon
          .dropdown-button
            .icon
              .dot
              .dot
              .dot
      .im-content
        .dialogs
          .search-panel
            .search
              .icon
              //- input
              model-select(:options="options" v-model="item" placeholder="select item")
          .dialogs-list
            Dialog(v-for="dialog in dialogs"
            :dialog="dialog"
            :selected="dialog.dialogId===currentDialogId"
            @select="onDialogSelect")
        .history
          .messages-list
            Message(v-for="message of messages" :text="message.text" :sender="message.author")
          .panel
            .content
              .userpic
                .img
              .send-form
                .textarea
                  textarea(v-model="draftMessage")
                .buttons
                  .send-button(@click="sendMessage")
                    span SEND
              .userpic
                .img
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin-bottom: 24px;

  .centered {
    width: 1010px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .im-head {
      height: 48px;
      width: 100%;
      background: #56a382;
      display: flex;
      flex-direction: row;

      .logo {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 30%;
        box-sizing: border-box;

        .btn {
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          justify-content: flex-start;
          align-items: center;
          height: 14px;
          width: 90%;
          box-sizing: border-box;

          .icon {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 18px;
            height: 100%;
            margin-right: 40px;

            .bar {
              width: 100%;
              height: 2px;
              background-color: #ffffff;
            }

            &:hover {
              height: 120%;
              cursor: pointer;

              .bar {
                height: 3px;
              }
            }
          }

          .caption {
            box-sizing: border-box;
            width: fit-content;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            span {
              color: #ffffff;
              font-size: 20px;
            }
          }
        }
      }

      .main {
        display: flex;
        flex-direction: row;
        width: 70%;

        .title {
          flex-grow: 1;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;

          .dialog_info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height: 18px;
            width: 90%;

            span.dialog_name {
              color: #fff;
              margin-right: 8px;
              font-size: 13px;
              font-weight: 700;
            }
            span.dialog_status {
              color: #fff;
              margin-right: 3px;
              font-size: 13px;
              font-weight: 400;
              color: #b9e3cf;
            }
          }
        }

        .search-button {
          width: 55px;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;

          .icon {
            height: 17px;
            width: 17px;
            background-image: url("../../assets/IconsetW.png");
            background-repeat: no-repeat;
            background-position: -12px -1037px;
          }
        }

        .dropdown-button {
          width: 48px;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;

          .icon {
            height: 17px;
            width: 17px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .dot {
              height: 4px;
              width: 4px;
              border-radius: 100%;
              background-color: #ffffff;
            }
          }
        }
      }
    }

    .im-content {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      background-color: chartreuse;

      .dialogs {
        width: 30%;
        min-width: 30%;
        border-right: 2px solid #e9edeb;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .search-panel {
          height: 58px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;

          .search {
            height: 34px;
            width: 90%;
            background: #f2f2f2;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 8px;
            // padding-right: 32px;
            box-sizing: border-box;
            border-radius: 4px;

            .icon {
              height: 17px;
              width: 17px;
              background-image: url("../../assets/IconsetW.png");
              background-repeat: no-repeat;
              background-position: -14px -212px;
              margin-right: 8px;
            }

            .ui.fluid.search.selection.dropdown {
              width: 100%;
              min-height: 100%;
              height: 100%;
              padding: 0;
              border: 0;
            }

            // input {
            //   outline: 0;
            //   box-shadow: none;
            //   border: none;
            //   background: #f2f2f2;
            //   width: 100%;
            // }

            &.active {
              background: #ffffff;
              input {
                background: #ffffff;
              }
            }
          }
        }

        .dialogs-list {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 1;
          overflow: hidden;
        }
      }

      .history {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        .messages-list {
          // height: 100%;
          flex-grow: 1;
          // width: 560px;
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: burlywood;
        }

        .panel {
          height: 128px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;

          .content {
            width: 524px;
            margin-top: 10px;
            margin-bottom: 21px;
            box-sizing: border-box;
            background-color: #ffffff;
            display: flex;
            flex-direction: row;

            .userpic {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              height: 100%;
              width: fit-content;

              .img {
                height: 52px;
                width: 52px;
                border-radius: 100%;
                background-color: blue;
              }
            }

            .send-form {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              padding: 0px 16px;

              .textarea {
                width: 100%;
                height: 64px;
                display: flex;
                flex-direction: row;

                textarea {
                  resize: none;
                  height: 100%;
                  // width: 100%;
                  flex-grow: 1;
                  // margin: 0px 16px;
                  padding: 0;
                  box-sizing: border-box;
                }
              }
              .buttons {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                // height: fit-content;
                flex-grow: 1;
                width: 100%;

                .send-button {
                  width: fit-content;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  cursor: pointer;

                  span {
                    color: #35c589;
                    font-size: 13px;
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script>
// import * as io from "socket.io-client";
import _ from 'lodash'
import { ModelSelect } from 'vue-search-select'

import Message from "../../components/Message";
import Dialog from "../../components/Dialog"

export default {
  name: "Messenger",
  components: {
    Message,
    Dialog,
    ModelSelect
  },
  data() {
    return {
      draftMessage: "",
      item: {
        value: ''
      },
      currentDialogId: null
    }
  },
  computed: {
    messages() {
      return this.$store.getters.messagesOfDialog(this.currentDialogId)
    },
    username() {
      return this.$store.state.username || ''
    },
    dialogs() {
      return this.$store.getters.dialogsList || []
    },
    options() {
      if(this.$store.state.usersList !== null) {
        return this.$store.state.usersList.map(user => {
          return { value: user.username, text: user.username }
        })
      } else {
        return [ { value: "", text: "" } ]
      }
    }
  },
  methods: {
    onDialogSelect(selectedDialogId) {
      console.log("Messenger::onDialogSelect( " + selectedDialogId + " )")
      this.currentDialogId = selectedDialogId
    },
    sendMessage() {
      console.log("Messenger::sendMessage() ...")
      this.$store.state.socket.emit("sendMessage", {
        message: this.draftMessage,
        to: this.currentDialogId
      })
      this.draftMessage = ''
    }
  },
  watch: {
    item(val) {
      if(val !== "") {
        console.log("Value picked: ", val.text)
        // this.$store.state.socket.emit("addContactToDialog", val.text)
        // this.$store.state.socket.emit("setupDialog", val.text)
        this.$store.dispatch("setupDialog", val.text)
        console.log("Socket IDs of all the users:\t", this.$store.getters.usersList.map(user => user.socketId))
      }
    }
  }
};
</script>
