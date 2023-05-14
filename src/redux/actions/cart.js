import { server } from "../store";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: "AddToCartRequest" });
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${server}/product/addtocart/${id}`,
      {
        quantity
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        // withCredentials: true,
      }
    );

    dispatch({ type: "AddToCartSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "AddToCartFail", payload: error.response.data.message });
  }
};


export const viewCartItem = () => async (dispatch) => {
  try {
    dispatch({ type: "ViewCartItemRequest" });
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${server}/user/cart`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        // withCredentials: true,
      }
    );

    dispatch({
      type: "ViewCartItemSuccess",
      payload: {
        cartItems: data.cartItems,
        bill: {
          totalPrice: data.totalPrice,
          discount : data.discount,
          fee : data.fee,
          total : data.total
        },
      },
    });
  } catch (error) {
    dispatch({
      type: "ViewCartItemFail",
      payload: error.response.data.message,
    });
  }
};

export const placeOrder = () => async (dispatch) => {

  try {
    dispatch({ type: "PlaceOrderRequest" });
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${server}/user/checkout`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        // withCredentials: true,
      }
    );

    dispatch({ type: "PlaceOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "PlaceOrderFail", payload: error.response.data.message });
  }

}

