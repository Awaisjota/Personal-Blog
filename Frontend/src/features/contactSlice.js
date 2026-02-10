import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  postContact as postContactServices,
  getContact as getContactServices,
} from "../services/contactServices";

export const postContact = createAsyncThunk(
  "contact/postContact",
  async (data) => {
    return await postContactServices(data);
  }
);

export const getContact = createAsyncThunk("contact/getContact", async () => {
  return await getContactServices();
});

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    list: [],
    loading: false,
    error: false,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(postContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // ya replace karna ho to = action.payload
        state.error = false;
      })
      .addCase(postContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getContact.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = false;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default contactSlice.reducer;

export const selectContact = (state) => state.contact.list;
export const selectContactError = (state) => state.contact.error;
export const selectContactLoading = (state) => state.contact.loading;
