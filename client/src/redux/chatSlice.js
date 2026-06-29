import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedChat: null,
  messages: [],
  typing: false,
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    updateSeen: (state, action) => {
      const msg = state.messages.find((m) => m._id === action.payload);

      if (msg) {
        msg.seen = true;
      }
    },

    setTyping: (state, action) => {
      state.typing = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setChats,
  setSelectedChat,
  setMessages,
  addMessage,
  updateSeen,
  setTyping,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
