import React, {useEffect} from 'react'
import styles from "./ProductPage.module.css"

import Slider from "react-slick";
import Loader from "../Layout/Loader.js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/product";
import { addToCart, viewCartItem } from '../../redux/actions/cart';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import {Link} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"
// import { loadUser } from '../../redux/actions/user';
import MobileHeader from '../Layout/MobileHeader';
import MobileFooter from '../Layout/MobileFooter';

 const settings = {
   dots: true,
   fade: true,
   arrows: false,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
 };


const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname}= useLocation();
  const { productDetail, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.user);
  const {message, error, loading:load} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [pathname]);

  const handleLogin = () =>{
    navigate("/login");
    dispatch({ type: "ResetBread" });
  }

  const handleAddToCart = async () =>{
    await dispatch(addToCart(productDetail._id, 1));
    dispatch(viewCartItem());
  }

  const handleBuyNow = async () => {
    await dispatch(addToCart(productDetail._id, 1));
    dispatch(viewCartItem());
    dispatch({ type: "PushBread", payload: { name: "Cart", path: "/cart" } })
    navigate("/cart");
  }

  useEffect(() => {
    if(message){
      toast.success(message);
      dispatch({type: "clearMessage"});
    }
    if(error){
      toast.error(error);
      dispatch({type: "clearError"});
    }
  }, [message, dispatch, error])


  if(loading)return(
    <Loader />
  )
  return (
    <div className={styles.container}>
      <MobileHeader />
      <Link to="/home">
        <button className={styles.back_button}>Back to Products</button>
      </Link>

      <div
        onClick={() => {
          window.history.back();
        }}
        className={styles.backArrow}
      >
        <BiArrowBack style={{ fontSize: "1.3rem", fontWeight: "700" }} />
      </div>

      <button
        onClick={handleBuyNow}
        style={{ marginTop: "1rem" }}
        className={[styles.topbuyButton]}
        disabled={load}
      >
        Buy Now
      </button>

      <p className={styles.description}>{productDetail?.description}</p>

      <div className={styles.productview}>
        <div className={styles.photos}>
          <Slider {...settings}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={productDetail?.images[0]} />
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={productDetail?.images[1]} />
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={productDetail?.images[2]} />
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={productDetail?.images[3]} />
            </div>
          </Slider>
        </div>

        <div className={styles.details}>
          <h2>{productDetail?.name}</h2>
          <div>
            <p>Customer Reviews</p>
          </div>
          <p style={{ fontWeight: "600" }}>Price - ₹ {productDetail?.price}</p>
          <p>
            {productDetail?.color} | {productDetail?.caategory}
          </p>
          <p>About this item</p>
          <ul>
            {product.about.split("|").map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <p>
            <span style={{ fontWeight: "600" }}>Availaible</span> - InStock
          </p>
          <p>
            <span style={{ fontWeight: "600" }}>Brand</span> -{" "}
            {productDetail?.brand}
          </p>

          <div className={styles.buyButtons}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleAddToCart}
                  id={styles.cart}
                  className={styles.button}
                  disabled={load}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  id={styles.buy}
                  className={styles.button}
                  disabled={load}
                >
                  Buy Now
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                id={styles.buy}
                className={styles.button}
              >
                Login to Buy
              </button>
            )}
          </div>
        </div>
      </div>
      <MobileFooter />
    </div>
  );
}




const product = {
  description:
    "Sony WH-CH720N, Wireless Over-Ear Active Noise Cancellation Headphones with Mic, up to 50 Hours Playtime, Multi-Point Connection, App Support, AUX & Voice Assistant Support for Mobile Phones (Black)",
  id: 1,
  name: "Sony WH-CH720N",
  price: "3500",
  about: `
Sony’s lightest Wireless Noise-cancelling headband
       ever|
Up to 50-hour battery life with quick charging (3 min
      charge for up to 1 hour of playback)|
Multi-Point Connection helps to pair with two
      Bluetooth devices at the same time | 
Take noise cancelling to the next level with Sony’s
      Integrated Processor V1,so you can fully immerse
      yourself in the music|
Super comfortable and lightweight design
      ( 192 Grams )|
High sound quality and well-balanced sound tuning`,

  brand: "sony",
  color: "black",
  type: "wireless",
  available: true,
  images: [
    "https://www.sony.co.in/image/67c435ccf7da70b63f8d6195ac04269c?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320",
    "https://m.media-amazon.com/images/I/81pJTsqkFRL.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOpaCeoAzrp5MzLJ7E9dRRl3YP0IFF7YCmmqYpbS1erwLbk7A6-TNDLUZaXGU2zNPtFR4&usqp=CAU",
    "https://m.media-amazon.com/images/I/41OmBXE+25L.jpg",
  ],
};


export default ProductPage