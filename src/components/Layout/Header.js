import React, {useEffect} from 'react'
import styles from "./Header.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import logo from "../../assets/images/logo.png";
import {Link, useLocation} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../../redux/actions/user.js"
import toast from "react-hot-toast";




const Header = () => {


  const dispatch = useDispatch();
  const { isAuthenticated, error, message } = useSelector((state) => state.user);
  const {bread} = useSelector((state)=>state.bread);
  let path = "/";

  const handleLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const handlePathChange = (pos) =>{
    dispatch({ type: "GotoIndexBread", payload: pos });
  }

  const handleCartPath = () =>{
    if(bread[bread.length-1].name==="Cart") return;
    dispatch({ type: "PushBread", payload: { name: "Cart", path: "/cart" } });
  }

  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.group}>
          <BsFillTelephoneFill />
          <p>28747284729</p>
        </div>

        <div className={styles.group}>
          <p>Get 50% off on selected items</p>
          <div className={styles.line}></div>
          <p>Shop Now</p>
        </div>

        <div className={styles.group}>
          {isAuthenticated ? (
            <button onClick={handleLogout} id={styles.logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button id={styles.logout}>Login</button>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.navBottom}>
        <Link to="/home">
          <div onClick={()=>{
            dispatch({ type: "ResetBread" });
          }} className={styles.heading}>
            <img src={logo} alt="logo" />
            <h1>Musicart</h1>
          </div>
        </Link>

        <div className={styles.breadcrumbs}>
          {bread.map((item, index) => (
            <Link key={index} to={item.path}>
              <p onClick={() => handlePathChange(index + 1)}>{item.name} /</p>
            </Link>
          ))}
        </div>

        {isAuthenticated && (
          <Link to="/cart">
            <button onClick={handleCartPath} className={styles.addCart}>
              {" "}
              <GrCart style={{ color: "white" }} /> View Cart
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header