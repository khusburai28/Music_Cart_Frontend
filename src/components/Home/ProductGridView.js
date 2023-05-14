import React, {useEffect} from 'react'
import styles from "./ProductGridView.module.css"

import {BsCartPlus} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, viewCartItem } from "../../redux/actions/cart";
import toast from "react-hot-toast";


const ProductGridView = ({product}) => {
    const dispatch = useDispatch();
    const {message, error, loading} = useSelector((state) => state.cart);
    const {isAuthenticated} = useSelector((state) => state.user);

    const handleAddtoCart = async () =>{
      await dispatch(addToCart(product._id, 1));
      dispatch(viewCartItem());
    }

useEffect(() => {
  if (message) {
    toast.success(message);
    dispatch({ type: "clearMessage" });
  }
  if (error) {
    toast.error(error);
    dispatch({ type: "clearError" });
  }
}, [message, error]);


  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={product.images[0]} alt="image" />
        {isAuthenticated && (
          <div className={styles.icons} onClick={handleAddtoCart}>
            <BsCartPlus />
        </div>
        )}
        
      </div>
      <p style={{fontWeight: '600'}}>{product.name}</p>
      <p>Price - ₹ {product.price}</p>
      <p>{product.color} | {} headphone</p>
    </div>
  );
}

export default ProductGridView