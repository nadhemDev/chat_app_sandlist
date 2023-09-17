import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy Chat-App</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  // ... (The styles are made consistent with the Login component)

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
  animation: backgroundPan 120s infinite alternate;

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
    background-color: rgba(0, 0, 0, 0.7); // Increased opacity
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

      &:focus,
      &:hover {
        border-color: white; // White border on hover and focus
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