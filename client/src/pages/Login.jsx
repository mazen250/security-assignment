import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
function Login() {
  const [loginemail, setLoginemail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        email: loginemail,
        password: loginpassword,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.message === "success") {
          if (res.data.user.role === "user") {
            window.location.href = `/user/${res.data.user._id}`;

            setUser(res.data.user);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else if (res.data.user.role === "admin") {
            window.location.href = `/admin/${res.data.user._id}`;
            setUser(res.data.user);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else if (res.data.user.role === "adminviewer") {
            window.location.href = `/adminviewer/${res.data.user._id}`;
          }
        } else {
          console.log(res.data.message);
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <h1>login</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setLoginemail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="login password"
          onChange={(e) => {
            setLoginpassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            login();
          }}
        >
          login
        </button>
      </div>
    </div>
  );
}

export default Login;
