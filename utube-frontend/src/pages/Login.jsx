import React, { useState } from "react";
import Container from "../components/Container";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({ email, password });

    if (response.success) {
      dispatch(setUser(response.data));
      toast.success(response.message);

      navigate("/");
    } else {
      toast.error(response.message || "Login failed");
    }
  };

  return (
    <Container>
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black">
  <div className="bg-black border border-white rounded-2xl p-6 w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center mb-4 text-white">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        className="w-full p-2 bg-black border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        className="w-full p-2 bg-black border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
      />

      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded-lg hover:bg-black hover:text-white hover:border hover:border-white transition"
      >
        Login
      </button>
    </form>

    <p className="mt-4 text-center text-sm text-white">
      New here?{" "}
      <Link
        to="/signup"
        className="text-white underline hover:text-black hover:bg-white px-1 rounded transition"
      >
        Register
      </Link>
    </p>
  </div>
</div>

    </Container>
  );
}

export default Login;
