import React, {useEffect} from 'react'
import styles from "./Checkout.module.css"; 
import Product from './Product';
import {Link, useNavigate} from "react-router-dom";
import { viewCartItem, placeOrder } from "../../redux/actions/cart.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BiArrowBack } from 'react-icons/bi';
import logo from "../../assets/images/logo.png";
import MobileFooter from '../Layout/MobileFooter';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {bill, cartItems, loading, message, error} = useSelector((state) => state.cart);

  useEffect(()=>{
    dispatch(viewCartItem());
  }, [])

  const handlePlaceOrder = () => {
    dispatch(placeOrder());

    if(cartItems.length == 0){
      dispatch({ type: "ResetBread" });
      navigate("/success");
    }
  }
  
  return (
    <div className={styles.container}>
      {/*Mobile Header*/}
      <div className={styles.header}>
        <div className={styles.heading}>
          <img src={logo} alt="logo" />
          <h1>Musicart</h1>
        </div>
      </div>

      <Link to="/home">
        <button
          onClick={() => {
            dispatch({ type: "ResetBread" });
          }}
          className={styles.back_button}
        >
          Back to Products
        </button>
      </Link>

      <div
        onClick={() => {
          window.history.back();
        }}
        className={styles.backArrow}
      >
        <BiArrowBack style={{ fontSize: "1.3rem", fontWeight: "700" }} />
      </div>

      <h3 className={styles.heading}> Checkout</h3>

      <div className={styles.bill}>
        <div className={styles.itemDetails}>
          <h3>1. Delivery address</h3>
          <p>Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025</p>
          <div className={styles.line}></div>
          <h3>1. payment method</h3>
          <p>Pay on delivery ( Cash/Card</p>
          <div className={styles.line}></div>
          <h3>1. Review items and delivery</h3>
          <div className={styles.listProduct}>
            {cartItems?.map((item, index) => (
              <Product key={index} item={item} />
            ))}
          </div>
          <div className={styles.line}></div>
          <div className={styles.summary}>
            <Link to="/success">
              <button
                onClick={handlePlaceOrder}
                className={styles.btn}
                disabled={loading}
              >
                Place your order
              </button>
            </Link>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#B52B00",
                }}
              >
                Order Total : ₹ {bill?.total}.00
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "500",
                }}
              >
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.billDetails}>
          <Link to="/success">
            <button
              onClick={handlePlaceOrder}
              style={{ width: "100%" }}
              className={styles.btn}
              disabled={loading}
            >
              Place your order
            </button>
          </Link>
          <p
            style={{
              fontSize: "0.8rem",
              textAlign: "center",
              margin: "10px 0px",
            }}
          >
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
          <div className={styles.line}></div>
          <h3
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              margin: "20px 0px",
            }}
          >
            Order Summary
          </h3>
          <div className={styles.row}>
            <p>Items:</p>
            <p>₹ {bill?.totalPrice}.00</p>
          </div>
          <div className={styles.row}>
            <p>Delivery:</p>
            <p>₹ {bill?.fee}.00</p>
          </div>
          <div style={{ margin: "20px 0px" }} className={styles.line}></div>
          <div
            style={{ fontSize: "1rem", color: "#B52B00", fontWeight: "600" }}
            className={styles.row}
          >
            <p>Order Total:</p>
            <p>₹ {bill?.total}</p>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default Checkout

