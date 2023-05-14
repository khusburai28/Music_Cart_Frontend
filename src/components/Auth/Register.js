import React, {useState, useEffect} from 'react'
import styles from "./Register.module.css";
import logo from "../../assets/images/logo.png";
import {Link, useNavigate} from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user.js";
import toast from "react-hot-toast";



const Register = () => {

 const [email, setEmail] = useState({ value: "", error: "" });
 const [password, setPassword] = useState({ value: "", error: "" });
 const [mobile, setMobile] = useState({ value: "", error: "" });
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loading } = useSelector((state) => state.user);

 const handleSubmit = async (e) => {
   e.preventDefault();
   validateEmail();
   validateMobile();
   validatePassword();
   if(email.error || password.error || mobile.error)return;
   console.log("submitting", email, password, mobile, name);
  await dispatch(register({name, email:email.value, password : password.value, mobile : mobile.value}));
  navigate("/home", { state: { path: "/home" } });
 };

 const validateEmail = (e) => {
   const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (!email.value.match(mailFormat)) {
     setEmail({ ...email, error: "Please enter a valid email" });
   } else {
     setEmail({ ...email, error: "" });
   }
   console.log(email);
 };

 const validatePassword = (e) => {
   const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
   if (!password.value.match(passwordFormat)) {
     setPassword({ ...password, error: "Please enter a valid password" });
   } else {
     setPassword({ ...password, error: "" });
   }
   console.log(password);
 };

 const validateMobile = (e) => {
    const mobileFormat = /^[6-9]\d{9}$/;
    if (!mobile.value.match(mobileFormat)) {
      setMobile({ ...mobile, error: "Please enter a valid mobile number" });
    } else {
      setMobile({ ...mobile, error: "" });
    }
    console.log(mobile);
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

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.heading}>
          <img src={logo} alt="logo" />
          <h1>Musicart</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mobile">Mobile number</label>
            <input
              type="text"
              id="mobile"
              value={mobile.value}
              onChange={(e) => setMobile({ ...mobile, value: e.target.value })}
              onBlur={validateMobile}
            />
            <p>{mobile.error}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Id</label>
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

          <button disabled={loading} className={styles.button} type="submit">
            Continue
          </button>

          <p>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>

        <p className={styles.signin}>
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register