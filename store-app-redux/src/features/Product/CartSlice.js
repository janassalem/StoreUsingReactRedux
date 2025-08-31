import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    subtotal: 0,
    discount: 0,
    deliveryFee: 20,
    total: 0
}

const calculateTotals = (state) => {
    // Use reduce to correctly sum the prices
    state.subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    state.discount = state.subtotal * 0.20;
    state.total = state.subtotal - state.discount + state.deliveryFee;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                // If the item already exists, just increase the quantity
                existingItem.quantity += newItem.quantity; // Add the new quantity
            } else {
                // Otherwise, add the new item to the cart
                state.cartItems.push(newItem);
            }
            calculateTotals(state);
        },
        removeItemFromCart: (state, action) => {
            const idToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
            calculateTotals(state);
        },
        updateQuantity: (state, action) => {
            const { id, newQuantity } = action.payload;
            if (newQuantity < 1) return;
            const itemToUpdate = state.cartItems.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
            }
            calculateTotals(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.subtotal = 0;
            state.discount = 0;
            state.deliveryFee = 0;
            state.total = 0;
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;