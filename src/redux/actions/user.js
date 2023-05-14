import { server } from "../store";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        // withCredentials: true,
      }
    );

    localStorage.setItem("token", data.token);

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `${server}/user/profile`,

      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      }
    );
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};


export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${server}/user/register`, formdata, {
      headers: {
        "Content-type": "application/json",
      },

      // withCredentials: true,
    });

    localStorage.setItem("token", data.token);

    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "registerFail", payload: error.response.data.message });
  }
};


export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    const { data } = await axios.post(`${server}/user/logout`, {
      // withCredentials: true,
    });
    localStorage.removeItem("token");
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};
