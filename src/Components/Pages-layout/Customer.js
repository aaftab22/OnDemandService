import react, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Customer.css";

//imported by A
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';

const Customer = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [EnteredDob, setEnteredDob] = useState('');
  const [enteredLoginEmail, setEnteredLoginEmail] = useState('');
  const [enteredLoginPassword, setEnteredLoginPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function registrationValidation(enteredName,enteredEmail, enteredPassword, enteredPhone)
  {
    if (!enteredName && !enteredEmail && !enteredPassword && !enteredPhone) {
      setError("Please fill in all required fields.");
      return false;
    }

    // Email validation
    if (!emailPattern.test(enteredEmail)) 
    {
      setError("Please enter a valid email address.");
      return false;
    }

    //phone number validation
    if (enteredPhone.length !== 10) {
      setError("Phone number should have 10 digits.");
      return false;
    }
    return true;
  };

  function loginValidation(enteredLoginEmail,enteredLoginPassword)
  {
      if(enteredLoginEmail)
      {
        if(emailPattern.test(enteredLoginEmail))
        {
            if(!enteredLoginPassword)
            {
              setError("Please enter password");
              return false;
            }      
        }
        else{
          setError("Please enter a valid email address.");
          return false;
        }
      }
      else{
        setError("Please enter email address.");
        return false;
      }
      return true;
  };

  const onClickLoginButton = () => {
    setIsLogin(true);
   
  };

  const onClickRegisterButton = () => {
    setIsLogin(false);
    // const validationResult = registrationValidation(enteredName,enteredEmail,enteredPassword, enteredPhone); 
    // if(!validationResult)
    // {
    //   setIsLogin(true);
    // }
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  }
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }
  const onLoginEmailChangeHandler = (event) => {
    setEnteredLoginEmail(event.target.value);
  }
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  }
  const onLoginPasswordChangeHandler = (event) => {
    setEnteredLoginPassword(event.target.value);
  }
  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  }
  const dobChangeHandler = (event) => {
    setEnteredDob(event.target.value);
  }
const submitRegisterHandler = async (event) => {
  event.preventDefault();
  
  const database = getDatabase();
  const validationResult = registrationValidation(
    enteredName,
    enteredEmail,
    enteredPassword,
    enteredPhone
  );

  if (validationResult) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );

      const user = userCredential.user;
      const userId = user.uid;
      console.log("sign up user id: " + userId);

      // Save user data to the Realtime Database
      const userData = {
        fullName: enteredName,
        email: enteredEmail,
        phone: enteredPhone,
      };

      // const dbRef = ref(database); 
      // set(ref(dbRef, 'users/' + userId), userData);
      const userRef = ref(database, 'users/' + userId);
      set(userRef, userData);

      console.log("userDate 137 = " + userData);
      
      navigate("/customer/dashboard");
      setIsLogin(true);
    } 
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage); 
    }
      // Empty fields after submitting
      setEnteredName("");
      setEnteredEmail("");
      setEnteredPassword("");
      setEnteredPhone("");
      setEnteredDob("");
  }
};

  const submitLoginHandler = async(event) => {
    event.preventDefault();
    const validationResult = loginValidation(enteredLoginEmail,enteredLoginPassword); // edited 
    
    if (validationResult) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, enteredLoginEmail, enteredLoginPassword);
        setEnteredLoginEmail('');
        setEnteredLoginPassword('');
        navigate('/customer/dashboard');

        const user = userCredential.user.uid;
        console.log("login user id " + user);

      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError('Invalid email or password. Please try again.');
      }
    }


  }

  const onResetHandler = () => {
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPassword('');
    setEnteredPhone('');
    setEnteredDob('');
  }

  return (
    <div className="cust-page">
      <div className="left-side">
        <div className="box-container">
          <div
            className={isLogin ? "active login-box" : "login-box"}
            onClick={onClickLoginButton}
          >
            Login
          </div>
          <div
            className={isLogin ? "register-box" : "active register-box"}
            onClick={onClickRegisterButton}
          >
            Sign Up
          </div>
        </div>
        <img
          className="full-image"
          alt="background"
          src={process.env.PUBLIC_URL + "/Images/Image-2.jpg"}
        />
      </div>
      <div className="right-side">
        <div className="logo-box">
          <img alt="logo" src={process.env.PUBLIC_URL + "/Images/logo.png"} />
        </div>

        {/* registration form */}
        <div className={isLogin ? "display-none register-form" : "register-form"}>
          <form onSubmit={submitRegisterHandler}>
            <div className="register__controls">
              <div className="register__control">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="name"
                  value={enteredName}
                  onChange={nameChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Email Address:</label>
                <input
                  type="email"
                  value={enteredEmail}
                  name="email"
                  onChange={emailChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Password:</label>
                <input
                  type="password"
                  value={enteredPassword}
                  name="password"
                  onChange={passwordChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  value={enteredPhone}
                  name="phone"
                  onChange={phoneChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  value={EnteredDob}
                  min="1950-01-01"
                  max="2015-12-31"
                  onChange={dobChangeHandler}
                ></input>
              </div>
            </div>
            <div className="register__actions">
              <button type="submit">Register</button>
              <button type="reset" onClick={onResetHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* login form */}
        <div className={!isLogin ? "display-none login-form" : "login-form"}>
          <form onSubmit={submitLoginHandler}>
            <div className="login__controls">

              <div className="login__control">
                <label>Email Address:</label>
                <input
                  type="email"
                  value={enteredLoginEmail}
                  name="email"
                  onChange={onLoginEmailChangeHandler}
                ></input>
              </div>

              <div className="login__control">
                <label>Password:</label>
                <input
                  type="password"
                  value={enteredLoginPassword}
                  name="password"
                  onChange={onLoginPasswordChangeHandler}
                ></input>
              </div>

            </div>
            <div className="login__actions">
              <button type="submit">Login</button>
              <button type="reset" onClick={onResetHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
          {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Customer;
