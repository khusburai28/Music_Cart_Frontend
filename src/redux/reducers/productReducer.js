import { createReducer } from "@reduxjs/toolkit";


export const productReducer = createReducer(
    {}, 
{

    getAllProductRequest : (state, action) => {
        state.loading = true;
    },
    getAllProductSuccess : (state, action) => {
        state.loading=false; 
        state.products = action.payload.products;
    },
    getAllProductFail : (state, action) => {
        state.loading=false;
        state.error = action.payload;
    },

    productRequest : (state, action) => {
        state.loading = true;
    },
    productSuccess : (state, action) => {
        state.loading=false; 
        state.productDetail = action.payload;
    },
    productFail : (state, action) => {
        state.loading=false;
        state.error = action.payload;
    },

    SearchRequest : (state, action) => {
        state.searchloading = true;
    },
    SearchSuccess : (state, action) => {
        state.searchloading=false; 
        state.searchItems = action.payload;
    },
    SearchFail : (state, action) => {
        state.searchloading=false;
    }

})