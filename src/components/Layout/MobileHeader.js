import React, {useState, useEffect} from 'react'
import styles from "./MobileHeader.module.css"

import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/actions/product';
import Loader from "./Loader";
import { Link } from 'react-router-dom';

const MobileHeader = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const { searchItems, searchloading } = useSelector(
      (state) => state.product
    );

    useEffect(()=>{
        dispatch(searchProduct(keyword));
    }, [keyword]);


  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <BsSearch />
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className={styles.searchList}>
        {keyword &&
          searchItems?.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`}>
              <div className={styles.searchItem}>
                <img src={product.images[0]} alt="product image" />
                <p style={{ fontSize: "0.5rem" }}>{product.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MobileHeader


const data = [
  {
    id: "jaiheauyaoekf293928279",
    description:
      "Sony WH-CH720N, Wireless Over-Ear Active Noise Cancellation Headphones with Mic, up to 50 Hours Playtime, Multi-Point Connection, App Support, AUX & Voice Assistant Support for Mobile Phones (Black)",
    name: "Sony WH-CH720N",
    price: "3500",
    category: "Over-ear headphone",
    color: "Black",
    available: false,
    brand: "sony",
    images: ["sony1.png", "sony2.png", "sony3.png", "sony4.png"],
  },
];