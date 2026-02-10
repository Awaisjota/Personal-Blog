import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts as fetchPostServices,
  addPost as addPostServices,
  fetchById as fetchByIdServices,
  updatePost as updatePostServices,
  deletePost as deletePostServices,
  likePost as likePostServices,
  addComment as addCommentServices,
} from "../services/postServices";

// Thunks
export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  return await fetchPostServices();
});

export const addPost = createAsyncThunk("posts/addPost", async (data) => {
  return await addPostServices(data);
});

export const fetchById = createAsyncThunk("posts/fetchById", async (id) => {
  return await fetchByIdServices(id);
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    return await updatePostServices(id, data);
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  return await deletePostServices(id);
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  return await likePostServices(id);
});

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ id, text }) => {
    return await addCommentServices({ id, text });
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    singlePost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSinglePost: (state) => {
      (state.singlePost = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload || [];
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.singlePost = action.payload;
      })

      // FETCH BY ID

      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.singlePost = null;
      })

      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePost = action.payload;
      })

      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload._id);
        if (state.singlePost?._id === action.payload._id) {
          state.singlePost = null;
        }
      })

      // LIKE
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        if (state.singlePost?._id === action.payload._id) {
          state.singlePost = action.payload;
        }
      })

      // COMMENT
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        if (state.singlePost?._id === action.payload._id) {
          state.singlePost = action.payload;
        }
      });
  },
});

export default postSlice.reducer;

export const { clearSinglePost } = postSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectSinglePost = (state) => state.posts.singlePost;
export const selectPostLoading = (state) => state.posts.loading;
export const selectPostError = (state) => state.posts.error;
