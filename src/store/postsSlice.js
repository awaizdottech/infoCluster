import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "allposts",
  initialState: { posts: null },
  reducers: {
    addPosts: (state, action) => {
      console.log(action.payload.posts);
      state.posts = action.payload.posts;
    },
  },
});

export const { addPosts } = postsSlice.actions;
export default postsSlice.reducer;
