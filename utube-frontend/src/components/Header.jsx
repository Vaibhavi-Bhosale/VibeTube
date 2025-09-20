import { Home, MessageSquare, User, Upload , LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { clearUser } from "../store/authSlice";
import toast from "react-hot-toast";



export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async()=>{
     const response = await logout()
     if(response)
     {
        toast.success("Logout !")
        dispatch(clearUser())
        navigate("/login")
     }
     else(
       toast.error("logout fail !")
     )
  }

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Tweet", path: "/tweet", icon: <MessageSquare size={20} /> },
    { name: "Profile", path: `/profile/`, icon: <User size={20} /> },
    { name: "Upload", path: "/upload", icon: <Upload size={20} /> },
     
     
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed z-50 top-0 left-0 h-screen w-48 bg-black text-[#ECDFCC] flex-col p-4 shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center">MyApp</h1>

        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-xl transition ${
                  isActive
                    ? "bg-[#3C3D37] text-white"
                    : "hover:bg-[#3C3D37]/60 hover:text-white"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          <button onClick={handleLogout}
          className="p-2 rounded-xl hover:bg-[#3C3D37]/60 hover:text-white flex gap-3">
            <LogOut/> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed z-50 bottom-0 left-0 w-full bg-black text-[#ECDFCC] flex justify-around items-center py-3 shadow-lg">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl text-xs transition p-3 ${
                isActive
                  ? "text-white bg-[#3C3D37]"
                  : "text-[#ECDFCC] hover:text-white hover:bg-[#3C3D37]/60"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}

       
          <button onClick={handleLogout}
          className="p-2 rounded-xl hover:bg-[#3C3D37]/60 hover:text-white flex gap-3">
            <LogOut/> <span>Logout</span>
          </button>
      </div>
    </>
  );
}
