import { configureStore } from "@reduxjs/toolkit";
//import reducers
import {userReducer} from "./reducers/userReducer.js"
import {productReducer} from "./reducers/productReducer.js"
import {cartReducer} from "./reducers/cartReducer.js"
import { breadReducer } from "./reducers/breadReducer.js";




const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    bread: breadReducer
  },
});

export default store;

// export const server = "http://localhost:4000/api";
export const server = "https://music-cart-backend.vercel.app/api";


