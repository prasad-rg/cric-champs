import {createSlice} from '@reduxjs/toolkit';

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
  },
});
export const {addGround} = GroundSlice.actions;
export default GroundSlice.reducer;
