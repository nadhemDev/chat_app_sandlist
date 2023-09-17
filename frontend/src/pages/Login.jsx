import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and Password is required ", toastOption);
      return false;
    } else if (username.length === "") {
      toast.error("Username and Password is required ", toastOption);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSumbit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Sandlist  Chat-App</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"

          />

          <div className="passwordWrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`

  .passwordWrapper {
    position: relative;
    width: 100%;

    span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 1.2rem;
    }
  }

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  background-image: url('https://images.unsplash.com/photo-1566321343730-237ec35e53f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZSUyMHNreSUyMGNsb3Vkc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80');
  background-size: cover;
  background-position: center center;
  animation: backgroundPan 20s infinite alternate;

  .brand {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    img {
      height: 6rem;
      width: 6rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 50%;
    max-width: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 1rem;
    padding: 2rem 3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    input {
      background-color: transparent;
      padding: 0.8rem 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      transition: 0.3s;

      &:focus {
        border-color: #997af0;
        outline: none;
        box-shadow: 0 0 10px rgba(153, 122, 240, 0.5);
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 0.8rem 1.5rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.5rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s;

      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: white;
      text-align: center;
      font-size: 0.9rem;

      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @keyframes backgroundPan {
    0% {
      background-position: center top;
    }
    50% {
      background-position: center center;
    }
    100% {
      background-position: center bottom;
    }
  }
`;



