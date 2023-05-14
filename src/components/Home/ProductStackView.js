import React, {useEffect} from 'react'
import styles from "./ProductStackView.module.css"
import {Link} from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, viewCartItem } from "../../redux/actions/cart";
import toast from "react-hot-toast";


const ProductStackView = ({product}) => { 

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.cart);
  const {isAuthenticated} = useSelector((state) => state.user);
  const handleAddtoCart = async () => {
    await dispatch(addToCart(product._id, 1));
    dispatch(viewCartItem());
  };

  const handleClick = (pro) => {
    dispatch({
      type: "PushBread",
      payload: { name: pro.name, path: `/product/${pro._id}` },
    });
  };

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

      <div className={styles.details}>
        <h3 style={{ fontWeight: "600" }}>{product.name}</h3>
        <p>Price - ₹ {product.price}</p>
        <p>
          {product.color} | {product.category}
        </p>

        <p>{product.description}</p>

        <Link to={`/product/${product._id}`}>
          <button onClick={()=>handleClick(product)} className={styles.button}>Details</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductStackView