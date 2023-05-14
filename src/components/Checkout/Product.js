import React from 'react'
import styles from "./Checkout.module.css";




const Product = ({item}) => {
  return (
    <div className={styles.item}>
      <img src={item.product.images[0]} alt="product image" />
      <p style={{ fontWeight: "600", color: "black", fontSize: "1.2rem" }}>
        {item.product.name}
      </p>
      <p>color : {item.product.color}</p>
      <p>In Stock</p>
      <p style={{ fontWeight: "500", color: "black" }}>
        Estimated delivery : Monday — FREE Standard Delivery
      </p>
    </div>
  );
}

export default Product