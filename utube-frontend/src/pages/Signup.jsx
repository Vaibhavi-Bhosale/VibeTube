import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { register } from "../api/auth";
import toast from "react-hot-toast";


function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate()

  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    const response = await register(formData);
    
    if(response.success)
    {
      
       toast.success(response.message)

       navigate("/login")
    }
    else{
      toast.error(response.message || "Registration Failed")
    }
  };

  return (
  <Container>
  <div className="flex justify-center items-center min-h-screen bg-black">
    <div className="w-full max-w-md bg-black border border-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          autoComplete="name"
          className="w-full px-4 py-2 bg-black border border-white rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 bg-black border border-white rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          className="w-full px-4 py-2 bg-black border border-white rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="w-full px-4 py-2 bg-black border border-white rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <div className="space-y-2">
          <label htmlFor="avatar" className="block text-white font-medium">
            Avatar
          </label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            id="avatar"
            required
            className="w-full text-sm text-white
                       file:mr-4 file:py-2 file:px-4 file:rounded-xl 
                       file:border file:border-white file:bg-white file:text-black
                       hover:file:bg-black hover:file:text-white cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="coverImage" className="block text-white font-medium">
            Cover Image
          </label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            id="coverImage"
            className="w-full text-sm text-white
                       file:mr-4 file:py-2 file:px-4 file:rounded-xl 
                       file:border file:border-white file:bg-white file:text-black
                       hover:file:bg-black hover:file:text-white cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-white text-black font-semibold rounded-xl shadow-md hover:bg-black hover:text-white hover:border hover:border-white transition"
        >
          Register
        </button>
      </form>

      <p className="text-center text-white text-sm mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-white underline hover:text-black hover:bg-white px-1 rounded transition"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
</Container>

  );
}

export default Signup;
