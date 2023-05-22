import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { googleProvider } from "../../utils/firebaseConfig";
import ErrorInputMessage from "../../components/errorInputMessage/ErrorInputMessage";
import handleSubmitLogin from "../../handlers/handleSubmitLogin";
import { getAuth, signInWithRedirect } from "firebase/auth";
import validateCreateUser from "../../utils/validateCreateUser";
import styles from "./Login.module.css";
import GoogleIcon from '../../assets/images/GoogleIconColored.png'

const Login = ({
  loginVisible,
  handleLoginClick,
  creatingAccount,
  setCreatingAccount,
}) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({
    email: "Email required",
    password: "Password required",
    name: "",
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserInfo({ ...userInfo, [property]: value });
    setErrors(
      validateCreateUser({ ...userInfo, [property]: value }, creatingAccount)
    );
  };

  const loginWithGoogle = async () => {
    try {
      signInWithRedirect(auth, googleProvider);
      if (location.pathname === "/") navigate("/loading");
      setCreatingAccount(false);
    } catch (error) {
      window.alert(error.message);
      console.log(error.message);
    }
  };

  const handleClose = () => {
    handleLoginClick();
    creatingAccount && setCreatingAccount(false);
  };

  return (
    <>
      <div
        style={
          loginVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
        className={styles.overlay}
        onClick={handleClose}
      ></div>
      <form
        onSubmit={(e) => {
          handleSubmitLogin(
            e,
            dispatch,
            setUserInfo,
            creatingAccount,
            navigate,
            location,
            handleLoginClick,
            setCreatingAccount,
            userInfo
          );
        }}
        className={styles.loginContainer}
      >
        <div
          className={styles.LoginForm}
          style={
            loginVisible
              ? { display: "flex", transition: "400ms" }
              : { display: "none", transition: "400ms" }
          }
        >
          <button className={styles.closeButton} onClick={handleClose}>
            x
          </button>
          <h4>Welcome</h4>
          <span>Log in or Sign up to continue</span>
          <div className={styles.Inputs}>
            {creatingAccount && (
              <input
                value={userInfo.name}
                type="text"
                name="name"
                placeholder="Name"
                className="Username"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitLogin(
                      e,
                      dispatch,
                      setUserInfo,
                      creatingAccount,
                      navigate,
                      location,
                      handleLoginClick,
                      setCreatingAccount,
                      userInfo
                    );
                  }
                }}

              />
            )}
            <ErrorInputMessage errors={errors.email} text={errors.name} />
            <input
              value={userInfo.email}
              type="text"
              name="email"
              placeholder="email@example.com"
              className="Username"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitLogin(
                    e,
                    dispatch,
                    setUserInfo,
                    creatingAccount,
                    navigate,
                    location,
                    handleLoginClick,
                    setCreatingAccount,
                    userInfo
                  );
                }
              }}
            />
            <ErrorInputMessage errors={errors.email} text={errors.email} />
            <input
              value={userInfo.password}
              type="text"
              name="password"
              placeholder="Password"
              className="Password"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitLogin(
                    e,
                    dispatch,
                    setUserInfo,
                    creatingAccount,
                    navigate,
                    location,
                    handleLoginClick,
                    setCreatingAccount,
                    userInfo
                  );
                }
              }}
            />
            <ErrorInputMessage
              errors={errors.password}
              text={errors.password}
            />
          </div>
          <button
            disabled={
              creatingAccount
                ? errors.email || errors.password || errors.name
                : errors.email || errors.password
            }
            type="submit"
            className={styles.BotonLogin}
          >
            {creatingAccount ? "Register" : "Login"}
          </button>
          <div style={{ display:'flex',marginBottom:'0.5rem'}}>
           <p style={{fontSize:'large'}}>{creatingAccount? 'Already a member?':'Not a member?'}</p> 
          <button
            className={styles.BotonSwitch}
            onClick={(e) => {
              e.preventDefault();
              !creatingAccount
                ? setErrors({
                    ...errors,
                    name: userInfo.name.length ? "" : "Name required",
                  })
                : setErrors({ ...errors, name: "" });
              setCreatingAccount(!creatingAccount);
            }}
          >
           <p style={{color:"#d14d72",fontSize:'large'}} className={styles.Switch}>{creatingAccount
              ? 'Log in'
              : 'Register'}</p> 
          </button>
          </div>
          <button
            className={styles.BotonGoogle}
            onClick={(e) => {
              e.preventDefault();
              handleLoginClick();
              loginWithGoogle();
            }}
          >
            <p >Log in with Google</p>
            <img src={GoogleIcon}/>
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
