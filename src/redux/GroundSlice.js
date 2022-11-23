import { createSlice } from "@reduxjs/toolkit";

const initialValues=[];

export const GroundSlice=createSlice({
    name:"grounddata",
    initialState:{
        value:initialValues,
    },
    reducers:{
        addGround:(state,action)=>{
           
            state.value.push(action.payload)
        }
    }
})
export const {addGround}=GroundSlice.actions;
export default GroundSlice.reducer