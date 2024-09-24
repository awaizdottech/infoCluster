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
    deletePost: (state, action) => {
      state.posts.documents = state.posts.documents.filter((post) => {
        return post.$id != action.payload;
      });
    },
    updatePost: (state, action) => {
      // state.posts.documents =
    },
  },
});

export const { addPosts, addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
