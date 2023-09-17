import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./components/SetAvatar";
import Test from "./pages/Test";
const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setavatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Login />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
