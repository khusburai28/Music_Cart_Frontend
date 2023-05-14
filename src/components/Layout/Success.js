import React, {useEffect} from 'react'
import styles from "./Success.module.css"
import logo from "../../assets/images/logo.png";
import {Link} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import MobileFooter from './MobileFooter';

const Success = () => {

  const dispatch = useDispatch();
  const {message, error} = useSelector((state) => state.cart);

  useEffect(()=>{
    if(message){
      toast.success(message);
      dispatch({type: "clearMessage"});
    }
    if(error){
      dispatch({type: "clearError"});
    }
  }, [message, error]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <img src={logo} alt="logo" />
          <h1>Musicart</h1>
        </div>
      </div>

      <div className={styles.content}>
        <img src="success.png" alt="success" />
        <h3>Order is placed successfully!</h3>
        <p>You will be receiving a confirmation email with order details</p>

        <Link to="/home">
          <button
            onClick={() => {
              dispatch({ type: "ResetBread" });
            }}
            className={styles.btn}
          >
            Go back to Home page
          </button>
        </Link>
      </div>
      <MobileFooter />
    </div>
  );
}

export default Success