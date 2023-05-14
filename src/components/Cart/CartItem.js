import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Cart.module.css"
import {addToCart} from "../../redux/actions/cart.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadUser } from "../../redux/actions/user";
import { viewCartItem } from "../../redux/actions/cart.js";

const CartItem = ({item}) => {
    const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch();
  const {loading, message, error} = useSelector((state) => state.cart);

   const handleDecrease = async () =>{
      if(quantity > 1){
        setQuantity(quantity - 1)
      }
      await dispatch(addToCart(item.product._id, -1));
      dispatch(viewCartItem());
   }

    const handleIncrease = async () =>{
      setQuantity(quantity + 1)
      await dispatch(addToCart(item.product._id, 1));
      dispatch(viewCartItem());
    }

    useEffect(()=>{
     if (message) {
       toast.success(message);
       dispatch({ type: "clearMessage" });
     }
     if (error) {
       toast.error(error);
       dispatch({ type: "clearError" });
     }
    }, [dispatch, error, message]);


  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={item.product.images[0]} alt="image" />
      </div>

      <div className={styles.itemDetails}>
        <div className={styles.column}>
          <h3>{item.product.name}</h3>
          <p>color {item.product.color}</p>
          <p>In Stock</p>
        </div>

        <div className={styles.column}>
          <h3>Price</h3>

          <p style={{ color: "black" }}>₹ {item.product.price}</p>
        </div>

        <div className={styles.column}>
          <h3>Quantity</h3>

          <div className={styles.quantity}>
            <button onClick={handleDecrease}>-</button>
            <p>{quantity}</p>
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem