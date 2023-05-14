import { server } from "../store";
import axios from "axios";

export const getAllProduct = (keyword, category, price_range, color, brand, sort) => async (dispatch) => {

  try {
    dispatch({ type: "getAllProductRequest" });

    const { data } = await axios.get(
      `${server}/product/allproducts?keyword=${keyword}&category=${category}&minprice=${price_range[0]}&maxprice=${price_range[1]}&color=${color}&brand=${brand}&sort=${sort}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        // withCredentials: true,
      }
    );

    dispatch({ type: "getAllProductSuccess", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "getAllProductFail",
      payload: error.response.data.message,
    });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
   try {
     dispatch({ type: "productRequest" });

     const { data } = await axios.get(
       `${server}/product/${id}`,
       {
         headers: {
           "Content-type": "application/json",
         },
        //  withCredentials: true,
       }
     );

     dispatch({ type: "productSuccess", payload: data.product });
   } catch (error) {
     dispatch({
       type: "productFail",
       payload: error.response.data.message,
     });
   }


}

export const searchProduct =
  (keyword) => async (dispatch) => {
    try {
      dispatch({ type: "SearchRequest" });

      const { data } = await axios.get(
        `${server}/product/allproducts?keyword=${keyword}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          // withCredentials: true,
        }
      );

      dispatch({ type: "SearchSuccess", payload: data.products });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "SearchFail",
        payload: error.response.data.message,
      });
    }
  };
