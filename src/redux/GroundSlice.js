import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

const initialValues = [];

export const GroundSlice = createSlice({
  name: 'grounddata',
  initialState: {
    value: initialValues,
  },
  reducers: {
    // addGround:(state,action)=>{
    // //    console.log("inside slice",action.payload)
    //     state.value.push(action.payload)
    // },
    addGround: (state, action) => {
    //   console.error('inside slice', action.payload);
      state.value = action.payload;
    },
    deleteGround:(state,action)=>{
      state.value=[]
    }
  },
});
export const {addGround,deleteGround} = GroundSlice.actions;
export default GroundSlice.reducer;
