import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name:'products',
    initialState:{
        loading:false
    },
    reducers:{
        productsRequest(state,action){
            return {
                loading:true
            }
        },
        productsSuccess(state,action){
            return {
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.count,
                resPerPage:action.payload.resPerPage
            }
        },
        productsFail(state,action){
            return {
                loading:false,
                error: action.payload
            }
        },
        //admin products
        adminProductsRequest(state,action){
            return {
                loading:true
            }
        },
        adminProductsSuccess(state,action){
            return {
                loading:false,
                products:action.payload.products,
                // productsCount:action.payload.count
            }
        },
        adminProductsFail(state,action){
            return {
                loading:false,
                error: action.payload
            }
        },
        clearError(state,action){
            return {
                ...state,
                error: null
            }
        },
    }
});

const {actions,reducer} = productsSlice;
export const {
    productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    clearError,
} = actions;
export default reducer;