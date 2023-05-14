import React, {useState, useEffect} from 'react'
import styles from "./Login.module.css";
import logo from "../../assets/images/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/actions/user.js";
import toast from "react-hot-toast";


const Login = () => {

  const [email, setEmail] = useState({value:"", error:""});
  const [password, setPassword] = useState({value:"", error:""});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {message, error, isAuthenticated, loading} = useSelector((state)=>state.user);

  const validateEmail = () =>{
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.value.match(mailFormat)){
      setEmail({...email, error:"Please enter a valid email"});
    }else{
      setEmail({...email, error:""});
    }
    console.log(email);
  }

  const validatePassword = ()=>{
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!password.value.match(passwordFormat)){
      setPassword({...password, error:"Password must be at least 8 characters long and must contain at least one number"});
    }else{
      setPassword({...password, error:""});
    }
    console.log(password);
  }

 const handleSubmit = async (e) => {
   e.preventDefault();
   validateEmail();
   validatePassword();
   console.log("submitting", email, password);
   if (password.error || email.error)return;
    await dispatch(login(email.value, password.value));
    navigate("/home");
 };

 useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch({type:"clearError"})
  }
  if(message){
    toast.success(message);
      dispatch({ type: "clearMessage" });
  }
 }, [error, message, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.heading}>
          <img src={logo} alt="logo" />
          <h1>Musicart</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email.value}
              onChange={(e) => setEmail({ ...email, value: e.target.value })}
              onBlur={validateEmail}
            />
            <p>{email.error}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password.value}
              onChange={(e) =>
                setPassword({ ...password, value: e.target.value })
              }
              onBlur={validatePassword}
            />
            <p>{password.error}</p>
          </div>

          <button className={styles.button} type="submit">
            Continue
          </button>

          <p>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>

        <div className={styles.newUser}>
          <div className={styles.line}></div>
          <p>New to Musicart?</p>
          <div className={styles.line}></div>
        </div>

        <Link to="/register">
          <button id={styles.register} disabled={loading}>Create your Musicart account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login