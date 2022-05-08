import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassowrd] = useState("");
  const [email, setEmail] = useState("");
  const [resMsg, setResMsg] = useState("");

  const register = () => {
    axios
      .post("http://localhost:5000/register", {
        name: name,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setResMsg(res.data.message);
      });
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <h1>Regsiter</h1>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => {
            setPassowrd(e.target.value);
          }}
        />
        <button
          onClick={() => {
            register();
          }}
        >
          register
        </button>
      </div>
    </div>
  );
}

export default Register;
