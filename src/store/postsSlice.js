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
      state.posts.documents = state.posts.documents.map((post) => {
        if (post.$id == action.payload.dbPost.$id) return action.payload.dbPost;
        else return post;
      });
    },
  },
});

export const { addPosts, addPost, deletePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
