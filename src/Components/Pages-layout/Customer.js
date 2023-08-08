import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customer.css";

//imported by A
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';

const Customer = () => {
const [isLogin, setIsLogin] = useState(true);
const [enteredName, setEnteredName] = useState('');
const [enteredEmail, setEnteredEmail] = useState('');
const [enteredPassword, setEnteredPassword] = useState('');
const [enteredPhone, setEnteredPhone] = useState('');
const [enteredLoginEmail, setEnteredLoginEmail] = useState('');
const [enteredLoginPassword, setEnteredLoginPassword] = useState('');
const navigate = useNavigate();

//added by a
const [error, setError] = useState('');

//validation while registration on client side
function registrationValidation(enteredPhone)
  {
    //phone number validation
    if (enteredPhone.length !== 10) {
      setError("Phone number should have 10 digits.");
      return false;
    }
    return true;
};


const onClickLoginButton = () => {
    setIsLogin(true);
};

const onClickRegisterButton = () => {
    setIsLogin(false);
};

const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
}

const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
}

const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
}

const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
}

const submitRegisterHandler = async(event) => {
    event.preventDefault();
    const database = getDatabase();
    const validationResult = registrationValidation(enteredPhone);

    if (validationResult) {
      try 
      {
        const userCredential = await createUserWithEmailAndPassword(auth,enteredEmail,enteredPassword);

        const Customer = userCredential.user;
        const userId = Customer.uid;
        console.log("sign up user id: " + userId);
        // Save user data to the Realtime Database
        const userData = {fullName: enteredName,email: enteredEmail,phone: enteredPhone};
        const userRef = ref(database, 'Customer/' + userId);
        set(userRef, userData);
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
    }
}
const onLoginEmailChangeHandler = (event) => {
  setEnteredLoginEmail(event.target.value);
}
const onLoginPasswordChangeHandler = (event) => {
  setEnteredLoginPassword(event.target.value);
}

const submitLoginHandler = async(event) => {
    event.preventDefault();
    try 
    {
      const userCredential = await signInWithEmailAndPassword(auth, enteredLoginEmail, enteredLoginPassword);
      setEnteredLoginEmail('');
      setEnteredLoginPassword('');
      navigate('/customer/dashboard');
      const usersUID = userCredential.user.uid;
      console.log("login user id " + usersUID);
    } 
    catch (error) 
    {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError('Invalid email or password. Please try again.');
    }
}

const onResetHandler = () => {
  setEnteredName('');
  setEnteredEmail('');
  setEnteredPassword('');
  setEnteredPhone('');
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
        <div className={isLogin ? "display-none register-form" : "register-form"}>
          <form onSubmit={submitRegisterHandler}>
            <div className="register__controls">
              <div className="register__control">
                <label>Full Name*</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={enteredName}
                  onChange={nameChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Email Address*</label>
                <input
                  type="email"
                  value={enteredEmail}
                  name="email"
                  required
                  onChange={emailChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Password*</label>
                <input
                  type="password"
                  value={enteredPassword}
                  name="password"
                  required
                  onChange={passwordChangeHandler}
                ></input>
              </div>

              <div className="register__control">
                <label>Phone Number*</label>
                <input
                  type="number"
                  value={enteredPhone}
                  name="phone"
                  required
                  onChange={phoneChangeHandler}
                ></input>
              </div>

              {/* <div className="register__control">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  value={EnteredDob}
                  min="1950-01-01"
                  max="2015-12-31"
                  onChange={dobChangeHandler}
                ></input>
              </div> */}
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
                  required
                  onChange={onLoginEmailChangeHandler}
                ></input>
              </div>

              <div className="login__control">
                <label>Password:</label>
                <input
                  type="password"
                  value={enteredLoginPassword}
                  name="password"
                  required
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
