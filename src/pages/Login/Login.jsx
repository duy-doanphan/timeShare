import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import axios from "axios";
import { GlobalContext } from "../../provide";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigation = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const loginContext = useContext(GlobalContext);
  const { setIsLogin, setUserInformation, isLogin } = loginContext;

  const handleLoginFunctionWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const getInformationLink = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse?.access_token}`;
        const requestGoogle = await axios(getInformationLink);
        const payload = {
          username: requestGoogle?.data?.email,
          email: requestGoogle?.data?.email,
          password: "",
        };
        const requestLoginFunction = await axios.post("/login", payload);
        if (
          requestLoginFunction.status == 200 &&
          requestLoginFunction.data.isSucceed &&
          requestLoginFunction.data.message != "Invalid Credential"
        ) {
          const userDecode = jwtDecode(requestLoginFunction.data.message);
          setUserInformation(userDecode);
          setIsLogin(true);
          alert("Login successful");
          navigation("/");
        } else {
          alert("Login failed");
        }
      } catch (err) {
        console.error(err);
      }
    },
    onError: () => {
      alert("Login Failed");
    },
  });
  const handleLoginFunction = async (e) => {
    e.preventDefault();

    try {
      const requestLoginFunction = await axios.post("/login", data);
      console.log(requestLoginFunction);
      if (
        requestLoginFunction.status == 200 &&
        requestLoginFunction.data.isSucceed &&
        requestLoginFunction.data.message != "Invalid Credential"
      ) {
        const userDecode = jwtDecode(requestLoginFunction.data.message);
        setUserInformation(userDecode);
        setIsLogin(true);
        alert("Login successful");
        navigation("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigation("/");
    }
  }, [isLogin]);
  return (
    <div className={"loginForm"}>
      <div className="flexForm">
        <h1>Sign In</h1>
        <div className="socialNetwork">
          <button className="fbButton">
            <IoLogoFacebook />
            SIGN IN WITH FACEBOOK
          </button>
          <button
            className="ggButton"
            onClick={() => handleLoginFunctionWithGoogle()}
          >
            <IoLogoGoogle />
            SIGN IN WITH GOOGLE
          </button>
        </div>
        <div className="dividerSocial"></div>
        <form>
          <div className="textField">
            <label>Username or Email</label>
            <input
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />
          </div>
          <div className="textField">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <div className="flexAction">
            <div className="checkboxField">
              <label>
                <input type="checkbox" />
                Keep me signed in
              </label>
            </div>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <button onClick={(e) => handleLoginFunction(e)}>SIGN IN</button>
        </form>
      </div>
      <span className="divider"></span>
      <div className="registerForm">
        <h3>Don't have an account?</h3>
        <Link to={"/register"}>
          <button className="registerButton">SIGN UP HERE</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
