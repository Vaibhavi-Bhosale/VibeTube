 import api from "./api";



const register = async (formData)=>{
   try{
       const response = await api.post("/users/register", formData)
       return {
         success:true,
         data : response.data,
         message : "register sucessfully"
       }
   }
   catch(error){
    console.error(error.response?.data?.message || "Something went wrong");
    return {
      success : false,
      message : error.response?.data?.message || "Something went wrong"
    }
   }
}
const login = async (data) => {
  if (!data) {
    alert("Fill Login Credintials");
    return;
  }
  try {
    const response = await api.post("/users/login", data);

    // extract data
    const { user, accessToken } = response.data.data;


    // save token for future API calls
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    // optional: redirect to dashboard

    return {
      success : true,
      data : user,
      message : "Login successfully"
    }
  } catch (error) {
    console.error(error.response?.data?.message || "Something went wrong");
    return {
      success : false,
      message : error.response?.data?.message || "Something went wrong"
    }
  }
};

const logout = async () => {
  try {
    await api.post("/users/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
  } catch {
    console.log("Logout Faile !");
  }
};


export { register, login, logout };
