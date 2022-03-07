import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import doctorApi from '../../api/doctorApi';

// import { toastError } from "../../components/Notification";

export const getDoctorDetail = createAsyncThunk('doctors/detail', async (payload) => {
  //call Api login
  const response = await doctorApi.getById({ id: payload });

  return response.data;
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [getDoctorDetail.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getDoctorDetail.rejected]: (_, action) => {},
  },
});

const { actions, reducer } = doctorSlice;
export default reducer;
