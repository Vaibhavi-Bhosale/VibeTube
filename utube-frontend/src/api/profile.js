import api from "./api";

const fetchProfile = async (userId) => {
  try {
    if (!userId) {
      console.log("No userId");
      return {
        success: false,
        message: "No userId provided",
      };
    }

    const response = await api.get(`/users/c/${userId}`);

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message,
    };
  } catch (error) {
    console.log(
      error.response?.data?.message ||
        "Something went wrong while fetching profile"
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong while fetching profile",
    };
  }
};

const channelState = async () => {
  try {
    const response = await api.get("/dashboard/stats");

    return {
      success: true,
      data: response.data?.data,
      message: response.data?.message,
    };
  } catch (error) {
    console.log(
      error.response?.data?.message ||
        "Something went wrong while fetching channel state"
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong while fetching channel state",
    };
  }
};

export { fetchProfile, channelState };
