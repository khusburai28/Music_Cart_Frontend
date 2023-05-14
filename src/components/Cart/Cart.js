import React, {useEffect} from 'react'
import styles from "./Cart.module.css";
import {BsHandbag} from "react-icons/bs";
import CartItem from './CartItem';
import {Link} from "react-router-dom";
import {viewCartItem} from "../../redux/actions/cart.js";
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import MobileFooter from '../Layout/MobileFooter';
import MobileHeader from '../Layout/MobileHeader';

const Cart = () => {

  const dispatch = useDispatch();
  const {cartItems, loading, bill} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(viewCartItem());
  }, []);


  const handleOrderPath = () => {
    dispatch({ type: "PushBread", payload: { name: "Checkout", path: "/checkout" } });
  }

  return (
    <div className={styles.container}>
      <MobileHeader />
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

      <div onClick={()=>{
        window.history.back();
      }} className={styles.backArrow}>
        <BiArrowBack style={{ fontSize: "1.3rem", fontWeight: "700" }} />
      </div>

      <div className={styles.cart}>
        <BsHandbag className={styles.icon} />
        <h2>My Cart</h2>
      </div>
      <div className={styles.bill}>
        <div className={styles.itemsList}>
          {cartItems?.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
        <div className={styles.priceDetails}>
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              PRICE DETAILS
            </h3>
            <div className={styles.row}>
              <p>Total MRP</p>
              <p>₹ {bill?.totalPrice}</p>
            </div>
            <div className={styles.row}>
              <p>Discount on MRP</p>
              <p>₹ {bill?.discount}</p>
            </div>
            <div className={styles.row}>
              <p>Convenience Fee</p>
              <p>₹ {bill?.fee}</p>
            </div>
          </div>

          <div>
            <div className={styles.row}>
              <h3>Total Amount</h3>
              <p>₹ {bill?.total}</p>
            </div>
            <Link to="/checkout">
              <button
                disabled={cartItems?.length === 0}
                onClick={handleOrderPath}
                className={[styles.btn]}
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}

export default Cart


