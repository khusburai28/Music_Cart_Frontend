import { configureStore } from "@reduxjs/toolkit";
//import reducers
import { breadReducer } from "./reducers/breadReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { productReducer } from "./reducers/productReducer.js";
import { userReducer } from "./reducers/userReducer.js";




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
export const server = "https://music-cart-backend-wz2w.vercel.app/api";


