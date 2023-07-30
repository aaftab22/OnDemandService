import react, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./ServiceProviderPage.css";

//added
import { getDatabase, ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ServiceProviderPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredSin, setEnteredSin] = useState("");
  const [enteredLicense, setEnteredLicense] = useState("");
  const [enteredSkills, setEnteredSkills] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  // const [EnteredDob, setEnteredDob] = useState("");

  const [enteredLoginEmail, setEnteredLoginEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");

  const navigate = useNavigate();

  const onClickLoginButton = () => {
    setIsLogin(true);
  };

  const onClickRegisterButton = () => {
    setIsLogin(false);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const sinChangeHandler = (event) => {
    setEnteredSin(event.target.value);
  }

  const licenseChangeHandler = (event) => {
    setEnteredLicense(event.target.value);
  }

  const skillsChangeHandler = (event) => {
    setEnteredSkills(event.target.value);
  }

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  // const dobChangeHandler = (event) => {
  //   setEnteredDob(event.target.value);
  // };

  const submitRegisterHandler = async  (event) => {
    event.preventDefault();


      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          enteredEmail,
          enteredPassword
        );
  
        const user = userCredential.user;
        const userId = user.uid;
        console.log("sign up user id: " + userId);
  
        // Save service provider data to the Realtime Database
        const serviceProviderData = {
          fullName: enteredName,
          email: enteredEmail,
          phone: enteredPhone,
          sin: enteredSin,
          license: enteredLicense,
          skills: enteredSkills,
          // dob: EnteredDob, //
        };
  
        // const db = getDatabase();
        const serviceProviderRef = ref(database, 'serviceProvider/' + userId);
        set(serviceProviderRef, serviceProviderData);
  
        // Empty fields after submitting
        setEnteredName("");
        setEnteredEmail("");
        setEnteredPassword("");
        setEnteredSin("");
        setEnteredLicense("");
        setEnteredSkills("");
        setEnteredPhone("");
        // setEnteredDob(""); // If you want to empty the date of birth field

        navigate("/customer/dashboard");
        setIsLogin(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage); 
      }

  };

  const submitLoginHandler = (event) => {
    event.preventDefault();

    setEnteredLoginEmail("");
    setEnteredLoginPassword("");
  };

  const onResetHandler = () => {
    setEnteredName("");
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredPhone("");
    // setEnteredDob("");
  };

  return (
    <div className="service-provider-page">
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
          src={process.env.PUBLIC_URL + "/Images/Image-11.jpg"}
        />
      </div>
      <div className={isLogin ? 'right-side custom-padding' : 'right-side'}>
        <div className="logo-box">
          <img src={process.env.PUBLIC_URL + "/Images/logo.png"} />
        </div>
        <div
          className={isLogin ? "display-none register-form" : "register-form"}
        >
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
                <label>Sin Number:</label>
                <input
                  type="num"
                  value={enteredSin}
                  name="sin"
                  max="9"
                  onChange={sinChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>License Number:</label>
                <input
                  type="num"
                  value={enteredLicense}
                  name="license"
                  onChange={licenseChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Skills:</label>
                <select value={enteredSkills} name="skills" onChange={skillsChangeHandler} >
                    <option disabled>Select only one option</option>
                    <option>Electrician</option>
                    <option>Plumbing</option>
                    <option>Cleaning</option>
                    <option>Baby Sitting</option>
                    <option>Painter</option>
                </select>
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
                {/* <label>Date Of Birth</label>
                <input
                  type="date"
                  value={EnteredDob}
                  min="1950-01-01"
                  max="2015-12-31"
                  onChange={dobChangeHandler}
                ></input> */}
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

        <div className={!isLogin ? "display-none login-form" : "login-form"}>
          <form onSubmit={submitLoginHandler}>
            <div className="login__controls">
              <div className="login__control">
                <label>Email Address:</label>
                <input
                  type="email"
                  value={enteredLoginEmail}
                  name="email"
                  onChange={emailChangeHandler}
                ></input>
              </div>

              <div className="login__control">
                <label>Password:</label>
                <input
                  type="password"
                  value={enteredLoginPassword}
                  name="password"
                  onChange={passwordChangeHandler}
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
      </div>
    </div>
  );
};

export default ServiceProviderPage;
