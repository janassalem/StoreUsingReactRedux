import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    subTotal: [],
    discount:0,
    deliveryFees:20,
    total:0
}

const calculateTotals = (state) => {
    state.subTotal = state.cartItems((acc,item) => acc +item.price * item.quantity,0);
    state.discount = state.subTotal * 0.20;
    state.total = state.subTotal - state.discount + state.deliveryFees;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Reducer to add a new item or update the quantity of an existing item
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                // If the item already exists, just increase the quantity
                existingItem.quantity += 1;
            } else {
                // Otherwise, add the new item to the cart with a quantity of 1
                state.cartItems.push({ ...newItem, quantity: 1 });
            }
            calculateTotals(state);
        },
        // Reducer to remove an item from the cart
        removeItemFromCart: (state, action) => {
            const idToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
            calculateTotals(state);
        },
        // Reducer to update the quantity of an item
        updateQuantity: (state, action) => {
            const { id, newQuantity } = action.payload;
            if (newQuantity < 1) return; // Prevent quantity from going below 1
            const itemToUpdate = state.cartItems.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
            }
            calculateTotals(state);
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;