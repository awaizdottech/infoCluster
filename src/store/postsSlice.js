import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "allposts",
  initialState: { posts: null },
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    addPost: (state, action) => {
      state.posts.documents = [...state.posts.documents, action.payload.dbPost];
    },
  },
});

export const { addPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;
