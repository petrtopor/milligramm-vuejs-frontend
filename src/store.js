import * as io from "socket.io-client";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backendHost: "http://localhost",
    socket: null,
    username: null,
    usersList: null,
    dialogsList: [],
    currentDialogId: null,
    messagesList: []
  },
  mutations: {
    setCurrentDialogId(state, payload) {
      state.currentDialogId = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setSocket(state, payload) {
      console.log("setSocket() mutation commited")
      state.socket = payload
    },
    setUsersList(state, payload) {
      console.log("setUsersList() mutation commited")
      state.usersList = payload
    },
    setDialogsList(state, payload) {
      console.log("setDialogsList() mutation commited")
      state.dialogsList = payload
    },
    setMessagesList(state, payload) {
      console.log("setMessagesList() mutation commited")
      state.messagesList = payload
    },
    addMessage(state, payload) {
      console.log("addMessage() mutation commited")
      state.messagesList = [...state.messagesList, payload]
    }
  },
  actions: {
    logIn(context) {
      return new Promise((resolve, reject) => {
        const socket = io(context.state.backendHost)
        socket.on("newMessage", payload => {
          console.log("the newMessage received: ", payload)
          if(_.includes(context.getters.dialogsList.map(dialog => dialog.dialogId), payload.dialogId)) {
            //  the dialog already exists
            console.log("the dialog already exists")
            console.log("dialogsList:\n", context.getters.dialogsList)
          } else {
            // this is a new dialog
            console.log("this is a new dialog")
          }
          context.commit("addMessage", payload)
        })
        socket.on("userslist", payload => {
          console.log("the userslist received: ", payload);
          context.commit("setUsersList", payload)
        })
        socket.on("dialogsList", payload => {
          console.log("the dialogsList received: ", payload);
          context.commit("setDialogsList", payload)
        })
        context.commit("setSocket", socket)
        context.getters.socket.emit("setUsername", context.getters.username, () => {
          context.getters.socket.emit("getUsersList")
          resolve()
        })
      })
    },
    setCurrentDialogId(context, payload) {
      context.commit("setCurrentDialogId", payload)
    },
    setUsername(context, payload) {
      context.commit("setUsername", payload)
    },
    createSocket(context) {
      console.log("createSocket() action dispatched")
      const socket = io(context.state.backendHost)
      socket.on("userslist", payload => {
        console.log("the userslist received: ", payload);
        // this.$store.dispatch("setUsersList", payload);
        context.commit("setUsersList", payload)
      })
      socket.on("dialogsList", payload => {
        console.log("the dialogsList received: ", payload);
        context.commit("setDialogsList", payload)
      })
      context.commit("setSocket", socket)
    },
    getUsersList(context) {
      console.log("getUsersList() action dispatched")
      context.state.socket.emit("getUsersList")
    },
    setupDialog(context, username) {
      console.log("setupDialog() action dispatched /w username: ", username)
      context.state.socket.emit("setupDialog", context.getters.usersList.filter(user => user.username === username)[0].socketId)
    },
    getDialogsList(context) {
      console.log("getDialogsList() action dispatched")
      context.state.socket.emit("getDialogsList")
    },
    getMessagesList(context) {
      console.log("getDialogsList() action dispatched")
    }
  },
  getters: {
    messagesOfDialog: state => dialogId => state.messagesList.filter(message => message.dialogId === dialogId),
    dialogsList: state => state.dialogsList,
    usersList: state => state.usersList,
    username: state => state.username,
    socket: state => state.socket
  }
});
