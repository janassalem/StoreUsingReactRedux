import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import  axios from 'axios'

const initialState = {
    value: 0,
    products:[],
    isLoading: false,
}


export  const GetAllProducts = createAsyncThunk(
    'get/products',
    async () => {
try {

    const response = await axios.get("https://fakestoreapi.com/products")

    console.log(response)

    return response.data ;


}catch(e){
    console.log(e.message)
}

    },
)



export const productListSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        increment: (state ) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(GetAllProducts.fulfilled ,(state ,action)=>{
            console.log("action fulfilled")
            state.products = action.payload ;
            state.isLoading = false;
            console.log(action)
        })
        .addCase(GetAllProducts.rejected ,()=>{
            console.log("action rejected")
        })
            .addCase(GetAllProducts.pending ,(state )=>{

                state.isLoading =true;

            })
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = productListSlice.actions

export default productListSlice.reducer