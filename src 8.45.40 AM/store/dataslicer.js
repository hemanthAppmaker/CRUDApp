import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "fetchData/Post",
  async (_, { getState }) => {
    const { data } = getState();
    console.log(data, "fetchData---->>>");
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    //add data
    addData: (state, action) => {
      state.push(action.payload);
      console.log(state, "test id---->>>", action.payload);
    },
    //update data
    updateData: (state, action) => {
      const { id, title, body } = action.payload;
      const existedData = state.find((item) => item.id == id);
      if (existedData) {
        existedData.title = title;
        existedData.body = body;
      }
    },
    //delete data
    deleteData: (state, action) => {
      const idToDelete = action.payload;
      const indexToDelete = state.findIndex((item) => item.id === idToDelete);
      // Create a new array without the item at the specified index
      return [
        ...state.slice(0, indexToDelete),
        ...state.slice(indexToDelete + 1),
      ];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(state, action, "rejected");
      });
  },
});
export const { addData, updateData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
