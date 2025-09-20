import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
 

const AuthLayout = ({ authentication = true, children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));


  // Case 1: Protected route but user not logged in
  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Case 2: Public route but user already logged in
  if (!authentication && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // For nested routes (Home, Profile, etc.)
  if (!children) {
    return (
      <div className="flex bg-black">
        <Header />
        <div className="md:ml-48 w-full  min-h-screen bg-black">
          <Outlet />
        </div>
      </div>
    );
  }

  // For routes where children are passed manually (like login/signup)
  return <div>{children}</div>;
};

export default AuthLayout;
