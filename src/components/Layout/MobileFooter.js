import React, {useState, useEffect} from 'react'
import styles from "./MobileFooter.module.css"
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from "react-hot-toast"
import { logout } from '../../redux/actions/user';



const MobileFooter = () => {

    const [selected, setSelected] = useState("home");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, message, error} = useSelector((state) => state.user);
    // const {bread} = useSelector((state) => state.bread);

    const handleLogout = () => {
      if(!isAuthenticated)return;
      dispatch(logout());
    };


    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({type:"clearError"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
    }, [error, message, dispatch]);


  return (
    <div className={styles.mobileFooter}>
      <div
        onClick={() => {
          setSelected("home");
          navigate("/home");
          dispatch({ type: "ResetBread" });
        }}
        className={selected === "home" ? styles.highlight : ""}
      >
        <AiOutlineHome style={{ fontSize: "1rem" }} className={styles.icon} />
        <p>Home</p>
      </div>
      <div
        onClick={() => {
          setSelected("cart");
          //   if(bread[bread.size - 1].name != "Cart")dispatch({ type: "PushBread" , payload: { name: "Cart", path: "/cart" }});
          navigate("/cart");
        }}
        className={selected === "cart" ? styles.highlight : ""}
      >
        <BsCartPlus style={{ fontSize: "1rem" }} className={styles.icon} />
        <p>Cart</p>
      </div>
      <div
        onClick={handleLogout}
        className={selected === "user" ? styles.highlight : ""}
      >
        <Link to="/login">
          <AiOutlineUser style={{ fontSize: "1rem" }} className={styles.icon} />
          {isAuthenticated ? <p>Logout</p> : <p>Login</p>}
        </Link>
      </div>
    </div>
  );
}

export default MobileFooter